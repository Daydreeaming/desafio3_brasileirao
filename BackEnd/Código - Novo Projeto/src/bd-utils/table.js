const jogos = require('../repositories/jogosTabela.js');
const users = require('../repositories/users.js');

const arg = process.argv.slice(2);

if (arg[0] === 'jogos') {
	console.log('Criando tabela...');
	jogos.criarTabelaJogos();
	console.log(`Tabela 'Jogos' criada!`);
	console.log('Adicionando jogos...');
	jogos.adicionarJogosExistentes();
	console.log('Jogos adicionados');
} else if (arg[0] === 'users') {
	console.log('Criando tabela...');
	users.criarUsuario();
	console.log(`Tabela 'Users' criada!`);
	console.log('Adicionando usuário');
	users.adicionarUsuarioAoBD();
	console.log('Usuário adicionados');
} else {
	console.log('Comando Inválido');
}

return
