const postLogout = (req, res) => {
  const cookiesToClear = ['access-cookie', 'otp-cookie', 'refresh-cookie']

  // Loop through the array of cookie names and clear each one
  cookiesToClear.forEach((cookieName) => {
    res.clearCookie(cookieName)
  })

  return res.status(200).json({ message: 'Successfully Logged Out' })
}

module.exports = postLogout
