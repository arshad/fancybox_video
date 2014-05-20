/**
 * @file
 * Integration file for fancyBox video module.
 */

(function($) {
  Drupal.behaviors.fancyBoxVideo = {
    attach: function(context, settings) {
      $(".fancybox-video").click(function() {
        $.fancybox.showLoading();

        var wrap = $('<div id="fancybox-video-wrapper"></div>').appendTo('body');
        var el   = $(this).clone().appendTo(wrap);

        el.oembed(null, {
          embedMethod : 'replace',
          maxWidth: 640,
          maxHeight: 450,
          afterEmbed  : function(rez) {
            var what = $(rez.code);
            var type = 'html';
            var scrolling = 'no';

            if (rez.type == 'photo') {
              what = what.find('img:first').attr('src');
              type = 'image';
            } else if (rez.type === 'rich') {
              scrolling = 'auto';
            }

            // Set width and height for iframe.
            what.attr('width', 640);
            what.attr('height', 450);

            $.fancybox.open({
              href      : what,
              type      : type,
              scrolling : scrolling,
              title     : rez.title || $(this).attr('title'),
              width     : 640,
              height    : 450,
              autoSize  : false
            });

            wrap.remove();
          },
          onError : function() {
            $.fancybox.open(this);
          }
        });

        return false;
      });
    }
  };
})(jQuery);
