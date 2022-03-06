const Atendimento = require("../models/atendimentos");

module.exports = (app) => {
  app.get("/atendimentos", (req, res) => {
    Atendimento.listar()
      .then((resultados) => res.json(resultados))
      .catch((erros) => res.status(400).json(erros));
  });
  app.get("/atendimentos/:id", (req, res) => {
    const id = parseInt(req.params.id);

    Atendimento.buscaporId(id, res);
  });
  app.post("/atendimentos", (req, res) => {
    const atendimento = req.body;

    Atendimento.adicionar(atendimento)
      .then((atendimentoCadastrado) =>
        res.status(201).json(atendimentoCadastrado)
      )
      .catch((err) => res.status(401).json(err));
  });

  app.patch("/atendimentos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const valores = req.body;

    Atendimento.alterar(id, valores, res);
  });

  app.delete("/atendimentos/:id", (req, res) => {
    const id = parseInt(req.params.id);

    Atendimento.deletar(id, res);
  });
};
