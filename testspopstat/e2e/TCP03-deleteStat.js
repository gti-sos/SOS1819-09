describe('Check if a popstat is deleted', function () {
	it('The selected stat should be deleted', function (){
		browser.get('http://localhost:8080/#!/populationstats/');
		                     element
		                        .all(by.repeater('stat in popstats'))
		                        
		                        .then(function(initialStatsd){
		                        	
		                            console.log("delete 1 : "+initialStatsd.length);
		                            
		                            element(by.model('stat.country'));
		                            element(by.model('stat.year'));
		                            element(by.css('[value="delete"]')).click();
		                            
									console.log("delete 2 : "+initialStatsd.length);
									
		                            element
		                                .all(by.repeater("stat in popstats"))
		                                .then(function(finalStatsd){
		                                    console.log("delete 3 : "+initialStatsd.length);
		                                    console.log("delete final : "+finalStatsd.length);
		                                    expect(finalStatsd.length).toEqual(initialStatsd.length);
		                                    
		                                });
		                        });
	});
});