class VideoPlayer {
  selectors = {
    root: '[data-js-video]',
    video: '[data-js-video-player]',
    playButton: '[data-js-video-play-button]',
  }

  stateClasses = {
    isHidden: 'is-hidden',
  }

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root)
    if (!this.rootElement) return
    this.videoElement = this.rootElement.querySelector(this.selectors.video)
    this.playButtonElement = this.rootElement.querySelector(this.selectors.playButton)
    this.bindEvents()
  }

  onPlayButtonClick = () => {
    this.playButtonElement.classList.add(this.stateClasses.isHidden)
    this.videoElement.play()

  }

  bindEvents() {
    this.playButtonElement.addEventListener('click', this.onPlayButtonClick)

  }
}

export default VideoPlayer