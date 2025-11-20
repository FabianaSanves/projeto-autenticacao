# SGI - Sistema de Gestão de Itinerário (Autenticação | Backend)

Este projeto consiste no desenvolvimento do **Backend** para um sistema de autenticação. O objetivo do módulo atual é fornecer uma API segura e eficiente para permitir o Login dos usuários, conectando-se a um banco de dados PostgreSQL em nuvem.

O projeto foi construído **sem o uso de frameworks web**, utilizando apenas módulos nativos do Node.js para fins didáticos e de performance, com **TypeScript** para tipagem estática.

## 🚀 Tecnologias Utilizadas

* **Node.js** 
* **TypeScript** 
* **PostgreSQL** (Banco de Dados Relacional)
* **pg** (Driver de conexão com o Banco)
* **bcrypt** (Hashing e segurança de senhas)
* **dotenv** (Gerenciamento de variáveis de ambiente)

## ⚙️ Funcionalidades Implementadas

- **Servidor HTTP Nativo:** Criação de servidor utilizando o módulo `http` do Node.js.
- **Conexão com Banco de Dados:** Gerenciamento de pool de conexões com PostgreSQL via `pg`.
- **Autenticação Segura:**
    - Login via Matrícula e Senha.
    - Comparação de senha criptografada (Hash) utilizando `bcrypt`.
- **Variáveis de Ambiente:** Segurança de credenciais sensíveis utilizando `.env`.
- **Tratamento de Erros:** Respostas HTTP padronizadas (400, 401, 404, 500).

## 🛠️ Como Rodar o Projeto

### Pré-requisitos

- Node.js instalado.
- Acesso ao banco de dados PostgreSQL.

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/seu-usuario/sgi-backend.git](https://github.com/seu-usuario/sgi-backend.git)
   cd login-sgi

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

3.  **Configure as Variáveis de Ambiente:**
    Crie um arquivo `.env` na raiz do projeto e preencha com suas credenciais:

    ```env
    DB_USER=seu_usuario
    DB_HOST=seu_host
    DB_DATABASE=postgres
    DB_PASSWORD=sua_senha
    DB_PORT=5432
    ```

4.  **Inicie o Servidor:**

    ```bash
    npm start
    ```

    *O servidor rodará em `http://localhost:3000`*

## 📡 Documentação da API

### 🔐 Login

Realiza a autenticação do responsável no sistema.

  - **URL:** `/login`
  - **Método:** `POST`
  - **Corpo da Requisição (JSON):**

<!-- end list -->

```json
{
  "matricula": "suporte123",
  "senha": "sua_senha_aqui"
}
```

#### Respostas Possíveis:

  - **200 OK (Sucesso):**

    ```json
    {
      "success": true,
      "message": "Bem-vindo, Nome do Usuário!",
      "usuario": {
        "nome": "Nome do Usuário",
        "matricula": "suporte123",
        "perfil_id": 1
      }
    }
    ```

  - **400 Bad Request (Dados faltando):**

    ```json
    {
      "message": "Matrícula e senha são obrigatórios."
    }
    ```

  - **401 Unauthorized (Login inválido):**

    ```json
    {
      "message": "Matrícula ou senha inválida."
    }
    ```

## 🗄️ Estrutura do Banco de Dados

O sistema espera uma tabela `perfis` e `responsavel` com a seguinte estrutura básica:

perfis
| Coluna | Tipo | Descrição |
| :--- | :--- | :--- |
| `perfil_id` | SERIAL | Identificador único |
| `matricula` | VARCHAR | Login do usuário |


responsavel 
| Coluna | Tipo | Descrição |
| :--- | :--- | :--- |
| `id` | SERIAL | Identificador único |
| `nome` | VARCHAR | Nome do responsável |
| `matricula` | VARCHAR | Login do usuário |
| `senha` | VARCHAR | **Hash** da senha (gerado via bcrypt) |
| `perfil_id` | INT | 1 (Suporte) ou 2 (Coordenação) |

-----

Desenvolvido para fins acadêmicos - Projeto Integrador da IFG.

```
```
