describe('Check if data is loaded', function () {
	it('Show a list of data', function (){
		browser.get('http://localhost:8080/#!/populationstats/');
		var stats = element.all(by.repeater('stat in popstats'));
		expect(stats.count()).toBeGreaterThan(0);
	});
});