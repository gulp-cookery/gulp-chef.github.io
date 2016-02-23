'use strict';

var $ = require('jquery');

module.exports = function () {
	$('.ripple-link').click(function (e) {
		var $link, $ink, d, x, y;

		$link = $(this);
		$ink = $link.find('.ink');
		if ($ink.length === 0) {
			$ink = $('<span class="ink"></span>');
			$link.prepend($ink);
		} else {
			$ink.removeClass('animate');
		}

		if (!$ink.height() && !$ink.width()) {
			d = Math.max($link.outerWidth(), $link.outerHeight());
			$ink.css({ height: d, width: d });
		}

		x = e.pageX - $link.offset().left - $ink.width() / 2;
		y = e.pageY - $link.offset().top - $ink.height() / 2;

		$ink.css({ top: y + 'px', left: x + 'px' }).addClass('animate');
	});
};
