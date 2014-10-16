angular.module( 'symantis.creator.app', [

])
.controller( 'CreatorAppCtrl', function CreatorAppController( $scope, titleService ) {
	titleService.setTitle('Creator App');

	
})
.controller( 'CreatorAppCanvasCtrl', function CreatorAppCanvasController( $scope ) {
	
	$scope.customItems = [
      { size: { x: 2, y: 1 }, position: [0, 0] },
      { size: { x: 2, y: 2 }, position: [0, 2] },
      { size: { x: 1, y: 1 }, position: [0, 4] },
      { size: { x: 1, y: 1 }, position: [0, 5] },
      { size: { x: 2, y: 1 }, position: [1, 0] },
      { size: { x: 1, y: 1 }, position: [1, 4] },
      { size: { x: 1, y: 2 }, position: [1, 5] },
      { size: { x: 1, y: 1 }, position: [2, 0] },
      { size: { x: 2, y: 1 }, position: [2, 1] },
      { size: { x: 1, y: 1 }, position: [2, 3] },
      { size: { x: 1, y: 1 }, position: [2, 4] }
    ];

    $scope.gridsterOpts = {
        columns: 6, // the width of the grid, in columns
        pushing: true, // whether to push other items out of the way on move or resize
        floating: true, // whether to automatically float items up so they stack (you can temporarily disable if you are adding unsorted items with ng-repeat)
        width: 'auto', // can be an integer or 'auto'. 'auto' scales gridster to be the full width of its containing element
        colWidth: 'auto', // can be an integer or 'auto'.  'auto' uses the pixel width of the element divided by 'columns'
        rowHeight: 'match', // can be an integer or 'match'.  Match uses the colWidth, giving you square widgets.
        margins: [10, 10], // the pixel distance between each widget
        outerMargin: true, // whether margins apply to outer edges of the grid
        isMobile: false, // stacks the grid items if true
        mobileBreakPoint: 600, // if the screen is not wider that this, remove the grid layout and stack the items
        mobileModeEnabled: true, // whether or not to toggle mobile mode when screen width is less than mobileBreakPoint
        minColumns: 1, // the minimum columns the grid must have
        minRows: 2, // the minimum height of the grid, in rows
        maxRows: 100,
        defaultSizeX: 2, // the default width of a gridster item, if not specifed
        defaultSizeY: 1, // the default height of a gridster item, if not specified
        resizable: {
           enabled: true,
           handles: ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'],
           start: function(event, $element, widget) {}, // optional callback fired when resize is started,
           resize: function(event, $element, widget) {}, // optional callback fired when item is resized,
           stop: function(event, $element, widget) {} // optional callback fired when item is finished resizing
        },
        draggable: {
           enabled: true, // whether dragging items is supported
           handle: '.c-drag-handle', // optional selector for resize handle
           start: function(event, $element, widget) {}, // optional callback fired when drag is started,
           drag: function(event, $element, widget) {}, // optional callback fired when item is moved,
           stop: function(event, $element, widget) {} // optional callback fired when item is finished dragging
        }
    };

})
.controller( 'CreatorAppNavCtrl', function CreatorAppNavController( $scope, titleService ) {

	
})
.controller( 'CreatorAppHeaderCtrl', function CreatorAppHeaderController( $scope, titleService ) {
	

});