/**
 * Created by sukumar on 21-02-2017.
 */
(function (window) {
    function View(template) {
        this.rowTemplate = document.querySelector('#productRow').content.querySelector('tr');
        this.productTable = document.querySelector('#dataTable');
        this.tag_price = 'price';
        this.tag_id = 'product_id';
        this.tag_name = 'product_name';
    }

    View.prototype.eventConfiguration = function (event, callback) {
        var self = this;
        if (event == 'getProductList') {
            document.querySelector('#getList').addEventListener('click', callback);
        }
        if (event == 'quickView') {
            this.productTable.addEventListener('click', function (event) {
                if (event.target.className.indexOf('quick_view') >= 0) {
                    callback(event.target.parentNode.parentNode);
                }
            });
        }
        document.querySelector('#search').addEventListener('input', function () {
            self.filterSearch.call(document.querySelector('#search'), self.productTable);
        });
    }
    View.prototype.filterSearch = function (table) {
        var searchTerm = this.value.toLocaleUpperCase();
        var tds = table.querySelectorAll('td.p_name');
        for (var i in tds) {
            var td = tds[i];
            var tr = td.parentNode;
            if (td.innerText) {
                if (td.innerText.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase()) >= 0) {
                    tr.style.display = 'table-row';
                }
                else {
                    tr.style.display = 'none';
                }
            }
        }
    }
    View.prototype.render = function (data, renderCmd) {
        var self = this;
        if (renderCmd == 'products') {
            if (data && typeof data != 'object') {
                data = JSON.parse(data);
                console.log(data);
            }
            self.renderAll(data[renderCmd]);
        }
    }
    View.prototype.renderAll = function (data) {
        var self = this;
        for (var i in data) {
            var tr = this.prepareDataFragment(data[i]);
            self.productTable.querySelector('tbody').appendChild(tr);
        }
    }
    View.prototype.printProductData = function (row) {
        var td = row.querySelectorAll('td');
        for (var i = 0; i < 3; i++) {
            console.log(td[i].innerText);
        }
    }
    View.prototype.prepareDataFragment = function (data) {
        var self = this;
        var row = self.rowTemplate.cloneNode(true);
        var cells = row.querySelectorAll('td');
        cells[0].appendChild(document.createTextNode(data[self.tag_id]));
        cells[1].appendChild(document.createTextNode(data[self.tag_name]));
        cells[2].appendChild(document.createTextNode(data[self.tag_price]));
        return row;
    }
    window.app = window.app || {};
    window.app.view = View;
})(window);