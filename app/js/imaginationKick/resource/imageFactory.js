(function(angular)
{
    function ImageFactory($resource) {
        var image = $resource('/app/image/get', null,
        {
            'query': {
                method:'GET', isArray:true
            }
        });
        return image;
    }
    angular.module('imaginationKick')
    .factory('ImageFactory', ['$resource', ImageFactory]);
})(angular);
