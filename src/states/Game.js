/* globals __DEV__ */
import Phaser from 'phaser'

export default class extends Phaser.State {
  init () {
    this.style = {
      font: '12pt Arial',
      fill: 'black',
      align: 'left',
      wordWrap: true,
      wordWrapWidth: 450,
      useAdvancedWrap: true,
      backgroundColor: 'rgba(0,0,0,0)'

    }
    this.text = ""
  }
  preload () {}

  create () {

    const t = document.getElementById('text')
    const range = document.createRange()

    for (let i = 1;i < t.textContent.length + 1; i++) {
      range.setStart(t.firstChild, i-1)
      range.setEnd(t.firstChild, i)
      let rect = range.getBoundingClientRect()
      let text = this.game.add.text(
        rect.x,
        rect.y,
        range.toString(),
        this.style)
      text.anchor.set(0)

    }

  }

  render () {

  }
}
