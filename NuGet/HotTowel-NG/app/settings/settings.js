(function () {
    'use strict';
    var controllerId = 'settings';
    angular.module('app').controller(controllerId, ['common', settings]);

    function settings(common) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.title = 'Settings';

        activate();

        function activate() {
            common.activateController([], controllerId)
                .then(function () { log('Activated Settings View'); });
        }
    }
})();