import express from "express";
import bodyParser from "body-parser";
import pkg from "pg";
import path from "path";


//testando localmente
import dotenv from 'dotenv';
dotenv.config();

// conectando com o banco de dados
const {Pool} = pkg;
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:false,
});

//config da porta
const app = express();
const port = 3000;

// config do middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("views", path.join(process.cwd(), "./views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(process.cwd(), "./public")));




//config para requisições

let ultimaOrdem 
let tarefas;

app.get("/", async (req,res) => {
    try {
        const result = await pool.query("SELECT * FROM tarefas ORDER BY ordem DESC");
        if (result.rowCount === 0) {
            // Se não houver tarefas, renderiza a view sem tarefas
            return res.render("index.ejs", { banco: [], erroDeNome: false });
        }
        ultimaOrdem = result.rows[0].ordem; // o unumero que representa  ordem da ulima tarefa
        tarefas = result.rows;
        console.log(ultimaOrdem + "aaa")
        let erroDeNome = req.query.erroDeNome === 'true';
        res.render("index.ejs",{banco: result.rows, erroDeNome: erroDeNome});
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro no banco");
    }
});


app.post("/post", async(req,res) =>{
    ultimaOrdem++;
    
    try {
        const result = await pool.query(
            "INSERT INTO tarefas (nometarefa, custo, datalimite, ordem) VALUES ($1, $2, $3, $4)",
            [req.body.nometarefa, req.body.custo, req.body.data, ultimaOrdem]
        );
        res.redirect("/")
    } catch (error) {
        if (error.code === '23505') { // 23505 é o código de erro para violação de chave única
            
            return res.redirect('/?erroDeNome=true');
        }
    }
    
    
});

app.post("/delete", async(req,res) =>{
    console.log(req.body)
    try {
        const result = await pool.query(
            "DELETE FROM tarefas WHERE id = $1", 
            [req.body.id]
        );
        res.redirect('/');
    } catch (error) {
        console.error('Erro ao deletar:', error);
        res.status(500).send('Erro ao deletar a tarefa'); 
    }
});

app.post("/edit", async(req,res) =>{
    console.log(req.body)
    let { id, nometarefa, custo, data } = req.body;
    custo = parseFloat(custo.replace(/[$,]/g, ''));
    console.log(custo)
    try {
        const result = await pool.query(
            "UPDATE tarefas SET nometarefa = $1, custo = $2, datalimite = $3 WHERE id = $4", 
            [nometarefa, custo, data, id]
        );
        res.redirect('/'); // Redireciona em caso de sucesso
    } catch (error) {
        console.error('Erro ao editar:', error);
    
        // Verifica se o erro é uma violação de chave única
        if (error.code === '23505') { 
            
            return res.redirect('/?erroDeNome=true');
        } else {
            res.status(500).send('Erro ao editar a tarefa'); // Resposta genérica para outros erros
        }
    }
});

app.post("/up", async (req, res) => {
    const currentOrder = parseInt(req.body.ordem);
    try {
        // Identificar a tarefa que está acima (com número de ordem maior e mais próximo do atual)
        const resultAbove = await pool.query(
            "SELECT * FROM tarefas WHERE ordem > $1 ORDER BY ordem ASC LIMIT 1",
            [currentOrder]
        );

        if (resultAbove.rows.length === 0) {
            // Não há tarefa acima; redireciona sem fazer alterações
            return res.redirect('/');
        }

        const taskAbove = resultAbove.rows[0];
        const newOrder = taskAbove.ordem;

        //  Trocar a ordem entre a tarefa atual e a tarefa acima
        await pool.query("UPDATE tarefas SET ordem = $1 WHERE ordem = $2", [newOrder, currentOrder]);
        await pool.query("UPDATE tarefas SET ordem = $1 WHERE id = $2", [currentOrder, taskAbove.id]);

        // Redirecionar de volta para a página principal
        res.redirect('/');
    } catch (error) {
        console.error("Erro ao trocar a ordem:", error);
        res.status(500).send("Erro ao trocar a ordem das tarefas.");
    }
    
});

app.post("/down", async (req, res) => {
    const currentOrder = parseInt(req.body.ordem);

    try {
        // Identificar a tarefa que está abaixo (com número de ordem menor e mais próximo do atual)
        const resultBelow = await pool.query(
            "SELECT * FROM tarefas WHERE ordem < $1 ORDER BY ordem DESC LIMIT 1",
            [currentOrder]
        );

        if (resultBelow.rows.length === 0) {
            // Não há tarefa abaixo; redireciona sem fazer alterações
            return res.redirect('/');
        }

        const taskBelow = resultBelow.rows[0];
        const newOrder = taskBelow.ordem;

        // Trocar a ordem entre a tarefa atual e a tarefa abaixo
        await pool.query("UPDATE tarefas SET ordem = $1 WHERE ordem = $2", [newOrder, currentOrder]);
        await pool.query("UPDATE tarefas SET ordem = $1 WHERE id = $2", [currentOrder, taskBelow.id]);

        // Redirecionar de volta para a página principal
        res.redirect('/');
    } catch (error) {
        console.error("Erro ao trocar a ordem:", error);
        res.status(500).send("Erro ao trocar a ordem das tarefas.");
    }
});

//evitando bugs de ambiente
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    }); 
}

export default app;
