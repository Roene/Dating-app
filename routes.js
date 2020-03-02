exports.index = function index (req, res) {
    res.render('pages/index')
}

exports.signUpForm = function signUpForm (req, res) {
    res.render('pages/sign-up')
}

exports.signUp = function signUp (req, res) {

}

exports.loginForm = function loginForm (req, res) {
    res.render('pages/login')
}

exports.login = function login (req, res) {

}

exports.dashboard = function dashboard (req, res) {
    res.render('pages/dashboard')
}

exports.notFound = function notFound (req, res) {
    res.status(404).render('pages/not-found')
}