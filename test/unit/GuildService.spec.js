describe('GuildService', function(){
  beforeEach(module("raidReadyApp"));

  var GuildService, httpBackend;

  var apiUrl = "https://raid-ready-api.herokuapp.com/bnet?server=";
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

    httpBackend.expectGET(apiUrl + serverName + "&guild=" + guildName).respond(apiResponse);
    httpBackend.whenGET(/views.*/).respond(200, '');
    GuildService.getMembers(apiUrl, serverName, guildName)
    .then(function(response){
      expect(response).toEqual(apiResponse);
    });
    httpBackend.flush();
  });

});
