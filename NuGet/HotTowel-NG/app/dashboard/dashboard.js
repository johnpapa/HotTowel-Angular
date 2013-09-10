(function () {
    'use strict';
    var controllerId = 'dashboard';
    angular.module('app').controller(controllerId, ['common', 'datacontext', dashboard]);

    function dashboard(common, datacontext) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.news = {
            title: 'Hot Towel NG',
            description: 'Hot Towel NG is a SPA template for Angular developers.'
        };
        vm.peopleCount = 0;
        vm.title = 'Dashboard';

        activate();

        function activate() {
            var promises = [getPeopleCount()];
            common.activateController(promises, controllerId)
                .then(function () { log('Activated Dashboard View'); });
        }
        
        function getPeopleCount() {
            return datacontext.getPeopleCount().then(function (data) {
                return vm.peopleCount = data;
            });
        }
    }
})();