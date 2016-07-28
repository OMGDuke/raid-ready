describe("raidReadyApp", function () {

  describe("headings and titles", function() {
    it("should get home page title", function() {
      browser.get('/');
      expect(browser.getTitle()).toEqual("Raid Ready");
    });

    it('should have the app title on the page', function () {
      browser.get('/');
      expect($('#header').getText()).toMatch('Raid Ready');
    });
  });

  describe("input form", function() {
    it('should have a Check button', function() {
      browser.get('/');
      expect($('#check-btn').getText()).toMatch('Check my Guild');
    });

    xit('Check button should take you to the new url', function () {
      browser.get('/');
      $('#check-btn').click();
      expect(browser.getCurrentUrl()).toEqual('http://localhost:8080/check');
    });
  });
});
