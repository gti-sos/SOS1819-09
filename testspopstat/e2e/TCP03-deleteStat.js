describe('Check if a popstat is deleted', function () {
	it('The selected stat should be deleted', function (){
		browser.get('http://localhost:8080/ui/v1/populationstats/');
		                     element
		                        .all(by.repeater('stat in popstats'))
		                        .then(function(intialStats){
		                            
		                            element(by.model('stat.country')).sendKeys('France');
		                            element(by.model('stat.year')).sendKeys(2019);
		                            
		                            element(by.css('[value="delete"]')).click();
		                            
		                            element
		                                .all(by.repeater("stat in popstats"))
		                                .then(function(finalStats){
		                                    
		                                    expect(finalStats.length).toEqual(intialStats.length-1);
		                                    
		                                });
		                        });
	});
});