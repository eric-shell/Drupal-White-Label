if ($('.block--accordions').length) {

  Drupal.behaviors.accordions = {
    attach: function (context, settings) {
      let accordion = $(once('accordion-click', '.block--accordions .paragraph__label'));

      accordion.click(function () {
        toggleAccordion($(this));
      });

      accordion.on('keypress', function (e) {
        if (e.which === 13) {
          e.preventDefault();
          toggleAccordion($(this));
        }
      });
    }
  }

  function toggleAccordion(element) {
    element.attr('aria-expanded', (element.attr('aria-expanded') == 'false' ? 'true' : 'false'));
    element.closest('.field-item__field-accordions').toggleClass('accordion--open').find('.paragraph__body').slideToggle(125, function() {
      $(this).attr('aria-hidden', ($(this).attr('aria-hidden') == 'true' ? 'false' : 'true'));
    });
  }
}
