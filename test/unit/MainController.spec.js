describe('MainController', function() {

  var MainController;
  var mockGuildService = { getMembers: null };
  var members = [{
    "character": {
      "name": "bob",
      "role": "TANK"
    }
  },
  {
    "character": {
      "name": "john",
      "role": "HEALING"
    }
  }];

  beforeEach(function() {
    module('raidReadyApp', function($provide) {
      $provide.value('GuildService', mockGuildService);
    });
  });

  beforeEach(inject(function($controller) {
    spyOn(mockGuildService, 'getMembers')
      .and.returnValue(members);
    mainController = $controller('MainController', {
    });
  }));

  describe('initialization', function() {
    it('is initialized with no server', function() {
      expect(mainController.server).not.toBeDefined();
    });
  });

  describe('#searchForGuild', function() {
    it('stores a list of members', function() {
      mainController.searchForGuild('Server1', 'Name1');
      expect(mainController.membersJSON).toEqual(members);
    });
  });
});
