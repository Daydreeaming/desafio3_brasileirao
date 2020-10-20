const jogos = require('./jogosTabela.js');

const organizarClassificacaoBrasileirao = async () => {
	let tabelaBrasileirao = await jogos.obterTodosOsJogos();
	const classificacao = [];

	for (const partida of tabelaBrasileirao) {

		const timeCasa = partida.time_casa;
		const timeVisitante = partida.time_visitante;
		const golsCasa = partida.gols_casa;
		const golsVisitante = partida.gols_visitante;
		
		let existeTime = classificacao.find((elemento) => {
			return elemento.time === timeCasa
		})

		if(existeTime === undefined) {
			classificacao.push(
				{
					"time": timeCasa,
					"informacoes": 
						{
							"pontos": 0,
							"empates": 0,
							"vitorias": 0,
							"derrotas": 0,
							"golsFeitos": 0,
							"golsSofridos": 0,
						}
				}
			);
		}

		existeTime = classificacao.find((elemento) => {
			return elemento.time === timeVisitante
		})

		if(existeTime === undefined) {
			classificacao.push(
				{
					"time": timeVisitante,
					"informacoes": 
						{
							"pontos": 0,
							"empates": 0,
							"vitorias": 0,
							"derrotas": 0,
							"golsFeitos": 0,
							"golsSofridos": 0,
						}
				}
			);
		}

		for (let i = 0; i < classificacao.length; i++) {
			if (classificacao[i].time === timeCasa) {
				classificacao[i].informacoes.golsFeitos += golsCasa
				classificacao[i].informacoes.golsSofridos += golsVisitante

				if (golsCasa > golsVisitante) {
					classificacao[i].informacoes.vitorias ++
					classificacao[i].informacoes.pontos += 3
				} else if (golsCasa < golsVisitante) {
					classificacao[i].informacoes.derrotas ++
				} else {
					classificacao[i].informacoes.empates ++
					classificacao[i].informacoes.pontos += 1
				}
			}
			
			if (classificacao[i].time === timeVisitante) {
				classificacao[i].informacoes.golsFeitos += golsVisitante
				classificacao[i].informacoes.golsSofridos += golsCasa

				if (golsVisitante > golsCasa) {
					classificacao[i].informacoes.vitorias ++
					classificacao[i].informacoes.pontos += 3
				} else if (golsVisitante < golsCasa) {
					classificacao[i].informacoes.derrotas ++
				} else {
					classificacao[i].informacoes.empates ++
					classificacao[i].informacoes.pontos += 1
				}
			}
		}
	}
	return classificacao
}

module.exports = { organizarClassificacaoBrasileirao }