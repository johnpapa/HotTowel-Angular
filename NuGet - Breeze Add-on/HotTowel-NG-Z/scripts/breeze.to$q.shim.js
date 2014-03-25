// Legacy. Support apps that followed old recommendation of adding to$q
// to the end of Breeze methods that returned Q.js promises.
// Althought harmless, we don't need or want it with this module.
// But it may take time to remove to$q from an existing app.
// Remove this shim when you have replaced all references to "to$q" with "then" in your app.

(function (definition, window) {
    if (window.breeze) {
        definition(window.breeze);
    } else if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
        // CommonJS or Node
        var b = require('breeze');
        definition(b);
    } else if (typeof define === "function" && define["amd"] && !window.breeze) {
        // Requirejs / AMD 
        define(['breeze'], definition);
    } else {
        throw new Error("Can't find breeze");
    }
}(function (breeze) {

    // EntityManager
    var proto = breeze.EntityManager.prototype;
    var executeQuery = proto.executeQuery;

    if (-1 < executeQuery.toString().indexOf('extendWith_to$q')) {
        return; // already extended Breeze
    }

    proto.executeQuery =
        function () {
            var promise = executeQuery.apply(this, arguments);
            return extendWith_to$q(promise);
        };

    var e_fetchMetadata = proto.fetchMetadata;
    proto.fetchMetadata =
        function () {
            var promise = e_fetchMetadata.apply(this, arguments);
            return extendWith_to$q(promise);
        };

    var fetchEntityByKey = proto.fetchEntityByKey;
    proto.fetchEntityByKey =
        function () {
            var promise = fetchEntityByKey.apply(this, arguments);
            return extendWith_to$q(promise);
        };

    var saveChanges = proto.saveChanges;
    proto.saveChanges =
        function () {
            var promise = saveChanges.apply(this, arguments);
            return extendWith_to$q(promise);
        };

    // MetadataStore
    proto = breeze.MetadataStore.prototype;
    var m_fetchMetadata = proto.fetchMetadata;
    proto.fetchMetadata =
        function () {
            var promise = m_fetchMetadata.apply(this, arguments);
            return extendWith_to$q(promise);
        };

    function extendWith_to$q(promise) {
        promise.to$q = function (success, fail) {
            return (success || fail) ? promise.then(success, fail) : promise;
        };
        return promise;
    }
}, this));