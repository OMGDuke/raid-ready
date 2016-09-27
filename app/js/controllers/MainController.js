angular.module('raidReadyApp')
  .controller('MainController', function($state, GuildService, $scope){

    var self = this;
    var apiUrl = "https://raid-ready-api.herokuapp.com/bnet?server=";
    var playerClassHash = {
      1: "Warrior", 2: "Paladin", 3: "Hunter", 4: "Rogue", 5: "Priest",
      6: "Death Knight", 7: "Shaman", 8: "Mage", 9: "Warlock", 10: "Monk",
      11: "Druid", 12: "Demon Hunter"
    };
    var raidBreakdown = {
      10: [2, 2, 6],
      15: [2, 3, 10],
      20: [2, 4, 14],
      25: [2, 5, 18],
      30: [2, 6, 22]
    };

    self.members = {};
    self.tanks = {};
    self.dps = {};
    self.healers = {};
    self.options = [{ name: '10 Man', value: '10' },
    { name: '15 Man', value: '15' },
    { name: '20 Man', value: '20' },
    { name: '25 Man', value: '25' },
    { name: '30 Man', value: '30' }];
    $scope.selectedRank = 100;

    self.searchForGuild = function(server, guild) {
      GuildService.getMembers(apiUrl, server, guild)
      .then(function(response) {
        self.setData(response);
        try { self.findRoles(self.filterMembers(response.members)); }
        catch(err) { self.error = "Please enter a valid Server and Guild Name"; }
        $state.go("result");
      });
    };

    self.setData = function(response) {
      self.serverName = response.realm;
      self.guildName = response.name;
      self.members = response.members;
    };

    self.filterMembers = function(members) {
      return members.filter(function(obj) {
        return obj.character.level === 110 && !!obj.character.spec;
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
      return self.numberCheck(raidBreakdown[raidSize]) ? "Yes" : "No";
    };

    self.numberCheck = function(raidBreakdown) {
      return self.tanks.length >= raidBreakdown[0] && self.healers.length >= raidBreakdown[1] && self.dps.length >= raidBreakdown[2];
    };


    self.missingRoleCalc = function(role, raidSize) {
      if(role === "tank") {
        return raidBreakdown[raidSize][0] - self.tanks.length;
      } else if(role === "healer") {
        return raidBreakdown[raidSize][1] - self.healers.length;
      } else if(role === "dps") {
        return raidBreakdown[raidSize][2] - self.dps.length;
      }
    };

    self.findPlayerClass = function(classInt) {
      return playerClassHash[classInt];
    };

    $scope.filterByRank = function(element) {
      return $scope.selectedRank > element.rank;
    };
  });
