(function(angular)
{
    function CardFactory($resource) {
        var cardResource = $resource('/app/image/get', null,
        {
            'query': {
                method:'GET', isArray:true
            }
        });
        return cardResource;
    }
    angular.module('imaginationKick')
    .factory('CardFactory', ['$resource', CardFactory]);
})(angular);
