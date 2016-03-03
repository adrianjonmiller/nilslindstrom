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
    });
  }

  Js.Behaviors.gallery = function(container) {
    var $container = $(container);
    var $main = $($container.find('.js-gallery-main'));

    $(container).on('click', '[data-large]', function(e){
      var $target = $(e.target),
      image = new Image();
      $image = $(image);

      $image.css('opacity', 0);
      $image.addClass('js-large');
      image.src = $target.attr('data-large');;

      $(image).on('load', function(){
        $main.find('.js-large').remove();
        var $this = $(this);
        $main.prepend($this);
        $this.animate({
          opacity: 1,
        }, 750);
      });
      $container.find('.is-current').removeClass('is-current');
      $target.addClass('is-current');
    })
  }
});
