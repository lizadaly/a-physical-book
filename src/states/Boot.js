import Phaser from 'phaser'
import WebFont from 'webfontloader'

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#FFFFFF'
    this.fontsReady = false
    this.fontsLoaded = this.fontsLoaded.bind(this)
  }

  preload () {
    WebFont.load({
      google: {
        families: ['Lora']
      },
      active: this.fontsLoaded
    })
  }

  create () {
    const { text } = this.game._bookConfig || {}
    const textEl = document.getElementById('text')
    if (text) {
      textEl.textContent = text
    }
  }

  render () {
    if (this.fontsReady) {
      this.state.start('Game')
    }
  }

  fontsLoaded () {
    this.fontsReady = true
  }
}
