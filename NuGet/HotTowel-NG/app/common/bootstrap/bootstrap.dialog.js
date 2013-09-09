(function () {
    'use strict';

    var bootstrapModule = angular.module('common.bootstrap', ['ui.bootstrap']);

    bootstrapModule.factory('bootstrap.dialog', ['$modal', modalDialog]);

    function modalDialog($modal) {
        var service = {
            deleteDialog: deleteDialog,
            confirmationDialog: confirmationDialog
        };

        return service;

        function deleteDialog(confirmDelete, cancel, itemName) {
            itemName = itemName || 'item';
            var msg = 'Delete ' + itemName + '?';
            var title = 'Confirm Delete';

            return confirmationDialog(confirmDelete, cancel, title, msg);
        }

        function confirmationDialog(confirm, cancel, title, msg) {
            var btns = [{ result: 'no', label: 'No', cssClass: 'btn-primary' },
                { result: 'yes', label: 'Yes' }];

            return $modal.messageBox(title, msg, btns)
                .open().then(function (result) {
                    result && result.toLowerCase() === 'yes' ? confirm() : cancel();
                });
        }
    }
})();