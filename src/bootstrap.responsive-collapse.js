(function ($) {
	$.fn.responsiveCollapse = function(options) {
		var settings = $.extend({
			breakPoint:       768,
			overflowItemText: '<i class="fa fa-bars"></i> More <b class="caret"></b>'
		}, options);

		var lastDocWidth = $(document).width();

		return this.filter('ul').each(function() {
			var $list        = $(this);
			var container    = $list.parent().parent();
			var overflowItem = $('<li class="dropdown hide"><a href="#" class="dropdown-toggle" data-toggle="dropdown">' + settings.overflowItemText + '</a><ul class="dropdown-menu dropdown-menu-right"></ul></li>').appendTo($list);
			var overflowList = $(overflowItem).find('ul.dropdown-menu');

			var thisWidth    = $list.outerWidth();
			var maxWidth     = $(container).width() - $(container).find('.navbar-header').width();

			function reset() {
				var child = $(overflowList).children();
				var count = child.length;
				if (count > 0) {
					for (var i = 0; i < count; i++) {
						$(child[i]).insertBefore($list.children(':last-child'));
					}
				}
				$(overflowItem).addClass('hide');
			}

			function grow() {
				var overflowWidth = $(overflowItem).width();
				var child         = $(overflowList).children();
				var count         = child.length;

				if (count > 0) {
					for (var i = 0; i < count; i++) {
						// move the first dropdown item to end of list
						$(child[i]).insertBefore($list.children(':last-child'));
						thisWidth = $list.outerWidth();
						if((i == count - 1 && thisWidth - overflowWidth > maxWidth) || (i != count - 1 && thisWidth > maxWidth)) {
							$(child[i]).prependTo(overflowList);
							break;
						}
					}
				}

				// Hide the overflow item if it has no children
				if($(overflowList).children().length == 0) {
					$(overflowItem).addClass('hide');
				}

				return;
			}

			function shrink() {
				var child = $list.children(':not(:last-child)');
				var count = child.length;
				if (count < 1) return;

				// show the overflow link in case it's been hidden
				$(overflowItem).removeClass('hide');

				for (var i = count - 1; i >= 0; i--) {
					// move the last item to dropdown
					$(child[i]).prependTo(overflowList);

					// recalc width
					thisWidth = $list.outerWidth();
					if(thisWidth < maxWidth) break;
				}
			}

			function refresh() {
				thisWidth = $list.outerWidth();
				maxWidth  = $(container).width() - $(container).find('.navbar-header').width();
				var docWidth  = $(document).width();

				if ($(window).width() < settings.breakPoint) {
					reset();
				} else if (thisWidth > maxWidth) {
					shrink();
				} else if (0 < (docWidth - lastDocWidth)) {
					grow();
				}
				lastDocWidth = docWidth;
			}

			$(window).resize(function() {
				refresh();
			}).trigger('resize');
		});
	}
}(jQuery));
