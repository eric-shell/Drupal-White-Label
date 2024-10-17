$('.block--background-video').each(function() {
  const block = $(this);

  scaffoldVideo(block);

  block.find('.video__playback').click(function() {
    toggleVideoPlayback($(this));
  });

  $(window).resize(function() {
    scaffoldVideo(block);
  });
});

function toggleVideoPlayback(playbackButton) {
  const activeVideo = playbackButton.next('.video__player').find('video.video--loaded');
  let currentState = activeVideo.attr('data-state');
  if (activeVideo) {
    if (currentState == 'pause') {
      playbackButton.attr('aria-label', 'Pause video').toggleClass('video__playback--play video__playback--pause');
      activeVideo.attr('data-state', 'play');
      activeVideo.get(0).play();
    } else {
      playbackButton.attr('aria-label', 'Play video').toggleClass('video__playback--play video__playback--pause');
      activeVideo.attr('data-state', 'pause');
      activeVideo.get(0).pause();
    }
  }
}

function scaffoldVideo(block) {
  const isDesktop = window.innerWidth >= 1024;
  const activeVideo = isDesktop ? 'desktop' : 'mobile';
  const hiddenVideo = isDesktop ? 'mobile' : 'desktop';

  block.addClass(`${activeVideo}--active`).removeClass(`${hiddenVideo}--active`);

  if (!block.find(`.video--${activeVideo}`).hasClass('video--loaded')) {
    loadVideo(activeVideo, block);
  }
}

function loadVideo(type, block) {
  const src = block.find(`.video--${type} source`).data('src');
  const video = block.find(`.video--${type}`);

  video.addClass('video--loaded').parents('.block--background-video').addClass('video--ready');
  block.find(`.video--${type === 'desktop' ? 'mobile' : 'desktop'}`).removeClass('video--loaded');
  block.find(`.video--${type} source`).attr('src', src);

  video.each(function() {
    this.load();
  });

  if (block.hasClass(`video__loop--${type}--off`)) {
    video.removeAttr('loop');
  }
}
