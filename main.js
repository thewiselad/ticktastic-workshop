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

tt.popup = function(Mustache, $popup) {

    var $details,
        template = [
            '<h4 class="ticket-details__title">',
                '<span class="ticket-details__priority ticket-details__priority--{{ priority }}">Priority: {{ priority }}</span>',
                '{{ summary }}',
            '</h4>',
            '<div class="ticket-details__meta">',
                '<div class="row clearfix">',
                    '<div class="col-md-6">',
                        '<h5 class="ticket-details__user">{{ name }} ({{ department }})</h5>',
                        '<time class="ticket-details__time" datetime="{{ date }}">{{ formattedDate }}</time>',
                    '</div>',
                    '<div class="col-md-6">',
                        '<a href="mailto:{{ email }}" class="ticket-details__contact">{{ email }}</a>',
                        '<a href="tel:{{ telCallable }}" class="ticket-details__contact">{{ telephone }}</a>',
                    '</div>',
                '</div>',
            '</div>',
            '<div class="ticket-details__content"><p>{{ details }}</p></div>'].join('');

    function rebuildPopup(details) {
        var htmlStr, escapedDetails;

        details.telCallable = details.telephone.replace(/[^\d]/, '');
        details.formattedDate = (new Date(details.date)).toLocaleString();
        htmlStr = Mustache.render(template, details);
        $details.html(htmlStr);

        escapedDetails = $details.find('.ticket-details__content').html();
        escapedDetails = escapedDetails.replace(/\n/g, '</p><p>');
        $details.find('.ticket-details__content').html(escapedDetails);
    }

    function hide(e) {
        if (e) {
            e.preventDefault();
        }
        $popup.hide();
    }

    function addClickHandler() {
        $popup.find('.ticket-details__dismiss').click(hide);
    }

    function show(details) {
        if (details) {
            rebuildPopup(details);
        }
        $popup.show();
    }

    function init() {
        $details = $popup.find('.ticket-details__details');
        addClickHandler();
        hide();
    }

    return {
        init: init,
        show: show
    }
};

(function($, Mustache, tt) {

    var $form = $('#ticket-form'),
        $list = $('#ticket-list'),
        $ticket = $('#ticket-details'),
        popup = tt.popup(Mustache, $ticket),
        list = tt.list($, Mustache, popup, $list),
        form = tt.form($form, list);

    form.init();
    list.init();
    popup.init();

})(jQuery, Mustache, tt);
