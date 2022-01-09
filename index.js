const customExpress = require("./config/customExpress");
const postPool = require("./infra/conexao");
const Tabelas = require("./infra/tabelas");

postPool.connect((erro) => {
  if (erro) {
    console.log(erro);
  } else {
    console.log("Connect to database");

    Tabelas.init(postPool);

    const app = customExpress();

    app.listen(3000, () => console.log("Server is running on port 3000"));
  }
});
