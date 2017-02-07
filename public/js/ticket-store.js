var tt = tt || {};

tt.ticketStore = function() {

    function add(ticketDetails) {
        var tickets = fetchAll();
        tickets.push(ticketDetails);
        window.localStorage.setItem('tickets', JSON.stringify(tickets));
    }

    function fetch(ticketId) {
        var tickets = fetchAll();
        return tickets[ticketId];
    }

    function fetchAll() {
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

    function remove(ticketId) {
        var tickets = fetchAll();
        tickets.splice(ticketId, 1);
        window.localStorage.setItem('tickets', JSON.stringify(tickets));
    }


    return {
        add: add,
        fetch: fetch,
        fetchAll: fetchAll,
        remove: remove
    };
};
