import { Pool } from "pg";

// Pool é um conjunto de conexões, forma mais eficiente de lidar com múltiplas conexões ao banco
const pool = new Pool({
 //info do banco de dados
 //variaveis de ambiente são sempre strings -> necessario converter a port para number
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,

//converte a porta para número.
  port: Number(process.env.DB_PORT) 
});

//exporta uma função simples que permite fazer consultas em qualquer lugar do projeto.
export const query = (text: string, params?: any[]) => {
  return pool.query(text, params);
};