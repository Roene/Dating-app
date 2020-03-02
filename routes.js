exports.index = function index (req, res) {
    res.render('pages/index')
}

exports.signUp = function signUp (req, res) {
    res.render('pages/sign-up')
}

exports.login = function login (req, res) {
    res.render('pages/login')
}

exports.notFound = function notFound (req, res) {
    res.status(404).render('pages/not-found')
}