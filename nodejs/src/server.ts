import app from "./app";
import "reflect-metadata";
import "./database";

 
console.log("Servidor",process.env.TESTE);


app.listen(process.env.PORT || 3000, () => console.log("executando"));

