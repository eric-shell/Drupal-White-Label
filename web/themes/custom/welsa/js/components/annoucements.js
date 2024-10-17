if ($('.layout__region--announcements > .block').length) {

  let announcementState = sessionStorage.getItem('announcement');
  let announcementButton = $('.announcements__dismiss');

  if (announcementState !== 'dismissed') {
    $('.layout__region--announcements').show();
  }

  announcementButton.click(function () {
    closeAnnouncement();
  });

  announcementButton.on('keypress', function (e) {
    if (e.which === 13) {
      e.preventDefault();
      closeAnnouncement();
    }
  });

  function closeAnnouncement() {
    $('.layout__region--announcements').slideToggle();
    sessionStorage.setItem('announcement', 'dismissed');
  }
}
