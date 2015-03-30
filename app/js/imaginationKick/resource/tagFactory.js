(function(angular)
{
    function TagFactory($resource) {
        var tagResource = $resource('/app/card/tag', null,
        {
            'query': {
                method:'GET', isArray:true
            }
        });
        return tagResource;
    }
    angular.module('imaginationKick')
    .factory('TagFactory', ['$resource', TagFactory]);
})(angular);
