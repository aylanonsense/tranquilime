//if it becomes necessary, this is where changing configs based on NODE_ENV should be performed
module.exports = {
	db: {
		uri: (  process.env.MONGOLAB_URI ||
                process.env.MONGOHQ_URL ||
                'mongodb://localhost/HelloMongoose')
	},
	session: {
		secret: (process.env.SESSION_SECRET || 'asupersecuresecret')
	},
	server: {
		port: (process.env.PORT || 3000)
	}
};
