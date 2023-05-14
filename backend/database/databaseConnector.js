const mongoose = require('mongoose')

const ConnectDatabase = (connection_url) => {
  mongoose.connect(connection_url)
}

module.exports = { ConnectDatabase }
