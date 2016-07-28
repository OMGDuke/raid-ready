describe("raidReadyApp", function () {
  beforeEach(function() {
    browser.get('/');
  });

  describe("headings and titles", function() {
    it("should get home page title", function() {
      expect(browser.getTitle()).toEqual("Raid Ready");
    });

    it('should have the app title on the page', function () {
      expect($('#header').getText()).toMatch('Raid Ready');
    });
  });

  describe("input form", function() {
    it('should have a Server name field', function() {
      expect($('#server-input').isPresent()).toBeTruthy();
    });

    it('should have a Guild name field', function() {
      expect($('#guild-input').isPresent()).toBeTruthy();
    });

    it('should have a Check button', function() {
      expect($('#check-btn').getText()).toMatch('Check my Guild');
    });

    it('Check button should take you to the new url', function () {
      $('#check-btn').click();
      expect(browser.getCurrentUrl()).toEqual('http://localhost:8080/result');
    });
  });
});
