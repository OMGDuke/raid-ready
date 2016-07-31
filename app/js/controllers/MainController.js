angular.module('raidReadyApp')
  .controller('MainController', function($state, GuildService){

    var self = this;
    self.members = {};
    var apiUrl = ["https://eu.api.battle.net/wow/guild/", "?fields=members&locale=en_GB&apikey="];

    self.searchForGuild = function(server, guild) {
      GuildService.getMembers(apiUrl, server, guild)
      .then(function(response) {
        self.serverName = server;
        self.guildName = guild;
        self.members = response.members;
        $state.go("result");
      });
    };

    self.findTanks = function(members) {
      return members.filter(function( obj ) {
        return obj.character.spec.role === "TANK";
      });
    };

    self.findDPS = function(members) {
      return members.filter(function( obj ) {
        return obj.character.spec.role === "DPS";
      });
    };

    self.findHealers = function(membersList) {
      return membersList.filter(function( obj ) {
        return obj.character.spec.role === "HEALING";
      });
    };


  });
