(function(angular)
{
    function TagResourceFactory($resource) {
        var tagResource = $resource('/app/card/tag', null,
        {
            'query': {
                method:'GET', isArray:true
            }
        });
        return tagResource;
    }
    angular.module('ImaginationKick')
        .factory('TagResource', ['$resource', TagResourceFactory]);
})(angular);
