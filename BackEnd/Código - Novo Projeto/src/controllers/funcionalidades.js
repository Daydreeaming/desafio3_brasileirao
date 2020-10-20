const fs = require('fs');
const jogos = require('../repositories/jogosTabela.js');
const response = require('./response.js');
const db = require('../utils/database.js');
const classificacao = require('../repositories/classificacao');

const listarJogoPorRodada = async (ctx) => {
	const { rodada = null } = ctx.params;

	if (rodada) {
		const rodadaObtida = await jogos.obterJogosRodada(rodada);
		if (rodadaObtida) {
			return response(ctx, 200, rodadaObtida);
		}
		return response(ctx, 400, { message: 'Bad Request' });
	}

	return response(ctx, 400, { message: 'Pedido mal formatado' });
};

const obterClassificacao = async (ctx) => {
	const brasileirao = await classificacao.organizarClassificacaoBrasileirao();

	if (brasileirao) {
		return response(ctx, 200, brasileirao);
	} else {
		return response(ctx, 404, { message: 'Not Found' });
	}
};

const editarPlacarJogo = () => {};

module.exports = { listarJogoPorRodada, obterClassificacao, editarPlacarJogo };
