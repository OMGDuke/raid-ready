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
  });

  describe("Submit form", function() {
    beforeEach(function() {
      $('#server-input').sendKeys("Server Name");
      $('#guild-input').sendKeys("Guild Name");
      $('#check-btn').click();
    });
    it('Check button should take you to the new url', function () {
      expect(browser.getCurrentUrl()).toEqual('http://localhost:8080/result');
    });

    it('Shows your guild name', function() {
      expect($('#guild-name').getText()).toMatch('Guild Name: Guild Name');
    });

    it('Shows your server name', function() {
      expect($('#server-name').getText()).toMatch('Server Name: Server Name');
    });
  });
});
