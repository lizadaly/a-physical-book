import PIXI from 'pixi'
import p2 from 'p2'
import Phaser from 'phaser'

import BootState from './states/Boot'
import GameState, { EFFECTS } from './states/Game'
import config from './config'

// phaser-ce requires these as globals
window.PIXI = PIXI
window.p2 = p2
window.Phaser = Phaser

export const effectNames = Object.keys(EFFECTS)

export function createPhysicalBook(container, { chapter = 0, bookData, effect } = {}) {
  // Create required DOM elements inside the container
  const textEl = document.createElement('pre')
  textEl.id = 'text'
  textEl.style.cssText = 'width:600px;font-size:16px;font-family:Lora;line-height:1.5em;position:absolute;top:0;visibility:hidden;font-variant-ligatures:none;'
  container.appendChild(textEl)

  const contentEl = document.createElement('div')
  contentEl.id = 'content'
  container.appendChild(contentEl)

  const game = new Phaser.Game(config.gameWidth, config.gameHeight, Phaser.CANVAS, 'content', null)

  game._bookConfig = { chapter, bookData, effect }

  game.state.add('Boot', BootState, false)
  game.state.add('Game', GameState, false)
  game.state.start('Boot')

  return {
    game,
    effects: effectNames,
    setEffect(name) {
      game._bookConfig.effect = name
      game.state.start('Game')
    },
    setContent(html) {
      document.getElementById('text').innerHTML = html
      game.state.start('Game')
    },
    getResolvedEffect() {
      return game._resolvedEffect
    },
  }
}
