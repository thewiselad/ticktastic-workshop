var tt = tt || {};

tt.form = function($form, list, ticketStore) {

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
            ticket = {};

        e.preventDefault();
        getInputs().each(function(key, el) {
            ticket[el.name] = el.value;
        });

        ticket.date = new Date();

        ticketStore.add(ticket);

        list.refresh();
        clearForm();
    }

    return {
        init: function() {
            $form.on('submit', storeFormTicket);
        }
    };
};
