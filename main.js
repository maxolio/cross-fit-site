import OverlayMenu from './modules/OverlayMenu.js'
import VideoPlayer from './modules/VideoPlayer.js'
import BMRCalculator from './modules/BMRCalculator.js'

document.addEventListener('DOMContentLoaded', () => {
  new VideoPlayer()
  new OverlayMenu()
  new BMRCalculator()
})
