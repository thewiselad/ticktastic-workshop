var tt = {};

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

tt.list = function($, Mustache, $list) {
    var itemTemplate = '<li class="ticket-list__item"><h4 class="ticket-list__title">{{ details }}</h4> <span class="ticket-list__user">{{ name }}</span> <time datetime="{{ date }}"></time></li>';

    function getTickets() {
        var existingTickets = window.localStorage.getItem('tickets');
        existingTickets = JSON.parse(existingTickets);
        if (!(existingTickets instanceof Array)) {
            existingTickets = [];
        }
        if (existingTickets.length === 0) {
            existingTickets.push({details: "No tickets found", name:"", date:""});
        }

        return existingTickets;
    }

    function drawTickets(tickets) {
        var listItems;
        listItems = tickets.map(function(ticketDetails) {
            return Mustache.render(itemTemplate, ticketDetails);
        });

        $list.html($(listItems.join('')));
    }

    function init() {
        refresh();
    }

    function refresh() {
        var existingTickets = getTickets();
        drawTickets(existingTickets);
    }

    return {
        init: init,
        refresh: refresh
    };
};

(function($, Mustache, tt) {

    var $form = $('#ticket-form'),
        $list = $('#ticket-list'),
        list = tt.list($, Mustache, $list),
        form = tt.form($form, list);

    form.init();
    list.init();

})(jQuery, Mustache, tt);
