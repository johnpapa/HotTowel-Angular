(function () {
    'use strict';
    
    var id = 'app';
    
    var app = angular.module('app', [
        // Angular modules 
        'ngAnimate',        // animations
        'ngRoute',          // routing
        'ngSanitize',       // sanitizes html bindings (ex: sidebar.js)
        // Custom modules 
        'common',           // common functions, logger, spinner
        'common.bootstrap', // bootstrap dialog wrapper functions
        // 3rd Party Modules
        'ui.bootstrap',     // ui-bootstrap (ex: carousel, pagination, dialog)
        'breeze.directives' // breeze validation directive (zValidate)
    ]);
    
    // Handle routing errors and success events
    app.run(['$q', '$rootScope', '$route',  
        function ($q, $rootScope, $route) {
            // Include $route to kick start the router.
            
            // Helper to convert Q to $q 
            breeze.core.extendQ($rootScope, $q);
        }]);
        
})();