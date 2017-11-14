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

//    this.game.world.setBounds(0, 0, this.game.config.gameWidth, this.game.config.gameHeight)
    this.game.physics.startSystem(Phaser.Physics.P2JS)
//    game.physics.p2.applyDamping = false
    this.game.renderer.renderSession.roundPixels = true

    this.letters = this.game.add.group()
    const collisions = this.game.physics.p2.createCollisionGroup()

    const t = document.getElementById('text')
    const range = document.createRange()
    const fadeFactor = rng(100, 400)
    const _fadeRight = fadeRight.bind(null, fadeFactor)
    const _fadeLeft = fadeLeft.bind(null, fadeFactor)
    const effect = sample([sink, squish, bump, drift, shift,
      spin, springy, crunch, _fadeLeft, _fadeRight,
      slantLeft, slantRight, splitX, splitY, cross, splitRL])

    const worldMaterial = game.physics.p2.createMaterial('worldMaterial')
    game.physics.p2.setWorldMaterial(worldMaterial, true, true, true, true)
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

          text.body.damping = rng(0.5, 0.9) 

          text.body.static = true
          let textMaterial = this.game.physics.p2.createMaterial('textMateral', text.body)
          let contact = game.physics.p2.createContactMaterial(textMaterial, worldMaterial)

          const opts = {
            index: i,
            rate: i / rng(250, 1000),
            collisions: collisions,
            material: contact,
            x: rect.x,
            y: rect.y,
            width: this.game.width,
            height: this.game.height
          }
          text.body.static = false
          effect(text, opts)
          this.letters.add(text)
      }
    }
  }
  update() {

  }
}
const fadeLeft = (factor, text, opts) => {
  const fade = Math.min(opts.x / factor, 1)
  text.addColor(`rgba(0,0,0,${fade})`, 0)
}

const fadeRight = (factor, text, opts) => {
  const fade = 1 - Math.min(opts.x / factor, 1)
  text.addColor(`rgba(0,0,0,${fade})`, 0)
}

const sink = (text, opts) => {
  text.body.velocity.y = rng(100, 100 + opts.rate)
  text.body.setCircle(text.width)
}

const squish = (text, opts) => {
  text.body.setRectangle(4)
  const acc = opts.y - 100
  text.body.velocity.y = -rng(acc, acc + opts.rate)
}

const slantRight = (text, opts) => {
  text.body.setRectangle(4)
  const acc = opts.y + rng(opts.x, opts.x - 50)
  text.body.velocity.y = -rng(acc, acc + opts.rate)
}

const slantLeft = (text, opts) => {
  text.body.setRectangle(4)
  const acc = opts.y - rng(opts.x, opts.x - 50)
  text.body.velocity.y = -rng(acc, acc + opts.rate)
}

/* Right goes down, left goes up */
const splitY = (text, opts) => {
  text.body.setRectangle(4)
  let acc
  // If we're on the right side, go up
  if (opts.x > opts.width / 2) {
    acc = opts.y + rng(opts.x, opts.x - 50)
  }
  else {
    acc = opts.y - rng(opts.x, opts.x - 50)
  }
  text.body.velocity.y = -rng(acc, acc + opts.rate)
}

/* Top goes up, bottom goes down */
const splitX = (text, opts) => {
  text.body.setRectangle(4)
  let acc = rng(opts.y, opts.y - 50)
  if (opts.y > opts.height / 2) {
    acc = acc
  }
  else {
    acc = -acc
  }
  text.body.velocity.y = acc
}

/* Top goes left, bottom goes right */
const splitRL = (text, opts) => {
  text.body.setRectangle(4)
  let acc = rng(opts.y, opts.y - 50)
  if (opts.y > opts.height / 2) {
    acc = acc
  }
  else {
    acc = -acc
  }
  text.body.velocity.x = acc
}

const cross = (text, opts) => {
  text.body.setRectangle(4)
  let acc = rng(opts.x, opts.x - 100)
  if (opts.y > opts.height / 2) {
    acc = -acc
  }
  else {
    acc = acc
  }
  text.body.velocity.y = acc
}


const crunch = (text, opts) => {
  text.body.setRectangle(4)
  text.body.velocity.x = -rng(200, 200 + opts.rate)
}

const springy = (text, opts) => {
  text.body.setRectangle(4)
  text.body.velocity.x = rng(400, 400 + opts.rate)
}

const shift = (text, opts) => {
  text.body.velocity.y = -rng(0, 20 + opts.rate)
}

const spin = (text, opts) => {
  text.body.setRectangle(4)
  text.body.angularVelocity = -rng(-1, 1)
  text.body.velocity.y = -rng(20, 20 + opts.rate)
}

const bump = (text, opts) => {
  text.body.velocity.x = rng(-2, 2)
  text.body.velocity.y = rng(-2, 2)
  text.body.setCircle(text.width / 2)
}

const drift = (text, opts) => {
  text.body.velocity.y = rng(opts.rate, opts.rate * 100)
}

const sample = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
}

const rng = (min, max) => {
  return Math.random() * (max - min) + min;
}
