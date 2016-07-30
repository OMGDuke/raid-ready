describe('GuildService', function(){
  beforeEach(module("raidReadyApp"));

  var GuildService, httpBackend;

  var apiUrl = ["http://www.test.com/", "?fields"];
  var guildName = 'Guild%20Name';
  var serverName = "Server%20Name";

  var apiResponse =
    [{
      "character": {"name": "Jim", "spec": {"name": "Protection", "role": "TANK"}}
    }, {
      "character": { "name": "Bob", "spec": { "name": "Elemental", "role": "DPS"}}
    }];



  beforeEach(inject(function($httpBackend, _GuildService_){
    httpBackend = $httpBackend;
    GuildService = _GuildService_;
  }));

  it('receives guild data from the API', function(){
    httpBackend.expectGET(apiUrl[0] + serverName + '/' + guildName + apiUrl[1] + "1234").respond(apiResponse);
    httpBackend.whenGET(/views.*/).respond(200, '');
    GuildService.getMembers(apiUrl, serverName, guildName).then(function(response){
      expect(GuildService.members).toEqual(apiResponse);
    });
    httpBackend.flush();
  });

});
