/*!
 * jquery.customscroll 1.0
 *
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
 */
;(function($, window) {

	$.customscrollOptions = {
		show: {
			on: 'mouseenter scrollstart',
			effect: 'fadeIn',
			speed: 250,
			delay: 0
		},
		hide: {
			on: 'mouseleave scrollstop',
			effect: 'fadeOut',
			speed: 250,
			delay: 750
		},
		grow: {
			size: 3,
			speed: 100
		},
		pageUpnDown: {
			speed: 100
		}
	};

	$.fn.customscroll = function(options) {
		options = $.extend(true, {}, $.customscrollOptions, options || {});
		return this.each(function() {
			var object = $(this);

			// build template
			object.addClass('customscroll');
			object.html([
				'<div class="wrapper" style="height:' + object.height() + 'px">',
					'<div class="content">',
						object.html(),
					'</div>',
				'</div>',
				'<div class="placeholder">',
					'<div class="track">',
						'<div class="grip"></div>',
					'</div>',
				'</div>'
			].join(''));

			// get elements
			var wrapper = object.children('.wrapper'),
				placeholder = object.children('.placeholder'),
				track = placeholder.children('.track'),
				grip = track.children('.grip');

			// object hover
			var showHideTimer,
				show = function(event) {
				if (object.height() >= wrapper[0].scrollHeight) {
					// we dont need scroll
					return;
				}
				// show
				clearInterval(showHideTimer);
				showHideTimer = setTimeout(function() {
					track[options.show.effect](options.show.speed);
				}, options.show.delay);
				if (!event || event.type !== 'scrollstart') {
					// used for adjusting sizes
					wrapper.trigger('scroll');
				}
			};
			wrapper.on(options.show.on, show);
			wrapper.on(options.hide.on, function callback() {
				if (wrapper.hasClass('keep')) {
					// someone says do not hide, try again later
					return setTimeout(function() {
						callback();
					}, 250);
				}
				console.log('a', wrapper.hasClass('keep'))
				// hide
				clearInterval(showHideTimer);
				showHideTimer = setTimeout(function() {
					track[options.hide.effect](options.hide.speed);
				}, options.hide.delay);
			});

			// bind scroll event
			var scrollingTimer;
			wrapper.on('scroll', function(event) {
				var height = object.height();
				grip.css({
					// grip height is view height / scroll height * 200 (4 is for margins)
					height: height / this.scrollHeight * 200 - 4,
					// scroll position
					marginTop: this.scrollTop * 100 / this.scrollHeight * height / 100 + 'px'
				});
				// custom scroll start / end events
				if (!scrollingTimer) {
					wrapper.trigger('scrollstart');
				}
				clearInterval(scrollingTimer);
				scrollingTimer = setTimeout(function() {
					wrapper.trigger('scrollstop');
					scrollingTimer = null;
				}, 200);
			});

			// placeholder and track hover
			placeholder.on('mouseenter', function() {
				// do not hide track and show
				console.log('enter')
				wrapper.addClass('keep');
				show();
			});
			placeholder.on('mouseleave', function() {
				// hide track
				console.log('left')
				wrapper.removeClass('keep');
			});
			track.on('mouseenter', function() {
				track.addClass('hover');
				if (options.grow) {
					// stop animation queue and animate
					track.stop(true, true);
					track.animate({ width: '+=' + options.grow.size + 'px' }, options.grow.speed);
				}
			});
			track.on('mouseleave', function hover() {
				track.removeClass('hover');
				if (options.grow) {
					// stop animation queue and animate
					track.stop(true, true);
					track.animate({ width: '-=' + options.grow.size + 'px' }, options.grow.speed);
				}
			});

			// page up / down (track click)
			track.on('click', function(event) {
				if ($(event.target).hasClass('grip')) {
					// do not trigger when clicking the egrip
					return;
				}
				if (event.pageY - track.offset().top > parseInt(grip.css('marginTop'))) {
					// clicked after grip
					var operation = '+';
				} else {
					// clicked before grip
					var operation = '-';
				}
				// scroll
				wrapper.animate({
					scrollTop: operation + '=' + object.height() + 'px'
				}, options.pageUpnDown.speed);
			});

			// grip drag
			var dragging;
			grip.on('mousedown', function(event) {
				// do not hide
				wrapper.addClass('keep');
				// mark as dragging
				dragging = wrapper;
				// prevent text selection
				$('body').addClass('dragging');
			});
			if (!window.customscroll) {
				// do not bind more than once
				$(document).on('mousemove', function(event) {
					if (dragging) {
						// we have drag, move
						dragging.scrollTop(wrapper[0].scrollHeight * (event.pageY - track.offset().top - grip.height() / 2) / object.height());
						event.preventDefault();
					}
				});
				$(document).on('mouseup', function() {
					if (dragging) {
						// we have drag, remove
						dragging.removeClass('keep');
						dragging = null;
						$('body').removeClass('dragging');
					}
				});
				// mark so i dont bind events to document twice
				window.customscroll = true;
			}

		});
	};
})(jQuery, window);