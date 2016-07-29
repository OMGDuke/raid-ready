angular.module('raidReadyApp')
  .service('GuildService', ['$http', function($http){

    var self = this;
    var apiKey = "1234";

    self.getMembers = function(apiUrl, server, guild) {
      var formattedUrl = _formatUrl(apiUrl, server, guild);
      return _getDatafromApi(formattedUrl)
        .then(function(response) {
          return _handleResponse(response.data);
        });
    };

    function _getDatafromApi(formattedUrl){
      return $http.get(formattedUrl);
    }

    function _formatUrl(apiUrl, server, guild) {
      return apiUrl[0] + server + "/" + guild + apiUrl[1] + apiKey;
    }

    function _handleResponse(response) {
      console.log(response);
      console.log(response.members);
      console.log(response.members[0].character.name);
      return response.members[0].character.name;
    }

  }]);
