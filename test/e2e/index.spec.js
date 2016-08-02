describe("raidReadyApp", function () {
  beforeEach(function() {
    browser.get('/');
  });

  describe("headings and titles", function() {
    it("should get home page title", function() {
      expect(browser.getTitle()).toEqual("Raid Ready");
    });

    it('should have the app logo on the page', function () {
      logo = element(by.css("img[src*='assets/img/logo.png']"));
      expect(logo.isPresent()).toBe(true);
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
      $('#server-input').sendKeys("Draenor");
      $('#guild-input').sendKeys("Over Raided");
      $('#check-btn').click();
    });
    it('Check button should take you to the new url', function () {
      expect(browser.getCurrentUrl()).toMatch('http://localhost:8080/result');
    });

    it('Shows your guild name', function() {
      expect($('#guild-name').getText()).toMatch('Guild Name: Over Raided');
    });

    it('Shows your server name', function() {
      expect($('#server-name').getText()).toMatch('Server Name: Draenor');
    });
  });
});
