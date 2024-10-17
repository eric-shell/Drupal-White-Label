Drupal.behaviors.inputLabels = {
  attach: function (context, settings) {

    // Check fields on load to see if they already have a value
    $.each($('.layout-container input, .layout-container textarea'), function () {
      if ($(this).val()) {
        $(this).addClass('active').siblings('label').addClass('active');
      }
    });

    // When field is clicked or focused
    $('body').on('click focus', '.layout-container input, .layout-container textarea', function () {
      $(this).addClass('active').siblings('label').addClass('active');
    });

    // When field is navigated away from without a value
    $('body').on('blur', '.layout-container input, .layout-container textarea', function () {
      if (!$(this).val()) {
        $(this).removeClass('active').siblings('label').removeClass('active');
      }
    });

  }
}

// Format telephone numbers as they are entered
$('input.phone-number, input[type=tel]').on('input', function (event) {
  const number = $(this).val();

  // Only handle formatting if numbers are being added, not deleted
  if (number.length >= 1 && number.length > numberLength) {
    numberLength = number.length;
    $(this).val(formatPhoneNumber(number));
  }
  else {
    numberLength = number.length;
  }
});

function formatPhoneNumber(phoneNumberString) {
  const regExp = /[a-zA-Z]/g;
  // Sanitize string of non-numeric characters
  let cleaned = ('' + phoneNumberString).replace(/\D/g, '');

  // Check for letters in original string
  // If letters exist then return the sanitized string back to the input
  if (regExp.test(phoneNumberString)) {
    return cleaned;
  }

  // If there is a number in the input that is larger than 10 characters, then only allow the first 10
  if ($.isNumeric(cleaned) && cleaned > 10) {
    cleaned = cleaned.substring(0, 10);
  }

  // Create matches to try and format phone number as (234) 556-7788
  // Format number as user is typing
  const matchThree = cleaned.match(/^(\d{3})$/);
  const matchSix = cleaned.match(/^(\d{3})(\d{3})$/);
  const matchFull = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

  if (matchThree) {
    return '(' + matchThree[1] + ') ';
  }

  if (matchSix) {
    return '(' + matchSix[1] + ') ' + matchSix[2] + '-';
  }

  if (matchFull) {
    return '(' + matchFull[1] + ') ' + matchFull[2] + '-' + matchFull[3];
  }

  // If all else fails return the original string
  return phoneNumberString;
}