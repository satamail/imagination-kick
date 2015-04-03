(function(angular)
{
    function CardResourceFactory($resource) {
        var cardResource = $resource('/app/card/get', null,
        {
            'query': {
                method:'GET', isArray:true
            }
        });
        return cardResource;
    }
    angular.module('ImaginationKick')
        .factory('CardResource', ['$resource', CardResourceFactory]);
})(angular);
