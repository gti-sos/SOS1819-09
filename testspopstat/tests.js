exports.config = {
	seleniumAddress: 'http://localhost:4444/wd/hub',
	chromeOnly: true,
	specs: [
		'e2e/TCP01-loadData.js',
		'e2e/TCP02-newStat.js',
		'e2e/TCP03-deleteStat.js'
		
	]

};