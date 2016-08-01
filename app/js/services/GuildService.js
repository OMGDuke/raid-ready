angular.module('raidReadyApp')
  .service('GuildService', ['$http', function($http){

    var self = this;
    var apiKey = process.env.WOW_API;

    self.getMembers = function(apiUrl, server, guild) {
      var formattedUrl = _formatUrl(apiUrl, server, guild);
      return _getDatafromApi(formattedUrl).then(function(response) {
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
      return response;
    }
  }]);
