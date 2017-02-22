/**
 * Created by sukumar on 20-02-2017.
 */
(function () {
    function Store(name) {
        this.name = name;
    }

    Store.prototype.readJSON = function (dataCmd, handler) {
        var self = this;
        var data = window.localStorage[dataCmd];
        if (!data) {
            self.getData(dataCmd, handler);
        } else {
            handler(JSON.parse(data), dataCmd);
        }
    }
    Store.prototype.getData = function (dataCmd, handler) {
        if (!dataCmd) {
            return;
        }
        var self = this;
        var http = new XMLHttpRequest();
        if (http) {
            if (dataCmd == 'products') {
                http.open('GET', "products.json");
            }
        }
        http.onreadystatechange = function () {
            if (http.response) {
                if (http.readyState == 4 && http.status == 200) {
                    console.log(http.response);
                    self.saveLocally(http.response, dataCmd);
                    handler(http.response, dataCmd);
                }
            }
        }
        http.send()
    }
    Store.prototype.saveLocally = function (data, dataCmd) {
        localStorage.setItem(dataCmd, JSON.stringify(data));
        console.log("local save done");
    }
    window.app = window.app || {};
    app.store = Store;
})(window)