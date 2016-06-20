/*!
 * jff-init v1.0.2
 * @author anhskohbo <anhskohbo@gmail.com>
 */
(function ($) {
  'use strict';

  /**
   * Parallax background effect use skrollr.
   */
  var parallaxBackgroundInit = function () {
    var callSkrollInit = false;

    if ( window.parallaxSkrollr ) {
      return window.parallaxSkrollr.destroy();
    }

    $('.parallax-mirror').remove();
    $('[data-5p-top-bottom]').removeAttr('data-5p-top-bottom data-30p-top-bottom data-50p-top-bottom');

    $('[data-init="parallax"]').each(function () {
      var $el = $(this);
      callSkrollInit = true;

      // Get element data atts
      var skrollrSize   = 100 * (parseFloat($el.data('parallaxSpeed')) || 1.5);
      var parallaxImage = $el.data('parallaxImage');

      var skrollrSpeed  = skrollrSize - 100;
      var skrollrStart  = -skrollrSpeed;
      var skrollrEnd    = 0;

      $el.addClass('parallax-ready');
      if (! $el.hasClass('parallax')) {
        $el.addClass('parallax');
      }

      // Parallax fadeout
      if ($el.data('parallaxFadeout')) {
        $el.children().attr('data-5p-top-bottom', 'opacity: 0;').attr('data-50p-top-bottom', 'opacity: 1;');
      }

      // Make parallax mirror
      var $parallaxEl = $('<div class="parallax-mirror"></div>')
        .appendTo($el)
        .height(skrollrSize + '%')
        .attr('data-bottom-top', 'top: ' + skrollrStart + '%;')
        .attr('data-top-bottom', 'top: ' + skrollrEnd + '%;');

      // Set background image
      if (parallaxImage) {
        $parallaxEl.css({ backgroundImage: 'url(' + parallaxImage + ')' });
      }
    });

    // Call skrollr
    if (callSkrollInit && window.skrollr) {
      window.parallaxSkrollr = skrollr.init({
        forceHeight: false,
        smoothScrolling: false
      });
    }
  };

  /**
   * Full-height element on page.
   */
  var fullHeightInit = function () {
    var $el = $('[data-height="full"]:first');

    if (! $el.length) {
      return;
    }

    var offsetTop = $el.offset().top;
    var windowHeight = $(window).height();

    if (windowHeight > offsetTop) {
      var fullHeight = 100 - offsetTop / (windowHeight / 100);
      $el.css('min-height', fullHeight + 'vh');
    }
  };

  // Hold the door!
  $(function () {
    $('.row-eq-height > [class*="col-"]').matchHeight();

    fullHeightInit();
    $('[data-height="fullscreen"]').css('height', '100vh');

    parallaxBackgroundInit();
  });

})(jQuery);
