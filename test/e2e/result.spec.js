describe("raidReadyApp", function () {
  beforeEach(function() {
    browser.get('/');
    $('#server-input').sendKeys("Draenor");
    $('#guild-input').sendKeys("Over Raided");
    $('#check-btn').click();
  });

  describe("Member Count", function() {
    it("Displays how many members there are", function() {
      expect($('#member-count').getText()).toMatch("Members: 86");
    });
  });

  describe("Tank list", function() {
    it('contains a list of all Tanks in the guild', function() {
      browser.findElements(protractor.By.css('#tank-list-item'))
      .then(function(elems) {
        var length = elems.length;
        expect(length).toEqual(3);
      });
    });
  });

  describe("Healer list", function() {
    it('contains a list of all Healers in the guild', function() {
      browser.findElements(protractor.By.css('#healer-list-item'))
      .then(function(elems) {
        var length = elems.length;
        expect(length).toEqual(5);
      });
    });
  });

  describe("DPS list", function() {
    it('contains a list of all DPS in the guild', function() {
      browser.findElements(protractor.By.css('#dps-list-item'))
      .then(function(elems) {
        var length = elems.length;
        expect(length).toEqual(22);
      });
    });
  });

  describe("Ready for?", function() {
    it("starts with a ready for", function() {
      expect(element(by.id('ready')).isDisplayed()).toBeTruthy();
    });

    it("tells you whether you're ready for 10s", function() {
      element(by.cssContainingText('option', '10')).click();
      expect($('#ready').getText()).toEqual('Ready for 10s? Yes');
    });
    it("hides 10s message when you select another size", function() {
      element(by.cssContainingText('option', '10')).click();
      element(by.cssContainingText('option', '20')).click();
      expect($('#ready').getText()).toEqual('Ready for 20s? Yes');
    });
  });

  describe("Missing", function() {
    it("starts with no missing", function() {
      expect(element(by.id('missing-tank')).isDisplayed()).toBeFalsy();
      expect(element(by.id('missing-heal')).isDisplayed()).toBeFalsy();
      expect(element(by.id('missing-dps')).isDisplayed()).toBeFalsy();
    });

    it("shows 1 missing healer for 30 man", function() {
      element(by.cssContainingText('option', '30')).click();
      expect($('#missing-heal').getText()).toEqual('1 Healer(s) Missing');
    });
  });

  describe("Rank Filter", function() {
    it("Starts with a default value of 100", function() {
      expect($('#rank-select').getAttribute('value')).toEqual('100');
    });

    it('Filters tanks down to 2', function() {
      $('#rank-select').clear();
      $('#rank-select').sendKeys("3");
      browser.findElements(protractor.By.css('#tank-list-item'))
      .then(function(elems) {
        var length = elems.length;
        expect(length).toEqual(2);
      });
    });

    it('Filters healers down to 1', function() {
      $('#rank-select').clear();
      $('#rank-select').sendKeys("4");
      browser.findElements(protractor.By.css('#healer-list-item'))
      .then(function(elems) {
        var length = elems.length;
        expect(length).toEqual(1);
      });
    });

    it('Filters dps down to 3', function() {
      $('#rank-select').clear();
      $('#rank-select').sendKeys("5");
      browser.findElements(protractor.By.css('#dps-list-item'))
      .then(function(elems) {
        var length = elems.length;
        expect(length).toEqual(3);
      });
    });

    it('Filters total members down to 21', function() {
      $('#rank-select').clear();
      $('#rank-select').sendKeys("7");
      expect($('#member-count').getText()).toEqual('Members: 21');
    });
  });
});
