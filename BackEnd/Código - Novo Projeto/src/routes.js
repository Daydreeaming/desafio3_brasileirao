const Router = require('koa-router');
const router = new Router();


const funcionalidades = require('./controllers/funcionalidades');



// Rota para autenticação //

router.post('/auth', )

// Rotas Get //
router.get('/jogos/:rodada', funcionalidades.listarJogoPorRodada);
router.get('/classificacao', funcionalidades.obterClassificacao);

// Rotas post //
router.post('/jogos', funcionalidades.editarPlacarJogo)

module.exports = router;
