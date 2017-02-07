var tt = tt || {};

tt.list = function($, Mustache, ticketStore, popup, $list) {

    var itemTemplate = '<li class="ticket-list__item"><a href="#" class="ticket-list__delete">Delete</a><h4 class="ticket-list__title" data-index="{{ index }}">{{ summary }}</h4> <span class="ticket-list__user">{{ name }}</span> <time datetime="{{ date }}"></time></li>';

    function summarise(str) {
        var cutoff = 35;
        if (str.indexOf('\n') !== -1) {
            cutoff = Math.min(cutoff, str.indexOf('\n'));
        }
        if (str.length <= cutoff) {
            return str;
        }
        return str.substr(0, cutoff) + '…';
    }

    function itemCicked(e) {
        var index = $(this).data('index'),
            ticket = ticketStore.fetch(index);

        e.preventDefault();
        popup.show(ticket);
    }

    function deleteClicked(e) {
        var index;
        e.preventDefault();
        if (window.confirm("Really delete ticket?")) {
            index = $(this).data('index');
            ticketStore.remove(index);
            refresh();
        }
    }

    function addHandlers() {
        $list.find('.ticket-list__title').click(itemCicked);
        $list.find('.ticket-list__delete').click(deleteClicked);
    }

    function drawTickets(tickets) {
        var listItems;
        listItems = tickets.map(function(ticketDetails, index) {

            ticketDetails.summary = summarise(ticketDetails.details);
            ticketDetails.index = index;

            return Mustache.render(itemTemplate, ticketDetails);
        });

        $list.html($(listItems.join('')));
    }

    function init() {
        refresh();
    }

    function refresh() {
        drawTickets(ticketStore.fetchAll());
        addHandlers();
    }

    return {
        init: init,
        refresh: refresh
    };
};
