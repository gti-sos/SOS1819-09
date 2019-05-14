describe('Check if a new popstat can be created', function () {
	it('The new stat should be showed', function (){
		browser.get('http://localhost:8080/ui/v1/populationstats/');
		                     element
		                        .all(by.repeater('stat in popstats'))
		                        .then(function(intialStats){
		                            
		                            element(by.model('newPopStat.country')).sendKeys('France');
		                            element(by.model('newPopStat.year')).sendKeys(2019);
		                            element(by.model('newPopStat.totalpopulation')).sendKeys('66000000');
		                            element(by.model('newPopStat.urbanpopulation')).sendKeys('60000000');
		                            element(by.model('newPopStat.accesstoelectricity')).sendKeys('99');
		                            
		                            element(by.css('[value="add"]')).click();
		                            
		                            element
		                                .all(by.repeater("stat in popstats"))
		                                .then(function(finalStats){
		                                    
		                                    expect(finalStats.length).toEqual(intialStats.length+1);
		                                    
		                                });
		                        });
		//expect(stats.count()).toBeGreaterThan(0);
	});
});