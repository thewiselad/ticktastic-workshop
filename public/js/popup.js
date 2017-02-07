var tt = tt || {};

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
