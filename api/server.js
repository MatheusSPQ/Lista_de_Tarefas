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

//config do caminho
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const port = 3000;

// config do middleware
app.use(express.static("public"));
app.set("views", path.join(__dirname, "../views")); 
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req,res) => {
    res.render("index.ejs");
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

export default {app, pool}
