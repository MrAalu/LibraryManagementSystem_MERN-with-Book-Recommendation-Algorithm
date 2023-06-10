// SOUL purpose of this is to remove all try/catch boiler plate from Controllers

const TryCatchWrapper = (custom_function) => {
  return async (req, res, next) => {
    try {
      await custom_function(req, res, next)
    } catch (error) {
      // Throwing Error to handle Manually or else inbuilt handler works automatically
      next(error)
    }
  }
}

module.exports = TryCatchWrapper

// THIS IS NOT USED ANYMORE - we use package called 'async-express-errors' that does this for us
