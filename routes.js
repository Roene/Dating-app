exports.index = function index (req, res) {
    res.render('pages/index')
}

exports.signUp = function signUp (req, res) {
    res.render('pages/sign-up')
}

exports.about = function about (req, res) {
    res.render('pages/about')
}

exports.notFound = function notFound (req, res) {
    res.status(404).render('pages/not-found')
}