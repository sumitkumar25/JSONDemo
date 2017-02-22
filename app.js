/**
 * Created by sukumar on 21-02-2017.
 */
(function (window) {
    function Demo() {
        this.store = new app.store();
        this.model = new app.model(this.store);
        this.view = new app.view();
        this.controller = new app.controller(this.model, this.view);
    }

    window.onload = function () {
        var jsonDemo = new Demo();
        jsonDemo.controller.init();
    }
})(window)