const fs = require('fs');
const tabela = require('../repositories/tabela.js');

const db = require('../utils/database.js');

const listarJogoPorRodada = async () => {
	const rodada = await tabela.obterJogosRodada(1);
	console.log(rodada)
};

const obterClassificacao = async () => {
	let tabelaBrasileirao = await tabela.criarTabelaJogos();
	tabelaBrasileirao = await tabela.adicionarJogos();
	console.log(tabelaBrasileirao);
};

const editarPlacarJogo = () => {};

module.exports = { listarJogoPorRodada, obterClassificacao, editarPlacarJogo };
