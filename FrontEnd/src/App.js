// TODO - Editar item da rodada 
// TODO - Ordenar classificação 

import React from "react";
import "./App.css";

function App() {
	const [loading, setLoading] = React.useState(true);
	const [loadingClassificacao, setLoadingClassificacao] = React.useState(true)
	const [rodada, setRodada] = React.useState(1);
	const [partidas, setPartidas] = React.useState([]);
	const [classificacao, setClassificacao] = React.useState([]);
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [token, setToken] = React.useState(null);
	const [editar, setEditar] = React.useState(null);
	const [idPartida, setIdPartida] = React.useState('');
	const [golsCasa, setGolsCasa] = React.useState(0);
	const [golsVisitante, setGolsVisitantes] = React.useState(0);
	const [ordenar, setOrdenar] = React.useState(0);
	const [tipoOrdenacao, setTipoOrdenacao] = React.useState('crescente');

	const obterClassificacao = () => {
		setLoadingClassificacao(true)
		fetch(`http://localhost:8081/classificacao`, {
			"method": "GET",
			"headers": {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		})
			.then(resp => resp.json())
			.then(resp => {
				const results = resp.dados.map((item, index) => {
					return {posicao: index + 1, 
					...item}
				})

				setClassificacao(results);
				setLoadingClassificacao(false);
			}
		);
	}

	const obterRodada = () => {
		setLoading(true)
		fetch(`http://localhost:8081/jogos/${rodada}`, {
			"crossDomain": true,
			"method": "GET",
			"headers": {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		})
			.then(resp => resp.json())
			.then(resp => {
				const results = resp.dados
				setPartidas(results);
				setLoading(false)
			}
			);
	}

	const logar = (email, password) => {
		fetch(`http://localhost:8081/auth`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		})
			.then(resp => resp.json())
			.then(resp => {
				const results = resp.dados
				if (results.token) {
					setToken(results.token)
				}
			}
			);
	}

	const editarPartida = () => {
		fetch("http://localhost:8081/jogos", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${token}`
			},
			body: JSON.stringify({
				id: idPartida,
				golsCasa: golsCasa,
				golsVisitante: golsVisitante
			})
		}).then( () => {
			obterClassificacao()
			obterRodada()
			setEditar(null)
		})
	}

	React.useEffect(() => {
		obterClassificacao()
	}, []);

	React.useEffect(() => {
		obterRodada();
		// eslint-disable-next-line
	}, [rodada]);


	const proximaRodada = () => {
		if (rodada !== 38) {
			setEditar(null)
			setRodada(oldValue => oldValue + 1);
		}
	}
	const voltarRodada = () => {
		if (rodada !== 1) {
			setEditar(null)
			setRodada(oldValue => oldValue - 1);
		}
	}

	const ordenacao = (index, tipo) => {
		if (index === 0) {
			if(tipo === 'crescente') {
				return classificacao.sort((a, b) => {
					if ( a.posicao > b.posicao ) {
						return 1
					} else {
						return -1
					}
				})
			} else {
				return classificacao.sort((a, b) => {
					if (b.posicao > a.posicao) {
						return 1
					} else {
						return -1
					}
				})
			}
		}

		if (index === 1) {
			if(tipo === 'crescente') {
				setClassificacao( classificacao.sort((a, b) => {
					return a.time.localeCompare(b.time)
				})
			)} else {
				setClassificacao(classificacao.sort((a, b) => {
					return b.time.localeCompare(a.time)
				})
			)}
		}

		if (index === 2) {
			if(tipo === 'crescente') {
				setClassificacao(classificacao.sort((a, b) => {
					if (a.informacoes.pontos > b.informacoes.pontos) {
						return 1
					} else {
						return -1
					}
				})
			)} else {
				setClassificacao(classificacao.sort((a, b) => {
					if (b.informacoes.pontos > a.informacoes.pontos) {
						return 1
					} else {
						return -1
					}
				})
			)}
		}

		if (index === 3) {
			if(tipo === 'crescente') {
				setClassificacao(classificacao.sort((a, b) => {
					if (a.informacoes.empates > b.informacoes.empates) {
						return 1
					} else {
						return -1
					}
				})
			)} else {
				setClassificacao( classificacao.sort((a, b) => {
					if (b.informacoes.empates > a.informacoes.empates) {
						return 1
					} else {
						return -1
					}
				})
			)}
		}

		if (index === 4) {
			if(tipo === 'crescente') {
				setClassificacao(classificacao.sort((a, b) => {
					if (a.informacoes.vitorias > b.informacoes.vitorias) {
						return 1
					} else {
						return -1
					}
				})
			)} else {
				setClassificacao(classificacao.sort((a, b) => {
					if (b.informacoes.vitorias > a.informacoes.vitorias) {
						return 1
					} else {
						return -1
					}
				})
			)}
		}

		if (index === 5) {
			if(tipo === 'crescente') {
				setClassificacao(classificacao.sort((a, b) => {
					if (a.informacoes.derrotas > b.informacoes.derrotas) {
						return 1
					} else {
						return -1
					}
				})
			)} else {
				setClassificacao(classificacao.sort((a, b) => {
					if (b.informacoes.derrotas > a.informacoes.derrotas) {
						return 1
					} else {
						return -1
					}
				})
			)}
		}

		if (index === 6) {
			if(tipo === 'crescente') {
				setClassificacao( classificacao.sort((a, b) => {
					if (a.informacoes.golsFeitos > b.informacoes.golsFeitos) {
						return 1
					} else {
						return -1
					}
				})
			)} else {
				setClassificacao( classificacao.sort((a, b) => {
					if (b.informacoes.golsFeitos > a.informacoes.golsFeitos) {
						return 1
					} else {
						return -1
					}
				})
			)}
		}

		if (index === 7) {
			if(tipo === 'crescente') {
				setClassificacao(classificacao.sort((a, b) => {
					if (a.informacoes.golsSofridos > b.informacoes.golsSofridos) {
						return 1
					} else {
						return -1
					}
				})
			)} else {
				setClassificacao( classificacao.sort((a, b) => {
					if (b.informacoes.golsSofridos > a.informacoes.golsSofridos) {
						return 1
					} else {
						return -1
					}
				})
			)}
		}

		if (index === 8) {
			if(tipo === 'crescente') {
				setClassificacao( classificacao.sort((a, b) => {
					const saldoDeGolsA = a.informacoes.golsFeitos - a.informacoes.golsSofridos
					const saldoDeGolsB = b.informacoes.golsFeitos - b.informacoes.golsSofridos
					if (saldoDeGolsA > saldoDeGolsB) {
						return 1
					} else {
						return -1
					}
				})
			)} else {
				setClassificacao( classificacao.sort((a, b) => {
					const saldoDeGolsA = a.informacoes.golsFeitos - a.informacoes.golsSofridos
					const saldoDeGolsB = b.informacoes.golsFeitos - b.informacoes.golsSofridos
					if (saldoDeGolsB > saldoDeGolsA) {
						return 1
					} else {
						return -1
					}
				})
			)}
		}
	}

	const ordenacaoColuna = (index) => {
		let tipo = 'crescente'
		if (ordenar === index) {
			if(tipoOrdenacao === 'crescente') {
				tipo = 'decrescente'
				setTipoOrdenacao(tipo);
			} else {
				setTipoOrdenacao(tipo);
			}
		} else {
			setOrdenar(index)
			setTipoOrdenacao(tipo)
		}
		ordenacao(index, tipo)
	}

	const imagemSeta = (index) => {
		if(ordenar === index) {
			if (tipoOrdenacao === 'crescente') {
				return  'https://systemuicons.com/images/icons/arrow_up.svg'
			} else {
				return 'https://systemuicons.com/images/icons/arrow_down.svg'
			}
		} else {
			return 'https://systemuicons.com/images/icons/sort.svg'
		}
	}
	return (
		<main>
			<header className="header">
				<div className="header_contents">
					<h1> Brasileirão </h1>
					<form className="login">
						{token === null ? (
							<div>
								<label>
									Email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
								</label>

								<label>
									Senha<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
								</label>
								<button className="button_header" onClick={(e) => {
									e.preventDefault();
									logar(email, password)
								}
								}>Login</button>
							</div>
						) : (
								<button className="button_header" onClick={(e) => {
									e.preventDefault();
									setToken(null);
								}
								}>Deslogar</button>
							)}
					</form>
				</div>
			</header>
			<div className="body">
				<div className="body_table">
					<div className="center">
						<div className="left_table">
							<div className="header_table_left">
								<div className="header_row">
									<button className="button_table_left" onClick={voltarRodada}><img alt="" src="https://systemuicons.com/images/icons/arrow_left.svg" /></button>
									<h2> {rodada}ª rodada </h2>
									<button className="button_table_left" onClick={proximaRodada}><img alt="" src="https://systemuicons.com/images/icons/arrow_right.svg" /></button>
								</div>
							</div>

							<table className="left_table_contents">
								<tbody className="table_contents">
									{loading ?
										<tr className="loading">
											<td>Carregando...</td>
										</tr>
										:
										(
											partidas.map((partida, index) => (
												<tr className="matches" key={partida.id}>
													<td className="team1"> {partida.time_casa} </td>
													<td className="goals"> {editar === index ? <input className="size" value={golsCasa} onChange={ (event) => setGolsCasa(event.target.value)}/>:  partida.gols_casa} </td>
													<td className="goals"> x </td>
													<td className="goals"> {editar === index  ? <input className="size" value={golsVisitante} onChange={ (event) => setGolsVisitantes(event.target.value)}/>: partida.gols_visitante} </td>
													<td className="team2"> {partida.time_visitante} </td>
													{token && (
														<td> {editar === index  ? (
															<button 
																className="button_table_left_contents" 
																onClick={() => {
																	editarPartida()
																	}}> 
																	<img alt="" src=" https://systemuicons.com/images/icons/check.svg" />
															</button>) 
														:(
															<button 
																className="button_table_left_contents" 
																onClick={() => {
																	setEditar(index);
																	setIdPartida(partida.id)
																	setGolsCasa(partida.gols_casa)
																	setGolsVisitantes(partida.gols_visitante)
																}}> 
																	<img alt="" src="https://systemuicons.com/images/icons/pen.svg"/>
															</button>
														)}
														</td>
													)}
												</tr>
											))
										)
									}
								</tbody>
							</table>
						</div>

						<table className="right_table">
							<thead className="header_table_right">
								<tr className="data">
									<th className="data_row">
										<span>Posição</span>
										<button className="button_table_right" onClick={() => { ordenacaoColuna(0) }}>
											<img alt="" src={imagemSeta(0)} />
										</button>
									</th>
									<th className="data_row">
										<span>Time</span>
										<button className="button_table_right" onClick={ () => ordenacaoColuna(1)}> 
											<img alt="" src={imagemSeta(1)} />
										</button>
									</th>
									<th className="data_row">
										<span>PTS</span>
										<button className="button_table_right" onClick={() => ordenacaoColuna(2)}>
											<img alt="" src={imagemSeta(2)} />
										</button>
									</th>
									<th className="data_row">
										<span>E</span>
										<button className="button_table_right" onClick={ () => ordenacaoColuna(3)}>
											<img alt="" src={imagemSeta(3)} />
										</button>
									</th>
									<th className="data_row">
										<span>V</span>
										<button className="button_table_right" onClick={ () => ordenacaoColuna(4)}>
											<img alt="" src={imagemSeta(4)} />
										</button>
									</th>
									<th className="data_row">
										<span>D</span>
										<button className="button_table_right" onClick={ () => ordenacaoColuna(5)}>
											<img alt="" src={imagemSeta(5)} />
										</button>
									</th>
									<th className="data_row">
										<span>GF</span>
										<button className="button_table_right" onClick={ () => ordenacaoColuna(6)}>
											<img alt="" src={imagemSeta(6)} />
										</button>
									</th>
									<th className="data_row">
										<span>GS</span>
										<button className="button_table_right" onClick={ () => ordenacaoColuna(7)}>
											<img alt="" src={imagemSeta(7)} />
										</button>
									</th>
									<th className="data_row">
										<span>SG</span>
										<button className="button_table_right" onClick={ () => ordenacaoColuna(8)}>
											<img alt="" src={imagemSeta(8)} />
										</button>
									</th>
								</tr>
							</thead>

							<tbody className="table_contents">
								{loadingClassificacao ? (
									<tr className="loading">
										<td colSpan={9}>Carregando...</td>
									</tr>
								): classificacao.map((time, index) => (
									<tr key={index}>
										<td className="td_stylization">{time.posicao}</td>
										<td className="td_stylization">{time.time}</td>
										<td className="td_stylization">{time.informacoes.pontos}</td>
										<td className="td_stylization">{time.informacoes.empates}</td>
										<td className="td_stylization">{time.informacoes.vitorias}</td>
										<td className="td_stylization">{time.informacoes.derrotas}</td>
										<td className="td_stylization">{time.informacoes.golsFeitos}</td>
										<td className="td_stylization">{time.informacoes.golsSofridos}</td>
										<td className="td_stylization">{time.informacoes.golsFeitos - time.informacoes.golsSofridos}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</main>
	);
}

export default App;