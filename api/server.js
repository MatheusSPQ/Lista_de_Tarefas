import express from "express";
import bodyParser from "body-parser";
import pkg from "pg";
import path from "path";
import { fileURLToPath } from "url";

// conectando com o banco de dados
const {Pool} = pkg
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
    rejectUnauthorized: false,  
    },
});


const app = express();
const port = 3000;

// config do middleware
app.use(express.static("public"));
app.set("views", path.join(process.cwd(), "views"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req,res) => {
    try {
        const result = await pool.query("SELECT * FROM tarefas");
        res.render("/index.ejs",{banco: result.rows});
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro no banco");
    }
});


if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    }); 
}

export default app;
