exports.config = {
	seleniumAddress: 'http://localhost:4444/wd/hub',
	chromeOnly: true,
	specs: [
		"e2e/TC01-newEconomy.js",
    	"e2e/TC02-loadEconomy.js",
    	"e2e/TC03-deleteEconomy.js"
	]
};