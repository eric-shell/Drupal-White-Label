function updateListToSelect() {
  if ($('ul.list-to-select').length && window.innerWidth < 1024) {
    Drupal.behaviors.listToSelect = {
      attach: function (context, settings) {

        $('ul.list-to-select, .block--local-tasks > ul').each(function() {
          var $select = $('<select />');

          $(this).find('li').each(function() {
            var $option = $('<option />');
            $option.attr('value', $(this).index()).html($(this).html());
            $select.append($option);
          });

          $(this).wrap('<div class="select__wrapper"></div>');
          $(this).replaceWith($select);
        });

      }
    }

    // Manually attach the behavior when the function is called
    Drupal.behaviors.listToSelect.attach(document, Drupal.settings);
  }
}

// Run on initial load
updateListToSelect();

// Add an event listener for browser resize
$(window).resize(function() {
  updateListToSelect();
});
