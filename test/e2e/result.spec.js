describe("raidReadyApp", function () {
  beforeEach(function() {
    browser.get('/');
    $('#server-input').sendKeys("Draenor");
    $('#guild-input').sendKeys("Over Raided");
    $('#check-btn').click();
  });

  describe("Member Count", function() {
    it("Displays how many members there are", function() {
      expect($('#member-count').getText()).toMatch("Members: 53");
    });
  });

  describe("Tank list", function() {
    it('contains a list of all Tanks in the guild', function() {
      browser.findElements(protractor.By.css('#tank-list-item'))
      .then(function(elems) {
        var length = elems.length;
        expect(length).toEqual(4);
      });
    });
  });
});
