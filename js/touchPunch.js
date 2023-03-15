$('#widget').draggable({
    scroll: false,
    containment: "#bg-container",
    
    start: function( event, ui ) {
        console.log("start top is :" + ui.position.top)
        console.log("start left is :" + ui.position.left)
    },
    drag: function(event, ui) {
        console.log('draging.....');    
    },
    stop: function( event, ui ) {
        console.log("stop top is :" + ui.position.top)
        console.log("stop left is :" + ui.position.left)

        alert('left:'+ui.position.left + ' top:'+ui.position.top)
    }    
});