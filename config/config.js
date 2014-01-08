//if it becomes necessary, this is where changing configs based on NODE_ENV should be performed
module.exports = {
	db: {
		uri: ('mongodb://localhost/test')
	},
	session: {
		secret: (process.env.SESSION_SECRET || 'asupersecuresecret')
	},
	server: {
		port: (process.env.PORT || 3000)
	}
};
