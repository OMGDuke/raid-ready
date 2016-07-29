angular.module('raidReadyApp')
  .controller('MainController', function($state, GuildService){

    var self = this;
    self.membersJSON = {};

    self.searchForGuild = function(server, guild) {
      return GuildService.getMembers();
    };
  });
