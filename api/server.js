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

app.get("/", (req,res) => {
    res.render("index.ejs");
});


if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    }); 
}

export default app;
