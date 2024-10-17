// Toggle class on each block placed with layout builder when scrolled into the viewport
var controller = new ScrollMagic.Controller();
$('main .block:not(.layout-builder-block)').each( function() {
  new ScrollMagic.Scene({
    triggerElement: this,
    reverse: false,
    offset: -325
  })
    .setClassToggle(this, 'scroll-animate').addTo(controller);
});
