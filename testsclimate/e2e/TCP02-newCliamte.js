describe("Check if a new climate can be created",function () {
    it("List should grow after the climate creation", function (){
        browser.get("http://localhost:8080/#!/climate-stats");
        element(by.css('[value="next"]')).click();
        element
            .all(by.repeater("climate in climates"))
            .then(function (initialClimates){
                
                element(by.model('data.country')).sendKeys('Afghanistan');
                element(by.model('data.year')).sendKeys('1970');
                element(by.model('data.methane_stats')).sendKeys('23.195514');
                element(by.model('data.co2_stats')).sendKeys('13.15554169');
                element(by.model('data.nitrous_oxide_stats')).sendKeys('6.48877182');
                
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