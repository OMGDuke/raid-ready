angular.module('raidReadyApp')
  .controller('MainController', function($state, GuildService){

    var self = this;
    self.members = {};
    self.level100Members = {};
    self.tanks = {};
    self.dps = {};
    self.healers = {};
    var apiUrl = ["https://eu.api.battle.net/wow/guild/", "?fields=members&locale=en_GB&apikey="];

    self.searchForGuild = function(server, guild) {
      GuildService.getMembers(apiUrl, server, guild)
      .then(function(response) {
        self.setData(response);
        self.findCharactersWithSpecs(response.members);
        self.findLevelAppropriate(self.filteredChars);
        self.findRoles(self.level100Members);
        $state.go("result");
      });
    };

    self.setData = function(response) {
      self.serverName = response.realm;
      self.guildName = response.name;
      self.members = response.members;
    };

    self.findCharactersWithSpecs = function(members) {
      self.filteredChars = members.filter(function(obj) {
        return !!obj.character.spec;
      });
    };

    self.findLevelAppropriate = function(members) {
      self.level100Members = members.filter(function( obj ) {
        return obj.character.level === 100;
      });
    };

    self.findRoles = function(members) {
      self.findTanks(members);
      self.findHealers(members);
      self.findDPS(members);
    };

    self.findTanks = function(members) {
      self.tanks = members.filter(function( obj ) {
        return obj.character.spec.role === "TANK";
      });
    };

    self.findDPS = function(members) {
      self.dps = members.filter(function( obj ) {
        return obj.character.spec.role === "DPS";
      });
    };

    self.findHealers = function(membersList) {
      self.healers = membersList.filter(function( obj ) {
        return obj.character.spec.role === "HEALING";
      });
    };
  });
