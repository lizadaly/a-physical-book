/* globals __DEV__ */
import Phaser from 'phaser'

export default class extends Phaser.State {
  init () {
    this.style = {
      font: 'bold 12pt Lora',
      fill: 'black',
      align: 'left',
      wordWrap: true,
      wordWrapWidth: 450,
      useAdvancedWrap: true
    }
    this.text = `It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.
However little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families, that he is considered the rightful property of some one or other of their daughters.

“My dear Mr. Bennet,” said his lady to him one day, “have you heard that Netherfield Park is let at last?”

Mr. Bennet replied that he had not.

“But it is,” returned she; “for Mrs. Long has just been here, and she told me all about it.”
Mr. Bennet made no answer.

“Do you not want to know who has taken it?” cried his wife impatiently.

“You want to tell me, and I have no objection to hearing it.”

This was invitation enough.
    `
  }
  preload () {}

  create () {
    const text = this.game.add.text(
      25,
      25,
      this.text,
      this.style)
    text.anchor.set(0)
    text.x = Math.floor(text.x)
    text.y = Math.floor(text.y)
  }

  render () {

  }
}
