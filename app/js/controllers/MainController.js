angular.module('raidReadyApp')
  .controller('MainController', function($state, GuildService){

    var self = this;
    self.membersJSON = {};
    var apiUrl = ["https://eu.api.battle.net/wow/guild/", "?fields=members&locale=en_GB&apikey="];

    self.searchForGuild = function(server, guild) {
      self.serverName = server;
      self.guildName = guild;
      self.membersJSON =  GuildService.getMembers(apiUrl, server, guild);
      $state.go("result");
    };
  });
