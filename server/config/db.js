module.exports = {

url: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://localhost/UserReports',
sessionSecret: process.env.SESSION_SECRET || 'MySecret'
};