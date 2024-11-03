# Sistema Lista de Tarefas 🗂️✅

Bem-vindo ao **Sistema Lista de Tarefas**! Este projeto é uma aplicação web desenvolvida para gerenciar tarefas de forma eficiente. Aqui você pode cadastrar, editar e excluir suas tarefas, além de organizar sua lista conforme sua necessidade.

## Funcionalidades 🚀

### Lista de Tarefas

- Exibe todos os registros da tabela "Tarefas" (exceto o campo "Ordem de apresentação").
- As tarefas são apresentadas ordenadas pelo campo "Ordem de apresentação".
- Tarefas com custo maior ou igual a R$1.000,00 são destacadas com fundo laranja.
- Cada tarefa possui botões para **Editar** ✏️ e **Excluir** ❌.
- Um botão para **Incluir** nova tarefa no final da lista ➕.

### Excluir

- Confirmação de exclusão (Sim/Não) é apresentada ao tentar excluir uma tarefa.

### Editar

- Permite a edição do "Nome da Tarefa", "Custo" e "Data Limite".
- Verifica se o novo nome da tarefa já existe na base de dados.

### Incluir

- Permite a inclusão de uma nova tarefa informando apenas o "Nome da Tarefa", "Custo" e "Data Limite".
- Campos restantes são gerados automaticamente.
- O novo registro é adicionado ao final da lista.

### Reordenação das Tarefas

- Permite alterar a ordem de apresentação de tarefas.
- Botões para **subir** ⬆️ e **descer** ⬇️ tarefas.

## Estrutura do Banco de Dados 🗄️

Tabela: **Tarefas**

| Campo                   | Tipo           |
| ----------------------- | -------------- |
| Identificador da tarefa | Chave Primária |
| Nome da tarefa          | Texto          |
| Custo                   | Número (R$)    |
| Data limite             | Data           |
| Ordem de apresentação   | Numérico       |

## Tecnologias Utilizadas 💻

- **Node.js** ![Node.js](https://img.icons8.com/color/48/000000/nodejs.png)
- **Express** ![Express](https://img.icons8.com/color/48/000000/express.png)
- **EJS** (Embedded JavaScript) ![EJS](https://img.icons8.com/color/48/000000/ejs.png)
- **PostgreSQL** ![PostgreSQL](https://img.icons8.com/color/48/000000/postgreesql.png)
- **Bootstrap** ![Bootstrap](https://img.icons8.com/color/48/000000/bootstrap.png)

## Como Executar o Projeto 🏗️

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/sistema-lista-tarefas.git
   cd sistema-lista-tarefas
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure seu banco de dados PostgreSQL e crie a tabela "Tarefas".

4. Inicie o servidor:

   ```bash
   node api/server.js
   ```

5. Acesse a aplicação em [http://localhost:3000](http://localhost:3000).

## Acesse a Aplicação 🌐

Experimente a aplicação online em: [Sistema Lista de Tarefas](https://lista-de-tarefas-inky-ten.vercel.app/)

## Contribuições 🤝

Contribuições são sempre bem-vindas! Se você deseja ajudar a melhorar este projeto, siga estas etapas:

1. Faça um fork do projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`).
3. Commit suas alterações (`git commit -m 'Adicionando uma nova feature'`).
4. Push para a branch (`git push origin feature/MinhaFeature`).
5. Abra um Pull Request.
