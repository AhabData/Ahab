/*
    These environment variables are not hardcoded so as not to put
    production information in a repo. They should be set in your
    heroku (or whatever VPS used) configuration to be set in the
    applications environment, along with NODE_ENV=production

 */

module.exports = {
    "DATABASE_URI": process.env.MONGOLAB_URI,
    "SESSION_SECRET": process.env.SESSION_SECRET,
    "GITHUB": {
    "clientID": process.env.GITHUB_CLIENT_ID,
    "clientSecret":  process.env.GITHUB_CLIENT_SECRET,
    "callbackURL": process.env.GITHUB_CALLBACK_URL
  }
};