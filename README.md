# Blog Engine API 🚀

Esta é uma API RESTful desenvolvida em Node.js para o gerenciamento de postagens e comentários com autenticação segura via JWT (JSON Web Token), utilizando PostgreSQL como banco de dados relacional e Sequelize como ORM. O ambiente foi totalmente dockerizado para facilitar a execução e garantir a consistência do desenvolvimento.

## 🛠️ Tecnologias e Ferramentas Utilizadas

- **Node.js** com **Express** (Criação dos endpoints)
- **Sequelize ORM** (Abstração e manipulação dos dados)
- **PostgreSQL** (Banco de dados relacional principal)
- **JWT (JSON Web Token)** (Autenticação e proteção de rotas com expiração de 1 hora)
- **BCrypt** (Criptografia e hashing seguro de senhas)
- **Docker & Docker Compose** (Containerização do ambiente)

## 📌 Funcionalidades Implementadas

### 🔑 Autenticação & Usuários
- **Registro de Usuários:** Criação de novos usuários com armazenamento seguro de senha (hash).
- **Login de Usuários:** Autenticação por username/password gerando token JWT válido por 1 hora.
- **Middleware de Autenticação:** Proteção global e validação do token nas rotas do sistema.

### 📝 CRUD de Posts
- **Inserir Post:** Criação de postagens atreladas automaticamente ao usuário logado.
- **Listar Posts (Eager Loading):** Retorna todas as postagens trazendo os dados do autor e os respectivos comentários aninhados de forma otimizada.
- **Atualizar Post:** Permite a edição do conteúdo apenas pelo autor original do post.
- **Deletar Post:** Permite a exclusão do post apenas pelo autor original.

### 💬 CRUD de Comentários
- **Adicionar Comentário:** Permite que usuários autenticados comentem em qualquer post existente.
- **Apagar Comentário:** Permite a remoção de um comentário específico, garantindo que apenas o dono possa apagá-lo.

---

## 🚀 Como Executar o Projeto com Docker (Recomendado)

Certifique-se de ter o **Docker** e o **Docker Compose** instalados em sua máquina.

### 1. Clonar o Repositório
```bash
git clone [https://github.com/prates-k/blog-engine-api.git](https://github.com/prates-k/blog-engine-api.git)
cd blog-engine-api
