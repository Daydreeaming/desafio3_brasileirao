const response = require('./response');
const auth = require('../repositories/users.js');

const autenticar = async (ctx) => {
	const { email = null, password = null} = ctx.request.body;

	if(!email || !password) {
		return response (ctx, 400, { mensagem: 'Pedido mal formatado'})
	}

	const user = await auth.obterUsuarioPorEmail(email);

	if (user) {
		if(user.senha === password) {
			return response(ctx, 200, { mensagem: 'Success!' });
		} 
	}
	return response(ctx, 200, { mensagem: 'Email ou senha incorretos' });

};

module.exports = { autenticar };
