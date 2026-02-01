// phaser-ce requires PIXI and p2 as globals before Phaser loads
import './globals'
import Phaser from 'phaser'

window.Phaser = Phaser

import BootState from './states/Boot'
import GameState, { EFFECTS } from './states/Game'
export const effectNames = Object.keys(EFFECTS)

export function createPhysicalBook(selector, { text, effect } = {}) {
  const container = document.querySelector(selector)

  const contentEl = document.createElement('div')
  contentEl.id = 'content'
  contentEl.style.height = `${container.clientHeight}px`
  container.appendChild(contentEl)

  // Measure the content box of #content after styles are applied
  const style = getComputedStyle(contentEl)
  const width = contentEl.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight)
  const height = contentEl.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom)

  // Hidden pre used to measure character positions via the Range API
  const textEl = document.createElement('pre')
  textEl.id = 'text'
  textEl.style.cssText = `width:${width}px;font-size:16px;font-family:Lora;line-height:1.5em;position:absolute;top:0;visibility:hidden;font-variant-ligatures:none;`
  container.appendChild(textEl)

  const game = new Phaser.Game(Math.round(width), Math.round(height), Phaser.CANVAS, 'content', null)

  game._bookConfig = { text, effect }

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
    setContent(newText) {
      document.getElementById('text').textContent = newText
      game.state.start('Game')
    },
    getResolvedEffect() {
      return game._resolvedEffect
    },
  }
}
