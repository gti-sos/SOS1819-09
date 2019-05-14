exports.config = {
	seleniumAddress: 'http://localhost:4444/wd/hub',
	chromeOnly: true,
	specs: [
		'e2e/TCP01-newEconomy.js',
		'e2e/TCP02-loadEconomy.js',
		'e2e/TCP03-deleteEconomy.js'
	]

};