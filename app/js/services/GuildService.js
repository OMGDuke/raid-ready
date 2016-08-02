angular.module('raidReadyApp')
  .service('GuildService', ['$http', function($http){

    var self = this;

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
      return apiUrl + server + "&guild=" + guild;
    }

    function _handleResponse(response) {
      return response;
    }
  }]);
