describe("Check if Data is loaded", function(){
    it("List should show some economy-stats", function(){
        browser.get("http://localhost:8080/#!/economy-stats");
        var economies = element.all(by.repeater("economy in economies"));
        expect(economies.count()).toBeGreaterThan(0);
    });
});