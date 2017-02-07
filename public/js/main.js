/*global $,Mustache,tt*/

;(function($, Mustache, tt) {

    var $form = $('#ticket-form'),
        $list = $('#ticket-list'),
        $ticket = $('#ticket-details'),
        ticketStore = tt.ticketStore(),
        popup = tt.popup(Mustache, $ticket),
        list = tt.list($, Mustache, ticketStore, popup, $list),
        form = tt.form($form, list);

    form.init();
    list.init();
    popup.init();

})(jQuery, Mustache, tt);
