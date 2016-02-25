jQuery( document ).ready( function( $ ) {

  Js.Behaviors.scrollbar = function(container) {
    var $this = $(container);
    var $container = $this.find('.js-slider');
    var offset = 0;
    var itemsWidth = 0;

    $.each($container.children(), function(index, item){
      itemsWidth = itemsWidth + $(item).width();
    });

    $this.on('click', function(e){
      var target = e.target;
      console.log(itemsWidth);

      if($(e.target).hasClass('js-left')) {
        if(offset > 0) {
          $container.animate(
            {
              scrollLeft: offset - $container.width()
            },
          500);
          offset = offset - $container.width();
        }
      }

      if($(e.target).hasClass('js-right')) {
        if(offset < itemsWidth) {
          $container.animate(
            {
              scrollLeft: offset + $container.width()
            },
          500);
          offset = offset + $container.width();
        }
      }
    })
  }
});
