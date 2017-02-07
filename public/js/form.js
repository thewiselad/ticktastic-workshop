var tt = tt || {};

tt.form = function($form, list) {

    function getInputs() {
        return $form.find('input:not([type="submit"]), select, textarea');
    }

    function clearForm() {
        getInputs().each(function(key, el) {
            el.value = '';
        });
    }

    function storeFormTicket(e) {
        var $inputs,
            values = {},
            tickets = window.localStorage.getItem('tickets');

        e.preventDefault();
        tickets = JSON.parse(tickets);
        if (!(tickets instanceof Array)) {
            tickets = [];
        }

        getInputs().each(function(key, el) {
            values[el.name] = el.value;
        });
        values.date = (new Date()).toJSON();

        tickets.push(values);
        window.localStorage.setItem('tickets', JSON.stringify(tickets));

        list.refresh();
        clearForm();
    }

    return {
        init: function() {
            $form.on('submit', storeFormTicket);
        }
    };
};
