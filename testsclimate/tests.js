exports.config = {
	seleniumAddress: 'http://localhost:4444/wd/hub',
	chromeOnly: true,
	specs: [
	    'e2e/TCP00-deleteClimate.js',
		'e2e/TCP01-loadClimate.js',
		'e2e/TCP02-newCliamte.js',
		'e2e/TCP04-deleteClimate.js'
	]
};