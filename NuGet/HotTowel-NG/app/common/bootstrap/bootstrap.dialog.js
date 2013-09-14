(function () {
    'use strict';

    var bootstrapModule = angular.module('common.bootstrap', ['ui.bootstrap']);

    bootstrapModule.provider('bsDialogConfig', function () {
        this.config = {
            // These are the properties we need to set
            //templatePath: '/app/common/bootstrap'
        };

        this.$get = function () { return { config: this.config }; };
    });

    bootstrapModule.factory('bootstrap.dialog', ['$modal', 'bsDialogConfig', modalDialog]);

    function modalDialog($modal, bsDialogConfig) {
        var config = bsDialogConfig.config;
        var service = {
            deleteDialog: deleteDialog,
            confirmationDialog: confirmationDialog
        };

        return service;

        function deleteDialog(itemName) {
            var title = 'Confirm Delete';
            itemName = itemName || 'item';
            var msg = 'Delete ' + itemName + '?';

            return confirmationDialog(title, msg);
        }

        function confirmationDialog(title, msg, okText, cancelText) {
            var modalOptions = {
                templateUrl: config.templatePath + '/modalDialog.html',
                controller: ModalInstance,
                keyboard: true,
                resolve: {
                    options: function () {
                        return {
                            title: title,
                            message: msg,
                            okText: okText,
                            cancelText: cancelText
                        };
                    }
                }
            };

            return $modal.open(modalOptions).result; 
        }
    }

    var ModalInstance = ['$scope', '$modalInstance', 'options',
        function ($scope, $modalInstance, options) {
            $scope.title = options.title || 'Title';
            $scope.message = options.message || '';
            $scope.okText = options.okText || 'OK';
            $scope.cancelText = options.cancelText || 'Cancel';
            $scope.ok = function () { $modalInstance.close('ok'); };
            $scope.cancel = function () { $modalInstance.dismiss('cancel'); };
        }];
})();