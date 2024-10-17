// When the Display Functionality field is set to Slider
// And only enable slider when more than one item exists (logic in template)
$('.display--slider .slider--available').each(function() {
  const slideCount = $(this).children('.field-item').length;

  if (slideCount > 1) {
    $(this).slick({
      dots: true,
      // adaptiveHeight: true,
      appendDots: $(this).next().find('.slider__dots'),
      prevArrow: $(this).next().find('.slider__prev'),
      nextArrow: $(this).next().find('.slider__next')
    });
  }
});
