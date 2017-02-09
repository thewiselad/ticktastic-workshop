var tt = {};

tt.form= function($form) {
	$form.on('submit', function(e) {
	var values = {}, $inputs;

	e.preventDefault();
	$inputs = $form.find('select, textarea, input');
	$inputs.each(function(key, el) {
		var name = el.name;
		var value = el.value;		
		if (name) {
			values[name] = value;  
		}
	});

	window.localStorage.setItem('ticket', JSON.stringify(values));
	});
};

tt.list = function($list) {
	var template = '<li class="ticket-list__item"><h4 class="ticket-list__title"> {{ name }}</h4><span class="ticket-list__user"> {{ title }}</span></li>';
	var values = JSON.parse(window.localStorage.getItem('ticket'));

	template = template.replace('{{ title }}', values.details);
	template = template.replace('{{ name }}', values.name);

	$list.html(template);
};

tt.main = function() {
	var $form = $('#ticket-form');
	var $list = $('#ticket-list');

	tt.form($form);
	tt.list($list);
};

	tt.main();

