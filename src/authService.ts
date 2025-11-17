import { query } from "./db"; //importa a conexão do banco de dados
import * as bcrypt from "bcrypt"; //importa o bcrypt para ler o hash da senha

//Tenta autenticar um usuário com matrícula e senha
export async function login(matricula: string, senha: string) {
  console.log(`Tentativa de login para matrícula: ${matricula}`);

  try {
    const sql = "SELECT * FROM responsavel WHERE matricula = $1";
    const params = [matricula];
    const result = await query(sql, params);

    //verifica se o usuário existe
    if (result.rows.length === 0) {
      console.log("Usuário não encontrado.");
      return { success: false, message: "Matrícula não cadastrada." };
    }

    const usuario = result.rows[0];
    const senhaDoBanco = usuario.senha; //Hash

    // Compara a senha digitada (senha) com o hash do banco (senhaDoBanco)
    const senhaCorreta = await bcrypt.compare(senha, senhaDoBanco);

    if (senhaCorreta) {
      console.log(`Login bem-sucedido para: ${usuario.nome}`);
      return {
        success: true,
        message: `Bem-vindo, ${usuario.nome}!`,
        usuario: {
          nome: usuario.nome,
          matricula: usuario.matricula,
          perfil_id: usuario.perfil_id,
        },
      };
    } else {
      console.log("Senha incorreta.");
      return { success: false, message: "Matrícula ou senha inválida." };
    }
  } catch (err) {
    console.error("Erro durante o login:", err);
    return { success: false, message: "Erro interno no servidor." };
  }
}
