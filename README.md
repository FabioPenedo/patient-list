![pc](https://user-images.githubusercontent.com/82732587/176803325-1605be3f-450e-402a-b028-aa679a28114c.gif)

![c](https://user-images.githubusercontent.com/82732587/176803726-a026b536-1e91-47b6-9675-684d9ffaf20f.png)

![d](https://user-images.githubusercontent.com/82732587/176803757-505d4fcb-e69c-4563-8de5-cb3740a4ca27.png)

## 💻 Projeto

Sistema de funcionários e pacientes para hospitais.

// Api: 
- Há 3 tabelas no banco de dados "employees" "patients" "statushistory"
- Testes feitos nos controller com JEST
- Rotas para registrar e fazer login.
- Para acessar as outras rotas é preciso enviar o token gerado na rota de login.
- Tem dois tipos de funcionarios o "ordinary" e "master", onde o "master" pode deletar pacientes.
- Cada funcionário que fizer alteração no status, seja para "ativo" "transferido" ou "cancelado", registrará na tabela "statushistory", o id do funcionário, o id do paciente, o status anterior, o status atual e a data de alteração
- Rota para listar todos os pacientes, rota para listar pelo id, filtro pelo status, pelo nome do paciente e a data de alteração do status.

## 🧱 Tecnologias

+ NodeJs(Express)
+ TypeScript
+ JavaScript
+ PostgreSQL
+ JWT
+ Jest


## ✨ Executar localmente

Váriaveis de ambiente, .env.example:

```bash
PG_DB=   || Nome do banco de dados ||
PG_USER=   || Nome do usuário no banco de dados ||
PG_PASSWORD=   || Senha do usuário no banco de dados ||
PG_PORT=   || Porta do banco de dados ||
JWT_SECRET= || Key JWT, exemplo: 1234 ||

PG_TEST_DB=   || Nome do banco de dados de teste ||
PG_TEST_USER=   || Nome do usuário no banco de dados ||
PG_TEST_PASSWORD=   || Senha do usuário no banco de dados ||
PG_TEST_PORT=   || Porta do banco de dados ||
```

Clone o projeto

```bash
git clone https://github.com/FabioPenedo/patient-list
```

Entre na pasta do projeto

```bash
cd patient-list
```

Instale as dependências globais

```bash
npm install -g nodemon typescript ts-node
```

Instale as dependências

```bash
npm install
```

Inicie o servidor

```bash
npm run start-dev
```

Feito por Fábio Penedo: 👋 [Entre em contato](https://www.linkedin.com/in/fabiopenedo/)