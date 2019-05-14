describe("Check if data is deleted: ",function () {
    it("List don't show contacts", function (){
        browser.get("http://localhost:8080/#!/climate-stats");
        element(by.css('[value="delete"]')).click();
        var climates = element.all(by.repeater("climate in climates"));
        expect(climates.count()).toEqual(0);
    });
});