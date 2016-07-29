angular.module('raidReadyApp')
  .controller('MainController', function($state, GuildService){

    var self = this;
    self.membersJSON = {};

    self.searchForGuild = function(server, guild) {
      self.membersJSON =  GuildService.getMembers(server, guild);
    };
  });
