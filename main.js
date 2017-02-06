var tt = {};

tt.form = function($form) {

    function storeFormTicket(e) {
        var $inputs,
            values = {},
            tickets = window.localStorage.getItem('tickets');

        e.preventDefault();
        tickets = JSON.parse(tickets);
        if (!(tickets instanceof Array)) {
            tickets = [];
        }

        $values = $form.find('input:not([type="submit"]), select, textarea');
        $values.each(function(key, el) {
            values[el.name] = el.value;
        });
        values.date = (new Date()).toJSON();

        tickets.push(values);
        window.localStorage.setItem('tickets', JSON.stringify(tickets));
    }

    return {
        init: function() {
            $form.on('submit', storeFormTicket);
        }
    };
};

tt.list = function($, Mustache, $list) {
    var itemTemplate = '<li class="ticket-list__item"><h4 class="ticket-list__title">{{ details }}</h4> <span class="ticket-list__user">{{ name }}</span> <time datetime="{{ date }}"></time></li>';

    function init() {
        var existingTickets = window.localStorage.getItem('tickets'),
            listItems;

        existingTickets = JSON.parse(existingTickets);
        if (!(existingTickets instanceof Array)) {
            existingTickets = [];
        }
        if (existingTickets.length === 0) {
            existingTickets.push({details: "No tickets found", name:"", date:""});
        }
        listItems = existingTickets.map(function(ticketDetails) {
            return Mustache.render(itemTemplate, ticketDetails);
        });

        $list.html($(listItems.join('')));
    }

    return {
        init: init
    };
};

(function($, Mustache, tt) {

    var $form = $('#ticket-form'),
        $list = $('#ticket-list'),
        form = tt.form($form),
        list = tt.list($, Mustache, $list);

    form.init();
    list.init();

})(jQuery, Mustache, tt);
