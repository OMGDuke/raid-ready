angular.module('raidReadyApp')
  .controller('MainController', function($state, GuildService){

    var self = this;
    self.members = {};
    var apiUrl = ["https://eu.api.battle.net/wow/guild/", "?fields=members&locale=en_GB&apikey="];

    self.searchForGuild = function(server, guild) {
      self.serverName = server;
      self.guildName = guild;
      GuildService.getMembers(apiUrl, server, guild)
      .then(function(response) {
        self.members = response;
        $state.go("result");
      });
    };
  });
