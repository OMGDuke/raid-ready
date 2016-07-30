describe('MainController', function() {

  var MainController;
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
  var mockGuildService = { getMembers: function() {
    return {
      then: function(callback) {return callback(members);}
    };
  }};

  beforeEach(function() {
    module('raidReadyApp', function($provide) {
      $provide.value('GuildService', mockGuildService);
    });
  });

  beforeEach(inject(function($controller) {
    spyOn(mockGuildService, 'getMembers')
      .and.callThrough();
    mainController = $controller('MainController', {
    });
  }));

  describe('initialization', function() {
    it('is initialized with no server', function() {
      expect(mainController.serverName).not.toBeDefined();
    });

    it('is initialized with no guild name', function() {
      expect(mainController.guildName).not.toBeDefined();
    });
  });

  describe('#searchForGuild', function() {
    it('stores the server name', function() {
      mainController.searchForGuild('Server1', 'Name1');
      expect(mainController.serverName).toEqual("Server1");
    });

    it('stores the server name', function() {
      mainController.searchForGuild('Server1', 'Name1');
      expect(mainController.guildName).toEqual("Name1");
    });

    it('stores a list of members', function() {
      mainController.searchForGuild('Server1', 'Name1');
      expect(mainController.members).toEqual(members);
    });
  });
});
