describe("raidReadyApp", function () {
  beforeEach(function() {
    browser.get('/');
    $('#server-input').sendKeys("Draenor");
    $('#guild-input').sendKeys("Over Raided");
    $('#check-btn').click();
  });

  describe("Member Count", function() {
    it("Displays how many members there are", function() {
      expect($('#member-count').getText()).toMatch("Members: 52");
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

  describe("Healer list", function() {
    it('contains a list of all Healers in the guild', function() {
      browser.findElements(protractor.By.css('#healer-list-item'))
      .then(function(elems) {
        var length = elems.length;
        expect(length).toEqual(3);
      });
    });
  });

  describe("DPS list", function() {
    it('contains a list of all DPS in the guild', function() {
      browser.findElements(protractor.By.css('#dps-list-item'))
      .then(function(elems) {
        var length = elems.length;
        expect(length).toEqual(15);
      });
    });
  });

  describe("Ready for?", function() {
    it("starts with no ready for", function() {
      expect(element(by.id('ready')).isDisplayed()).toBeFalsy();
    });

    it("tells you whether you're ready for 10s", function() {
      element(by.cssContainingText('option', '10')).click();
      expect($('#ready').getText()).toEqual('Ready for 10s? Yes');
    });
    it("hides 10s message when you select another size", function() {
      element(by.cssContainingText('option', '10')).click();
      element(by.cssContainingText('option', '20')).click();
      expect($('#ready').getText()).toEqual('Ready for 20s? No');
    });
  });

  describe("Missing", function() {
    it("starts with no missing", function() {
      expect(element(by.id('missing-tank')).isDisplayed()).toBeFalsy();
      expect(element(by.id('missing-heal')).isDisplayed()).toBeFalsy();
      expect(element(by.id('missing-dps')).isDisplayed()).toBeFalsy();
    });

    it("shows 2 missing healers for 20 man", function() {
      element(by.cssContainingText('option', '20')).click();
      expect($('#missing-heal').getText()).toEqual('2 Healer(s) Missing');
    });
  });
});
