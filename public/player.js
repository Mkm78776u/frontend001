
document.getElementById('playBtn').addEventListener('click', () => {
  const video = document.getElementById('video');
  const url = document.getElementById('streamUrl').value;
  const qualitySelect = document.getElementById('qualitySelect');

  if (Hls.isSupported()) {
    const hls = new Hls();
    hls.loadSource(url);
    hls.attachMedia(video);

    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      qualitySelect.innerHTML = '<option value="auto">Auto</option>';
      hls.levels.forEach((level, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.text = level.height + 'p';
        qualitySelect.appendChild(option);
      });

      qualitySelect.addEventListener('change', () => {
        const selectedQuality = qualitySelect.value;
        if (selectedQuality === 'auto') {
          hls.currentLevel = -1;
        } else {
          hls.currentLevel = parseInt(selectedQuality);
        }
      });

      video.play();
    });
  } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = url;
    video.addEventListener('loadedmetadata', () => {
      video.play();
    });
  } else {
    alert('Your browser does not support HLS playback.');
  }
});
