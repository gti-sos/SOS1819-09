describe('Check if a economy-stat is deleted', function () {
	it('The selected stat should be deleted', function (){
		browser.get('http://localhost:8080/#!/economy-stats');
		                     element
		                        .all(by.repeater('economy in economies'))
		                        
		                        .then(function(initialeconomy){
		                        	element(by.model('economy.country'))
                                    element(by.model('economy.year'))
                                    
		                            element(by.css('[value="delete"]')).click();
		                            
									
		                            element
		                                .all(by.repeater("economy in economies"))
		                                .then(function(finaleconomy){
		                                    expect(finaleconomy.length).toEqual(initialeconomy.length-1);
		                                });
		                        });
	});
});