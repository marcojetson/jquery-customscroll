$('.demos li div').each(function() {

	var object = $(this),
		code = $(this).next('pre').find('code').html();
	object.html([
		'<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi laoreet tempus erat vitae porttitor. Phasellus nec massa turpis. Aliquam erat volutpat. Etiam sodales consectetur molestie. Suspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus sem odio, condimentum id imperdiet nec, aliquet quis urna.</p>',
		'<p>Etiam neque purus, cursus et interdum a, tristique vitae est. Sed blandit, lorem quis lacinia sodales, turpis nulla consectetur lorem, at euismod lacus neque sit amet sapien. Mauris non venenatis eros. Suspendisse potenti. Pellentesque a est nec neque convallis tristique ut sit amet dui. Nam eu faucibus diam. Nam eu magna ac magna sagittis ullamcorper. Praesent tristique lectus ut risus pellentesque id lacinia sem scelerisque. Morbi aliquet mauris sed purus scelerisque mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>',
		'<p>Integer eu dui a ante aliquet vehicula et nec odio. Morbi cursus consectetur enim, feugiat sagittis nisi elementum in. Nulla facilisi. Duis euismod ipsum nec enim faucibus accumsan. Aenean lectus libero, ornare non auctor aliquet, malesuada sed ligula. Aliquam id nibh quis libero vestibulum ornare. Suspendisse commodo rhoncus enim ut facilisis.</p>',
		'<p>Ut et lorem vitae mi ornare fringilla. Donec bibendum, turpis lacinia bibendum semper, urna urna porta justo, placerat facilisis magna mi vel dolor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin porta porta euismod. Pellentesque arcu elit, molestie quis volutpat sit amet, accumsan in nunc. Duis tincidunt est et mauris mollis suscipit. Etiam lacinia leo bibendum est suscipit rutrum. Nullam imperdiet consectetur felis, ac vestibulum nulla luctus vitae. Suspendisse potenti. Duis sit amet nisi vel leo bibendum volutpat vitae sed nibh. Phasellus sapien urna, convallis rhoncus ultricies at, dignissim et ipsum. Suspendisse eget dui sodales enim sodales aliquet eu a sem.</p>'
	].join(''));
	eval('var options = ' + code);
	object.customscroll(options);
});