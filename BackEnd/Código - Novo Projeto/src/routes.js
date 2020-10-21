const Router = require('koa-router');
const router = new Router();
const funcionalidades = require('./controllers/funcionalidades.js');
const auth = require('./controllers/auth.js');
const Session = require('./middlewares/session.js')

// Rota para autenticação //

router.post('/auth', auth.autenticar);

// Rotas Get //
router.get('/jogos/:rodada', funcionalidades.listarJogoPorRodada);
router.get('/classificacao', funcionalidades.obterClassificacao);

// Rotas post //
router.post('/jogos', Session.verify, funcionalidades.editarPlacarJogo);

module.exports = router;
