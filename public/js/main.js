/*global $,Mustache,tt*/

;(function($, Mustache, tt) {

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
