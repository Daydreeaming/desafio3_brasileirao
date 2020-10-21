const jogos = require('../repositories/jogosTabela.js');
const response = require('../utils/response.js');
const db = require('../utils/database.js');
const classificacao = require('../repositories/classificacao.js');

const listarJogoPorRodada = async (ctx) => {
	const { rodada = null } = ctx.params;
	const rodadaObtida = await jogos.obterJogosRodada(rodada);
	
	if (rodadaObtida.length) {
		return response(ctx, 200, rodadaObtida);
	}
	return response(ctx, 400, { message: 'Bad Request' });
};

const obterClassificacao = async (ctx) => {
	const brasileirao = await classificacao.organizarClassificacaoBrasileirao();

	if (brasileirao) {
		return response(ctx, 200, brasileirao);
	} else {
		return response(ctx, 404, { message: 'Not Found' });
	}
};

const editarPlacarJogo = async (ctx) => {
	const placarEditado = await classificacao.editarPlacarPartida(ctx);

	if (placarEditado) {
		return response(ctx, 200, { mensagem: 'Success' });
	} else {
		return response(ctx, 400, { mensagem: 'Bad Request' });
	}
};

module.exports = { listarJogoPorRodada, obterClassificacao, editarPlacarJogo };
