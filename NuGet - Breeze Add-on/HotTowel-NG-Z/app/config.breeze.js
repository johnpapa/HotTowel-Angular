// ReSharper disable InconsistentNaming
(function () {
    'use strict';

    // app.js injects, triggering config
    angular.module('app')
           .factory('config.breeze', ['$q', '$http', 'use$q', configBreeze]);
       
    function configBreeze($q, $http, use$q) {
        // use $q for promises
        use$q($q);

        // use the current module's $http for ajax calls
        var ajax = breeze.config.initializeAdapterInstance('ajax', 'angular');
        ajax.setHttp($http);

        // backingStore works for Angular (ES5 property 'ready')
        breeze.config.initializeAdapterInstance('modelLibrary', 'backingStore', true);

        // Tell breeze not to validate when we attach a newly created entity to any manager.
        // We could also set this per entityManager
        new breeze.ValidationOptions({ validateOnAttach: false }).setAsDefault();

        breeze.NamingConvention.camelCase.setAsDefault();
    }
})();