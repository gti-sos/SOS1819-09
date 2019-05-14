describe("Check if a new economy-stat can be created",function () {
    it("List should grow after the economy-stats creation", function (){
        browser.get("http://localhost:8080/#!/economy-stats");
        element
            .all(by.repeater("economy in economies"))
            .then( function (initialeconomy) {
                
                
                
                element(by.model('newFieldEconomy.country')).sendKeys('Italy');
                element(by.model('newFieldEconomy.year')).sendKeys(parseInt(1970,10));
                element(by.model('newFieldEconomy.gdp_growth_stats')).sendKeys(parseFloat(3.2212223));
                element(by.model('newFieldEconomy.industry_gdp_stats')).sendKeys(parseFloat(32.222433));
                element(by.model('newFieldEconomy.gross_sav_gdp_stats')).sendKeys(parseFloat(11.2222323));
                
                element(by.css('[value="add"]')).click();
                
                element
                    .all(by.repeater("economy in economies"))
                    .then( function (finaleconomy) {
                        expect(finaleconomy.length).toEqual(initialeconomy.length+1);
                    });
            });
    });
});