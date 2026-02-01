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

    const { bookData } = this.game._bookConfig || {}
    this.game.load.json('book', bookData || 'data/book.json')
  }

  create () {
    const book = this.game.cache.getJSON('book')
    const { chapter: chapterIndex = 0 } = this.game._bookConfig || {}

    if (book.length - 1 >= chapterIndex) {
      const chapter = book[chapterIndex]
      const text = chapter.join('\n')
      document.getElementById('text').innerHTML = text
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
