(function () {
    'use strict';
    var controllerId = 'settings';
    angular.module('app').controller(controllerId, ['common', settings]);

    function settings(common) {
        var vm = this;
        vm.title = 'Settings';

        activate();

        function activate() {
            common.activateController([], controllerId);
        }
    }
})();