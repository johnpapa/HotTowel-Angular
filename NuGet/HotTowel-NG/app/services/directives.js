(function()
{
    'use strict';

    var app = angular.module('app');

    app.directive('ccImgPerson', [
        'config', function(config)
        {
            //Usage:
            //<img data-cc-img-person="{{s.speaker.imageSource}}"/>
            var basePath = config.imageSettings.imageBasePath;
            var unknownImage = config.imageSettings.unknownPersonImageSource;
            var directive = {
                link: link,
                restrict: 'A'
            };
            return directive;

            function link(scope, element, attrs)
            {
                attrs.$observe('ccImgPerson', function(value)
                {
                    value = basePath + (value || unknownImage);
                    attrs.$set('src', value);
                });
            }
        }
    ]);

    app.directive('ccMenuItemRendered', ['$timeout', function($timeout)
        {
            // Makes shure the menu closes after click on menuitem when viewed on a small screen
            // <li class="nlightblue fade-selection-animation" data-ng-class="vm.isCurrent(r)"
            // data-ng-repeat = "r in vm.navRoutes" >
            // <a href = "#{{r.url}}" data-ng-bind-html = "r.config.settings.content" data-cc-menu-item-rendered >< / a >
            // app.directive('ccMenuItemRendered',['$timeout', ccMenuItemRendered]);
            // inspiration: http://stackoverflow.com/questions/15207788/calling-a-function-when-ng-repeat-has-finished

            var directive = {
                restrict: 'A',
                link:link
            }
            return directive;

            function link(scope, element, attrs)
            {
                if (scope.$last === true) {
                    $timeout(function (){
                            scope.$emit(attrs.onFinishRender);
                    var $menuItem = element.parent().parent().find('a');
                    $menuItem.click(function (){
                            if ($('.sidebar-dropdown a').hasClass('dropy')) {
                        hideDropDown();
                }});
        });
        }

        function hideDropDown() {
            var $sidebarInner = $('.sidebar-inner');
            $sidebarInner.slideUp(350);
            $('.sidebar-dropdown a').removeClass('dropy');
        }
            }

        }]);

    app.directive('ccSidebar', ['$window', function ($window) {
        // Opens and clsoes the sidebar menu.
        // Usage:
        //  <div data-cc-sidebar>
        // Creates:
        //  <div data-cc-sidebar class="sidebar">
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs)
        {
            
            var $sidebarInner = element.find('.sidebar-inner');
            var $dropdownElement = element.find('.sidebar-dropdown a');
            element.addClass('sidebar');
            $dropdownElement.click(dropdown);

            function dropdown(e) {
                var dropClass = 'dropy';
                e.preventDefault();
                if (!$dropdownElement.hasClass(dropClass)) {
                    hideAllSidebars();
                    $sidebarInner.slideDown(350);
                    $dropdownElement.addClass(dropClass);
                } else if ($dropdownElement.hasClass(dropClass)) {
                    $dropdownElement.removeClass(dropClass);
                    $sidebarInner.slideUp(350);
                }

                function hideAllSidebars() {
                    $sidebarInner.slideUp(350);
                    $('.sidebar-dropdown a').removeClass(dropClass);
                }
            }

            // renders menuitems in sidebar going from small screen to large screen 
            angular.element($window).on('resize',function () {
                if ($window.innerWidth >= 765) {
                    $sidebarInner.slideDown(350);
                }
                else {
                    $sidebarInner.slideUp(350);
                }
            });
            
        }
    }]);


    app.directive('ccWidgetClose', function () {
        // Usage:
        // <a data-cc-widget-close></a>
        // Creates:
        // <a data-cc-widget-close="" href="#" class="wclose">
        //     <i class="fa fa-remove"></i>
        // </a>
        var directive = {
            link: link,
            template: '<i class="fa fa-remove"></i>',
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            attrs.$set('href', '#');
            attrs.$set('wclose');
            element.click(close);

            function close(e) {
                e.preventDefault();
                element.parent().parent().parent().hide(100);
            }
        }
    });

    app.directive('ccWidgetMinimize', function () {
        // Usage:
        // <a data-cc-widget-minimize></a>
        // Creates:
        // <a data-cc-widget-minimize="" href="#"><i class="fa fa-chevron-up"></i></a>
        var directive = {
            link: link,
            template: '<i class="fa fa-chevron-up"></i>',
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            //$('body').on('click', '.widget .wminimize', minimize);
            attrs.$set('href', '#');
            attrs.$set('wminimize');
            element.click(minimize);

            function minimize(e) {
                e.preventDefault();
                var $wcontent = element.parent().parent().next('.widget-content');
                var iElement = element.children('i');
                if ($wcontent.is(':visible')) {
                    iElement.removeClass('fa fa-chevron-up');
                    iElement.addClass('fa fa-chevron-down');
                } else {
                    iElement.removeClass('fa fa-chevron-down');
                    iElement.addClass('fa fa-chevron-up');
                }
                $wcontent.toggle(500);
            }
        }
    });

    app.directive('ccScrollToTop', ['$window',
        // Usage:
        // <span data-cc-scroll-to-top></span>
        // Creates:
        // <span data-cc-scroll-to-top="" class="totop">
        //      <a href="#"><i class="fa fa-chevron-up"></i></a>
        // </span>
        function ($window) {
            var directive = {
                link: link,
                template: '<a href="#"><i class="fa fa-chevron-up"></i></a>',
                restrict: 'A'
            };
            return directive;

            function link(scope, element, attrs) {
                var $win = $($window);
                element.addClass('totop');
                $win.scroll(toggleIcon);

                element.find('a').click(function (e) {
                    e.preventDefault();
                    // Learning Point: $anchorScroll works, but no animation
                    //$anchorScroll();
                    $('body').animate({ scrollTop: 0 }, 500);
                });

                function toggleIcon() {
                    $win.scrollTop() > 300 ? element.slideDown(): element.slideUp();
                }
            }
        }
    ]);

    app.directive('ccSpinner', ['$window', function ($window) {
        // Description:
        //  Creates a new Spinner and sets its options
        // Usage:
        //  <div data-cc-spinner="vm.spinnerOptions"></div>
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            scope.spinner = null;
            scope.$watch(attrs.ccSpinner, function (options) {
                if (scope.spinner) {
                    scope.spinner.stop();
                }
                scope.spinner = new $window.Spinner(options);
                scope.spinner.spin(element[0]);
            }, true);
        }
    }]);

    app.directive('ccWidgetHeader', function() {
        //Usage:
        //<div data-cc-widget-header title="vm.map.title"></div>
        var directive = {
            link: link,
            scope: {
                'title': '@',
                'subtitle': '@',
                'rightText': '@',
                'allowCollapse': '@'
            },
            templateUrl: '/app/layout/widgetheader.html',
            restrict: 'A',
        };
        return directive;

        function link(scope, element, attrs) {
            attrs.$set('class', 'widget-head');
        }
    });
})();