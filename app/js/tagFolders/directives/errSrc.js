angular.module('tagFolders')
.directive('err-src', function() {
    function link(scope, elem, attrs) {
        elem.bind('error', function() {
            if (attrs.src != attrs.errSrc) {
              attrs.$set('src', attrs.errSrc);
            }
        });
        attrs.$observe('ngSrc', function(value) {
            if (!value && attrs.errSrc) {
                attrs.$set('src', attrs.errSrc);
            }
        });
    }

    return {
        restrict: 'A',
        link: link
    }
});
