$('.menu__toggle--open').click(function() {
  $('html, body').addClass('menu--open').css('overflow', 'hidden');
  $('.header, .block-menu-system-menu-blockmain').addClass('mobile--active')
});

$('.menu__toggle--close').click(function() {
  $('html, body').removeClass('menu--open').css('overflow', 'auto');
  $('.header, .block-menu-system-menu-blockmain').removeClass('mobile--active')
});

$('.submenu__toggle').click(function() {
  $(this).toggleClass('submenu__toggle--open').next('.menu').slideToggle();
});
