(function($) {

    var $form = $('#ticket-form');

    function storeFormTicket(e) {
        var $inputs,
            values = {};

        e.preventDefault();
        $values = $form.find('input:not([type="submit"]), select, textarea');
        $values.each(function(key, el) {
            values[el.name] = el.value;
        });

        window.localStorage.setItem('ticket', JSON.stringify(values));
    }

    $form.on('submit', storeFormTicket);

})(jQuery);
