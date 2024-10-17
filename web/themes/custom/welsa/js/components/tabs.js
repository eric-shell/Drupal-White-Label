if($('.tabs').length) {

  Drupal.behaviors.tabs = {
    attach: function (context, settings) {
      let tab = $('.tab__title');

      tab.on('click touchstart', function(){
        selectTab($(this));
      });

      tab.on('keypress', function (e) {
        if (e.which === 13) {
          selectTab($(this));
        }
      });

      $(document).on('change', '.tabs select', function() {
        selectTab($(this));
      });
    }
  }

  function selectTab(element) {
    let activeTab = element.index() + 1;

    if (window.innerWidth < 1024) {
      activeTab = parseInt(element.find(':selected').val()) + 1;
    }

    $('.tab__title').removeClass('active').attr('aria-selected', 'false');
    element.addClass('active').attr('aria-selected', 'true');
    $('.tab__content').removeClass('active').attr('tabindex', '-1');
    $('.tab__content:nth-child(' + activeTab + ')').addClass('active').attr('tabindex', '0');
  }
}
