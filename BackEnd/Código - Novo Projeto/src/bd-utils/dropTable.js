const jogos = require('../repositories/jogosTabela.js');
const users = require('../repositories/users');

const arg = process.argv.slice(2);

if (arg[0] === 'jogos') {
	jogos.drop('jogos')
	console.log(`Tabela jogos dropada!`)
} else if (arg[0] === 'users') {
	users.drop('users');
	console.log(`Tabela users dropada!`)
} else {
	console.log('Comando Inválido');
}


return 0
// process.exit(0)