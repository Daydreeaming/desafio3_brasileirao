const bd = require('../utils/database.js');

const criarUsuario = async () => {
	const query = `CREATE TABLE IF NOT EXISTS users
	(
		id serial,
		email varchar(255),
		senha varchar(255)
	)`;

	return bd.query(query);
};

const adicionarUsuarioAoBD = async () => {
	const query = `insert into users
    (email, senha)
values
	('admin@cubos.academy', '$2y$10$fhS97pz7JN24s9Ncr3wWx.IcyICfKXp1QzW46o7AXTzO.pPvMx.V6');`;

	return bd.query(query);
};

const obterUsuarioPorEmail = async (email = null) => {
	if (!email) {
		return null;
	}

	const query = `SELECT * FROM users WHERE email = $1`;
	const result = await bd.query({
		text: query,
		values: [email],
	});

	return result.rows.shift();
};

const drop = async (tableName) => {
	if (tableName) {
		await bd.query(`DROP TABLE ${tableName}`);
	}
};

module.exports = { criarUsuario, adicionarUsuarioAoBD, obterUsuarioPorEmail, drop };
