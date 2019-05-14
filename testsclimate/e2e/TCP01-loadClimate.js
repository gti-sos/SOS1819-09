describe("Check if data is loaded: ",function () {
    it("List shows some contacts", function (){
        browser.get("http://localhost:8080/#!/climate-stats");
        element(by.css('[value="load"]')).click();
        var climates = element.all(by.repeater("climate in climates"));
        expect(climates.count()).toBeGreaterThan(0);
    });
});