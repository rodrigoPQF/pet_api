const conexao = require("../infra/database/conexao");
const moment = require("moment");
const repositorio = require("../repositories/atendimento");
const atendimento = require("../repositories/atendimento");
class Atendimentos {
  constructor() {
    this.dataEhValida = ({ data, dataCriacao }) =>
      moment(data).isSameOrAfter(dataCriacao);

    this.valida = (parametros) =>
      this.validacoes.filter((campo) => {
        const { nome } = campo;
        const parametro = parametros[nome];

        return !campo.valido(parametro);
      });
    this.clienteEhValido = (tamanho) => tamanho >= 5;
    this.validacoes = [
      {
        nome: "data",
        valido: this.dataEhValida,
        mensagem: "Data deve ser maior ou igual a data atual",
      },
      {
        nome: "cliente",
        valido: this.clienteEhValido,
        mensagem: "Cliente deve ter pelomenos 3 caracteres",
      },
    ];
  }

  adicionar(atendimento) {
    const dataCriacao = moment().format("YYYY-MM-DD HH:mm:ss");
    const data = moment(atendimento.data, "DD/MM/YYYY").format(
      "YYYY-MM-DD HH:mm:ss"
    );
    const parametros = {
      data: { data, dataCriacao },
      cliente: { tamanho: atendimento.cliente.length },
    };
    const erros = this.valida(parametros);
    const existemErros = erros.length;

    if (existemErros) {
      return new Promise((resolve, reject) => {
        reject(erros);
      });
    } else {
      const atendimentoDatado = { ...atendimento, dataCriacao, data };
      return repositorio.adiciona(atendimentoDatado).then((resultados) => {
        const id = resultados.insertId;
        return { ...atendimento, id };
      });
    }
  }

  listar() {
    return repositorio.lista();
  }

  buscaporId(id, res) {
    const sql = `SELECT * FROM Atendimentos WHERE id=${id}`;
    conexao.query(sql, (error, resultados) => {
      const antedimento = resultados[0];
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json(antedimento);
      }
    });
  }

  alterar(id, valores, res) {
    if (valores.data) {
      valores.data = moment(valores.data, "DD/MM/YYYY").format(
        "YYYY-MM-DD HH:mm:ss"
      );
    }
    const sql = "UPDATE Atendimentos SET ? WHERE id=?";

    conexao.query(sql, [valores, id], (error, resultados) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json(resultados);
      }
    });
  }

  deletar(id, res) {
    const sql = "DELETE FROM Atendimentos WHERE id=?";

    conexao.query(sql, id, (error, resultados) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json(resultados);
      }
    });
  }
}
module.exports = new Atendimentos();
