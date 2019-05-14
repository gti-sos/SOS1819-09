describe('Check if a new popstat can be created', function () {
	it('The new stat should be showed', function (){
		browser.get('http://localhost:8080/#!/populationstats/');
		                     element
		                        .all(by.repeater('stat in popstats'))
		                        .then(function(initialStats){
		                        	
									console.log("new 1 : "+initialStats.length);
		                            element(by.model('newPopStat.country')).sendKeys('France');
		                            element(by.model('newPopStat.year')).sendKeys(2019);
		                            element(by.model('newPopStat.totalpopulation')).sendKeys('66000000');
		                            element(by.model('newPopStat.urbanpopulation')).sendKeys('60000000');
		                            element(by.model('newPopStat.accesstoelectricity')).sendKeys('99');
									
									console.log("new 2: "+initialStats.length);
									
		                            element(by.css('[value="add"]')).click();

									console.log("new 3: "+initialStats.length);

		                            element
		                                .all(by.repeater("stat in popstats"))
		                                .then(function(finalStats){
		                                	console.log("new 4: "+initialStats.length);
		                                	console.log("new Final: "+finalStats.length);
		                                    expect(finalStats.length).toEqual(initialStats.length);
		                                });
		                        });
	});
});