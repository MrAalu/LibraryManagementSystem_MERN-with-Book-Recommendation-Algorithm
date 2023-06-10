const PageNotFound = (req, res) => {
  res.status(StatusCodes.NOT_FOUND).send('Page Not FOUND ! 404 ERROR')
}

module.exports = PageNotFound
