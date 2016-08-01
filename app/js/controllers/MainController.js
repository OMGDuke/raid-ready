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

    self.readyFor = function(raidSize) {
      if(raidSize === 10) {
        return self.numberCheck(2, 3, 5) ? "Yes" : "No";
      } else if (raidSize === 15) {
        return self.numberCheck(2, 4, 9) ? "Yes" : "No";
      } else if (raidSize === 20) {
        return self.numberCheck(3, 5, 12) ? "Yes" : "No";
      } else if (raidSize === 25) {
        return self.numberCheck(3, 5, 12) ? "Yes" : "No";
      } else if (raidSize === 30) {
        return self.numberCheck(3, 5, 12) ? "Yes" : "No";
      }
    };

    self.numberCheck = function(tanks, healers, dps) {
      return self.tanks.length >= tanks && self.healers.length >= healers && self.dps.length >= dps;
    };

    self.missingRoles = function(requirements) {
      self.neededTanks = self.missingTanks(requirements[0]);
    };

    self.missingTanks = function(neededTanks) {
      return neededTanks - self.tanks.length;
    };
  });
