const response = require('../utils/response.js');
const auth = require('../repositories/users.js');
const Password = require('../utils/password.js');
const jwt = require('jsonwebtoken')

require('dotenv').config();

const autenticar = async (ctx) => {
	const { email = null, password = null} = ctx.request.body;

	if(!email || !password) {
		return response (ctx, 400, { mensagem: 'Pedido mal formatado'})
	}

	const user = await auth.obterUsuarioPorEmail(email);

	if (user) {
		const comparison = await Password.check(password, user.senha);
		if(comparison) {
			const token = jwt.sign({id: user.id, email: user.email}, process.env.JWT_SECRET || 'Desafio3', {
				expiresIn: '13242342423423' })
			return response(ctx, 200, { token });
		} 
	}
	return response(ctx, 200, { mensagem: 'Email ou senha incorretos' });

};

module.exports = { autenticar };
