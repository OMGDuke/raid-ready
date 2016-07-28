describe('MainController', function() {

  var MainController;

  beforeEach(function() {
    module('raidReadyApp', function() {
    });
  });

  beforeEach(inject(function($controller) {
    mainController = $controller('MainController', {

    });
  }));

  describe('initialization', function() {
    it('is initialized with no server', function() {
      expect(mainController.server).not.toBeDefined();
    });
  });
});
