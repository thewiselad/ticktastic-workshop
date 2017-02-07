var tt = tt || {};

tt.list = function($, Mustache, popup, $list) {
    var itemTemplate = '<li class="ticket-list__item"><a href="#" class="ticket-list__delete">Delete</a><h4 class="ticket-list__title" data-index="{{ index }}">{{ summary }}</h4> <span class="ticket-list__user">{{ name }}</span> <time datetime="{{ date }}"></time></li>';

    function findTicket(index) {
        var tickets = getTickets();
        return tickets[index];
    }

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
            ticket = findTicket(index);

        e.preventDefault();
        popup.show(ticket);
    }

    function deleteClicked(e) {
        var tickets, index;
        e.preventDefault();
        if (window.confirm("Really delete ticket?")) {
            tickets = getTickets();
            index = $(this).data('index');
            tickets.splice(index, 1);
            window.localStorage.setItem('tickets', JSON.stringify(tickets));
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
        var existingTickets = getTickets();
        drawTickets(existingTickets);
        addHandlers();
    }

    return {
        init: init,
        refresh: refresh
    };
};
