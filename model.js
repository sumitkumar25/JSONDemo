/**
 * Created by sukumar on 20-02-2017.
 */
(function (window) {
    function Model(store) {
        this.store = store;
    }

    Model.prototype.REDIRECT_CALLBACK = null;
    Model.prototype.getAppData = function (dataCmd, handler) {
        var self = this;
        self.REDIRECT_CALLBACK = handler;
        self.store.readJSON(dataCmd, function (data, dataCmd) {
            self.asyncDataReceiver(data, dataCmd)
        });
    }
    Model.prototype.asyncDataReceiver = function (data, dataCmd) {
        var self = this;
        self.REDIRECT_CALLBACK(data, dataCmd);
    }
    window.app = window.app || {};
    window.app.model = Model;
})(window);