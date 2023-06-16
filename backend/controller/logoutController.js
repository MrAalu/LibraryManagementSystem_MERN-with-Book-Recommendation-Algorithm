const postLogout = (req, res) => {
  const cookie_id = req.userId

  res.clearCookie(cookie_id)
  // console.log(cookie_id)

  res.status(200).json({ message: 'Successfully Logged Out' })
}

module.exports = postLogout
