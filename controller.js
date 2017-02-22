/**
 * Created by sukumar on 21-02-2017.
 */
(function (window) {
    function Controller(model, view) {
        var self = this;
        self.model = model;
        self.view = view;
        self.view.eventConfiguration('getProductList', function () {
            self.getItems('products');
        });
        self.view.eventConfiguration('quickView', function (row) {
            self.quickView(row);
        });

    }

    Controller.prototype.init = function () {
        var self = this;
        self.getItems('products');
        /*        self.view.eventConfig('getData', function () {
         self.getItems();
         })*/
    }
    Controller.prototype.getItems = function (dataCmd) {
        var self = this;
        self.model.getAppData(dataCmd, function (data, filterCmd) {
            self.renderView(data, filterCmd);
        })
    }
    Controller.prototype.quickView = function (row) {
        var self = this;
        self.view.printProductData(row);
    }
    Controller.prototype.renderView = function (data, filterCmd) {
        var self = this;
        self.view.render(data, filterCmd);

    }
    Controller.prototype.filterView = function (data, filterCmd) {
        var self = this;
        console.log(data);
        console.log(filterCmd);
        self.view.render(data, filterCmd);
    }
    window.app = window.app || {};
    window.app.controller = Controller;
})
(window);