import * as dotenv from 'dotenv';
dotenv.config(); //carrega as variaveis do .env

import * as http from 'http';
import { login } from '../routes/authRoutes'; //importa a função de login

//servidor
const server = http.createServer(async (req, res) => {
  //aceita apenas o método POST no endpoint /login
  if (req.method === 'POST' && req.url === '/login') {

    let body = '';
    req.on('data', chunk => {
      body += chunk.toString(); //constrói o corpo da requisição
    });

    //quando a requisição terminar
    req.on('end', async () => {
      try {
        //transforma o texto (JSON) em um objeto JavaScript
        const { matricula, senha } = JSON.parse(body);

        if (!matricula || !senha) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Matrícula e senha são obrigatórios.' }));
          return;
        }

        //usa o serviço de login
        const resultadoLogin = await login(matricula, senha);

        if (resultadoLogin.success) {
          //sucesso
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(resultadoLogin));
        } else {
          //falha (Usuário ou senha errados)
          res.writeHead(401, { 'Content-Type': 'application/json' }); // 401 = Não autorizado
          res.end(JSON.stringify({ message: resultadoLogin.message }));
        }

      } catch (error) {
        //erros no json (por exemplo)
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Erro interno no servidor.' }));
      }
    });

  } else {
    // Se não for POST em /login, retorna "Não Encontrado"
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Endpoint não encontrado.' }));
  }
});

//porta em que o servidor vai rodar
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor SGI rodando na porta ${PORT}`);
  console.log('Envie um POST para http://localhost:3000/login');
});