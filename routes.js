exports.index = function index (req, res) {
    res.render('index.ejs')
}

exports.about = function about (req, res) {
    res.render('about.ejs')
}

exports.notFound = function notFound (req, res) {
    res.status(404).render('not-found.ejs')
}