/* globals __DEV__ */
import Phaser from 'phaser'



export default class extends Phaser.State {
  init () {
    this.style = {
      font: '16px Lora',
      fill: 'black',
      align: 'left',
    }
  }
  create () {
    this.game.world.setBounds(0, 0, 1400, 800)
    this.game.physics.startSystem(Phaser.Physics.P2JS)
    this.game.renderer.renderSession.roundPixels = true

    this.letters = this.game.add.group()
    const collisions = this.game.physics.p2.createCollisionGroup()

    const t = document.getElementById('text')
    const range = document.createRange()

    const effect = sample([sink, float, bump, drift, shift])

    for (let i = 1;i < t.textContent.length + 1; i++) {
      range.setStart(t.firstChild, i-1)
      range.setEnd(t.firstChild, i)
      if (range.toString() !== ' ' && range.toString() !== '\n') { // Skip rendering whitespace
        let rect = range.getBoundingClientRect()
        let text = this.game.add.text(
          rect.x,
          rect.y,
          range.toString(),
          this.style)
          this.game.physics.p2.enable(text)
          text.body.x += text.width / 2
          text.body.y += text.height / 2;
          text.body.clearShapes()

          text.body.static = true

          const opts = {
            index: i,
            rate: i / rng(250, 1000),
          }
          text.body.static = false
          effect(text, opts)

          // text.body.setCollisionGroup(collisions)
          // text.body.collides([collisions])

          this.letters.add(text)

      }
    }
  }
  update() {

  }
}
const sink = (text, opts) => {
  text.body.velocity.y = rng(100, 100 + opts.rate)
  text.body.setCircle(text.width)
}

const float = (text, opts) => {
  text.body.setRectangle(4)
  text.body.velocity.y = -rng(1, opts.rate)
}

const shift = (text, opts) => {
  text.body.velocity.y = rng(-20, 20)
}
const bump = (text, opts) => {
  text.body.velocity.x = rng(-2, 2)
  text.body.velocity.y = rng(-2, 2)
  text.body.setCircle(text.width / 2)
}

const drift = (text, opts) => {
  text.body.velocity.y = rng(opts.rate, opts.rate * 5)
}

const sample = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
}

const rng = (min, max) => {
  return Math.random() * (max - min) + min;
}
