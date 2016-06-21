/*!
 * JFFUtils v0.1.1
 * @author anhskohbo <anhskohbo@gmail.com>
 */
(function ($) {
  'use strict';

  var JFFUtils = function () {

    /**
     * Available map styles.
     * Thanks for: https://snazzymaps.com
     *
     * @type {Array}
     */
    this.MAP_STYLES = [
      {
        mapTypeId: 'grayscale',
        styles: [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}]
      },
      {
        mapTypeId: 'ultra-light',
        styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]
      },
      {
        mapTypeId: 'shades-of-grey',
        styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]
      },
      {
        mapTypeId: 'blue-water',
        styles: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]}]
      },
      {
        mapTypeId: 'pale-dawn',
        styles: [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"on"},{"lightness":33}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2e5d4"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#c5dac6"}]},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},{"featureType":"road","elementType":"all","stylers":[{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#c5c6c6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#e4d7c6"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#fbfaf7"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"color":"#acbcc9"}]}]
      },
      {
        mapTypeId: 'light-dream',
        styles: [{"featureType":"landscape","stylers":[{"hue":"#FFBB00"},{"saturation":43.400000000000006},{"lightness":37.599999999999994},{"gamma":1}]},{"featureType":"road.highway","stylers":[{"hue":"#FFC200"},{"saturation":-61.8},{"lightness":45.599999999999994},{"gamma":1}]},{"featureType":"road.arterial","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":51.19999999999999},{"gamma":1}]},{"featureType":"road.local","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":52},{"gamma":1}]},{"featureType":"water","stylers":[{"hue":"#0078FF"},{"saturation":-13.200000000000003},{"lightness":2.4000000000000057},{"gamma":1}]},{"featureType":"poi","stylers":[{"hue":"#00FF6A"},{"saturation":-1.0989010989011234},{"lightness":11.200000000000017},{"gamma":1}]}]
      },
      {
        mapTypeId: 'light-monochrome',
        styles: [{"featureType":"landscape","stylers":[{"hue":"#FFBB00"},{"saturation":43.400000000000006},{"lightness":37.599999999999994},{"gamma":1}]},{"featureType":"road.highway","stylers":[{"hue":"#FFC200"},{"saturation":-61.8},{"lightness":45.599999999999994},{"gamma":1}]},{"featureType":"road.arterial","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":51.19999999999999},{"gamma":1}]},{"featureType":"road.local","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":52},{"gamma":1}]},{"featureType":"water","stylers":[{"hue":"#0078FF"},{"saturation":-13.200000000000003},{"lightness":2.4000000000000057},{"gamma":1}]},{"featureType":"poi","stylers":[{"hue":"#00FF6A"},{"saturation":-1.0989010989011234},{"lightness":11.200000000000017},{"gamma":1}]}]
      }
    ];

  };

  /**
   * Create google-map via Gmap.js.
   */
  JFFUtils.prototype.gMapInit = function (id) {
    if (! window.GMaps || ! $(id).length) {
      return;
    }

    var $el = $(id);
    var markers = [];

    // Map default settings
    var settings = $.extend({
      el: id,

      lat: 21.0227358,
      lng: 105.8194541,

      zoom: 14,
      zoomControl: true,
      scrollwheel: false,

      mapTypeControl: false,
      streetViewControl: false,

    }, $el.data());

    // Build map marker
    $el.children('[data-map="marker"]').each(function() {
      var marker = $.extend({
        lat: settings.lat,
        lng: settings.lng,
      }, $(this).data());

      var htmlContent = $(this).html();
      if (htmlContent) {
        marker.infoWindow = { content: htmlContent };
      }

      delete marker.map;
      markers.push(marker);
    });

    // Fireup the map
    var map = new GMaps(settings);
    map.addMarkers(markers);

    // Map styles
    $.each(this.MAP_STYLES, function (i, style) {
      map.addStyle(style);
    });

    if (settings.style) {
      map.setStyle(settings.style);
    }

    return map;
  };

  /**
   * Parallax background effect use skrollr.
   */
  JFFUtils.prototype._parallaxBackgroundInit = function () {
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
  JFFUtils.prototype._fullHeightInit = function () {
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

  /**
   * Init JFFUtils.
   */
  JFFUtils.prototype.init = function () {
    $('.row-eq-height > [class*="col-"]').matchHeight();

    this._fullHeightInit();
    $('[data-height="fullscreen"]').css('height', '100vh');

    this._parallaxBackgroundInit();
  };

  window.JFFUtils = new JFFUtils;

  // Hold the door!
  $(function () {
    window.JFFUtils.init();
  });

})(jQuery);
