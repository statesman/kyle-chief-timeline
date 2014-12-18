// Script variables
var timelineConfig = {
	key: '0AvZh5Gsgu1WvdFo5VjB3dnBhSlVzN2hxejdsNmpHTFE',
	sheetName: 'Posts' // change to name of spreadsheet 'sheet' that contains the data
};

// A helper to get the bottom position of an el
var bottom = function(el) {
	return el.position().top + el.outerHeight(true);
};

// A helper to get the bottom of an item's date tab
var dateBottom = function(el) {
	return el.position().top + el.find('.date').outerHeight(true);
};

var Timeline = function(el, data, options) {
	this.$el = $(el);
	this.data = data;

	options = options || {};
	this.sort = options.sort || 'ascending';
	this.groupby = options.groupby || 'YYYY';
	if(typeof options.controls !== "undefined") {
		this.controls = options.controls;
	}
	else {
		this.controls = true;
	}

	// Group and sort data
	this._groupsort();

	// Add everything to the DOM
	this._renderContainer();
	this._renderItems();

	var self = this;

	// Once images are ready, flow the cards
	this.$timeline.imagesLoaded()
	  .done(function() {
	    self._layout();
			self._adjustLine();
	  });

	this.$el.find('.item a.open-close').click(function(e){
		$(this).siblings('.body').slideToggle(function(){
			self.$timeline.isotope('reLayout');
		});
		$(this).parents('.post').toggleClass('closed');
		self.$el.find('.expand-collapse-buttons a').removeClass('active');
		e.preventDefault();
	});

	this.$el.find('.post .share').hover(
		function(){
			$(this).find('.share-trigger').addClass('over');
			$(this).find('.share-popup').show();
		},
		function(){
			$(this).find('.share-trigger').removeClass('over');
			$(this).find('.share-popup').hide();
		}
	);

	if(this.controls) {
		this._setupControls();
	}
};

Timeline.prototype._renderContainer = function() {
	var self = this;

	var direction = 'newest';

	// Add a class to the passed parent el so we can style it
	this.$el.addClass('vertical-timeline');

	// Render the controls
	if(this.controls) {
		this.$el.append(JST.controls());
	}

	// Render the wrapper for timeline items
	this.$timeline = $('<div class="timeline-items"></div>');
	this.$timeline.appendTo(this.$el);

	// Add line
	this.$el.append('<div class="line-container"><div class="line"></div></div>');
};

/*
 * Group and sort data based on the date field
 */
Timeline.prototype._groupsort = function() {
	var self = this;

	var grouped = _.chain(this.data)
		.map(function(item) {
			var date = moment(item.date, 'MMMM D, YYYY');
			if(!date.isValid()) {
				console.warn('Invalid date for', item.title);
			}
			else {
				item.date = date;
				return item
			}
		})
		.sortBy(function(item) {
			var ts = item.date.clone().unix();
			if(self.sort === 'descending') {
				ts *= -1;
			}
			return ts;
		})
		.groupBy(function(item) {
			return item.date.format(self.groupby);
		})
		.map(function(items, group) {
			return {
				group: group,
				items: items
			}
		})
		.sortBy(function(item, group) {
			if(self.sort === 'descending') {
				group *= -1;
			}
			return group;
		})
		.value();

	this.data = grouped;
};

Timeline.prototype._renderItems = function() {

	// Loop through each of the gruoped, sorted items
	_.each(this.data, function(group) {

		// Add group markers
		var groupMarker = $(JST.group({
			name: group.group
		}));
		groupMarker.appendTo(this.$timeline);

		// Go through each item in the group and add it to the timeline
		var items = [];
		_.each(group.items, function(item) {

			// Render the item
			var item = $(JST.post(item));

			// Add the item to the DOM and save it to our internal array
			item.appendTo(this.$timeline);
			items.push(item);
		}, this)
	}, this);

};

/*
 * A function to layout the items and add them to the DOM
 */
Timeline.prototype._layout = function() {
	// A running number with the bottom of the lowest content item
	contentBottom = 0;

	// Loop through each of the gruoped, sorted items
	var items = [];

	$.each(this.$timeline.children(), $.proxy(function(i, el) {
		var el = $(el);

		// It's a grup marker
		if(el.hasClass('group-marker')) {
			el.css('top', contentBottom);

			// Update our running content bottom every time we add a marker
			contentBottom = bottom(el);

			items = [];
		}
		// It's a timeline card
		else {
			// Position the first item starting at the top of the left column
			if(items.length === 0) {
				el.addClass('left').css('top', contentBottom);
			}
			// Position the second item right below the date tab of the first
			else if(items.length === 1) {
				el.addClass('right').css('top', dateBottom(items.slice(-1)[0]));
			}
			// Position subsequent items wherever there is room
			else {
				// Get the most recent left and right cols
				items.reverse();
				var left = _.find(items, function(item) {
					return item.hasClass('left');
				});
				var right = _.find(items, function(item) {
					return item.hasClass('right');
				});
				items.reverse();

				// Pick a column ...
				// ... if the bottom of the left column is higher
				if(bottom(left) < bottom(right)) {
					el.addClass('left').css('top', _.max([bottom(left), dateBottom(right)]));
				}
				// ... if the bottom of the right column is higher
				else {
					el.addClass('right').css('top', _.max([bottom(right), dateBottom(left)]));
				}
			}

			items.push(el);

			// Update our running contentBottom counter, if appropriate
			contentBottom = _.max([bottom(el), contentBottom]);
		}
	}, this));
};

Timeline.prototype._setupControls = function() {
	var self = this;
	var controls = this.$el.find('.controls');
	controls.find('a.expand-all').click(function(e){
		self.$el.find('.post .body').slideDown(function(){
			self._layout(false);
		});
		self.$el.find('.post').removeClass('closed');
		self.$el.find('.expand-collapse-buttons a').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});

	controls.find('a.collapse-all').click(function(e){
		self.$el.find('.post .body').slideUp(function(){
			self._layout(false);
		});
		self.$el.find('.post').addClass('closed');
		self.$el.find('.expand-collapse-buttons a').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});

	controls.find('.sort-buttons a').click(function(e){
		var $this = $(this);
		// don't proceed if already selected
		if ($this.hasClass('active')) {
			return false;
		}
		controls.find('.sort-buttons a').removeClass('active');
		$this.addClass('active');
		var $yearMarkers = $('.year-markers');
		if ($this.hasClass('sort-newest')){
			self.sort = 'descending';
		}
		else{
			self.sort = 'ascending';
		}
		self._layout(false);
		e.preventDefault();
	});
};

Timeline.prototype._adjustLine = function() {
	var last = this.$timeline.find('.item').last();
	this.$el.find('.line').height(last.position().top + last.find('.date').outerHeight());
};


$(function() {

	/**
	 * get data via Tabletop
	 */
	Tabletop.init({
		key: timelineConfig.key,
		callback: function(data, tabletop) {
			new Timeline('#timeline', tabletop.sheets(timelineConfig.sheetName).all(), {
				controls: false
			});
		},
		wanted: [timelineConfig.sheetName],
		postProcess: function(el){
			el['timestamp'] = Date.parse(el['date']);
			el['display_date'] = el['displaydate'];
			el['read_more_url'] = el['readmoreurl'];
			el['photo_url'] = el['photourl'];
		}
	});

});
