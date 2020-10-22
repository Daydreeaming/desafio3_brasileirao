import React from "react";
import "./App.css";


function App() {

	const fetchJson = (url) => fetch(url).then((res) => res.json());
	const [rodada, setRodada ]= React.useState(0)
	const [times, setTimes] = React.useState(null)
	
	React.useEffect(() => {
		fetch(`https://desafio-3-back-cubos-academy.herokuapp.com/classificacao`)
		.then(resp => resp.json())
		.then(resp => {
			const results = resp.dados			

		});

	}, []);
return (
    <div className="body">
		<div className="header">
			<div className="header_contents">
				<h1> Brasileirão </h1>
				<form className="login">
					<label>
						Email<input type="email"/>
					</label>
					
					<label>
						Senha<input type="password"/>
					</label>

					<button className="button_header">Login</button>
				</form>
			</div>
		</div>

		<div className="body_table">
			<div className="center">
				<div className="left_table">
					<div className="header_table_left">
						<div className="header_row">
								<button className="button_table_left"><img src="https://systemuicons.com/images/icons/arrow_left.svg"/></button>
								<h2> 1a rodada </h2>
								<button className="button_table_left"><img src="https://systemuicons.com/images/icons/arrow_right.svg"/></button>
						</div>
					</div>

					<table className="left_table_contents"> 
						<tbody className="table_contents">
							{ rodada === null ? <tr className="loading"> Carregando ... </tr> : <tr className="matches">								<td className="team1"> Bahia </td>
								<td className="goals"> 1 </td>
								<td className="goals"> x </td>
								<td className= "goals"> 2 </td>
								<td className= "team2"> Internacional </td>
								<td> <button className="button_table_left_contents"> <img src="https://systemuicons.com/images/icons/pen.svg"/></button></td>
							</tr>}
						</tbody>
					</table>
				</div>

				<table className="right_table">
					<thead className="header_table_right">
						<tr className="data">
							<th className="data_row"> Posição 
								<button className="button_table_right"><img src="https://systemuicons.com/images/icons/sort.svg"/></button>
							</th> 
							<th className="data_row"> Time 
								<button className="button_table_right"><img src="https://systemuicons.com/images/icons/sort.svg"/></button>
							</th>
							<th className="data_row"> PTS 
								<button className="button_table_right"><img src="https://systemuicons.com/images/icons/sort.svg"/></button>
							</th>
							<th className="data_row"> E 
								<button className="button_table_right"><img src="https://systemuicons.com/images/icons/sort.svg"/></button>	
							</th>
							<th className="data_row"> V 
								<button className="button_table_right"><img src="https://systemuicons.com/images/icons/sort.svg"/></button>	
							</th>
							<th className="data_row"> D 
								<button className="button_table_right"><img src="https://systemuicons.com/images/icons/sort.svg"/></button>	
							</th>
							<th className="data_row"> GF 
								<button className="button_table_right"><img src="https://systemuicons.com/images/icons/sort.svg"/></button>	
							</th>
							<th className="data_row"> GS 
								<button className="button_table_right"><img src="https://systemuicons.com/images/icons/sort.svg"/></button>	
							</th>
							<th className="data_row"> SG 
								<button className="button_table_right"><img src="https://systemuicons.com/images/icons/sort.svg"/></button>	
							</th>
						</tr>
					</thead>

					<tbody className="table_contents">
						<tr>
							<td className="td_stylization">1</td>
							<td className="td_stylization">Flamengo</td>
							<td className="td_stylization">86</td>
							<td className="td_stylization">11</td>
							<td className="td_stylization">21</td>
							<td className="td_stylization">6</td>
							<td className="td_stylization">85</td>
							<td className="td_stylization">43</td>
							<td className="td_stylization">42</td>
						</tr>

						<tr>
							<td className="td_stylization">1</td>
							<td className="td_stylization">Chapecoense</td>
							<td className="td_stylization">86</td>
							<td className="td_stylization">11</td>
							<td className="td_stylization">21</td>
							<td className="td_stylization">6</td>
							<td className="td_stylization">85</td>
							<td className="td_stylization">43</td>
							<td className="td_stylization">42</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
    </div>
);
}

export default App;
