describe("Check if a new climate can be created",function () {
    it("List should grow after the climate creation", function (){
        browser.get("http://localhost:8080/#!/climate-stats");
        element(by.css('[value="next"]')).click();
        element
            .all(by.repeater("climate in climates"))
            .then(function (initialClimates){
                
                element(by.model('newClimate.country')).sendKeys('Afghanistan');
                element(by.model('newClimate.year')).sendKeys('1970');
                element(by.model('newClimate.methane_stats')).sendKeys('23.195514');
                element(by.model('newClimate.co2_stats')).sendKeys('13.15554169');
                element(by.model('newClimate.nitrous_oxide_stats')).sendKeys('6.48877182');
                
                element(by.css('[value="post"]')).click();
                
                element(by.css('[value="next"]')).click();
                element
                    .all(by.repeater("climate in climates"))
                    .then(function (finalClimates){
                        
                        expect(finalClimates.length).toEqual(initialClimates.length+1)
                        
                    });
            });
    });
});