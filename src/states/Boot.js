import Phaser from 'phaser'
import WebFont from 'webfontloader'

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#FFFFFF'
    this.fontsReady = false
    this.fontsLoaded = this.fontsLoaded.bind(this)
    this.bookLoaded = this.bookLoaded.bind(this)
  }

  preload () {
    WebFont.load({
      google: {
        families: ['Lora']
      },
      active: this.fontsLoaded
    })
    this.game.load.json('book', '/data/book.json')
  }
  create () {
    const book = this.game.cache.getJSON('book')
    // Join all the lines of the current chapter (0)
    let chapterIndex = this.game.net.getQueryString('chapter') || 0
    if (JSON.stringify(chapterIndex) === '{}') {
      chapterIndex = 0
    }
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
  bookLoaded () {
    this.bookReady = true
  }
}
