/* globals __DEV__ */
import Phaser from 'phaser'

const rng = (min, max) => {
  return Math.random() * (max - min) + min;
}

const sample = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
}

const fadeLeft = (factor, text, opts) => {
  const fade = Math.min(opts.x / factor, 1)
  text.addColor(`rgba(0,0,0,${fade})`, 0)
}

const fadeRight = (factor, text, opts) => {
  const fade = 1 - Math.min(opts.x / factor, 1)
  text.addColor(`rgba(0,0,0,${fade})`, 0)
}

const splatter = (text, opts) => {
  text.body.velocity.y = rng(100, 100 + opts.rate)
  text.body.setCircle(text.width)
}

const squish = (text, opts) => {
  text.body.setRectangle(text.width)
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

const splitY = (text, opts) => {
  text.body.setRectangle(4)
  let acc
  if (opts.x > opts.width / 2) {
    acc = opts.y + rng(opts.x, opts.x - 50)
  } else {
    acc = opts.y - rng(opts.x, opts.x - 50)
  }
  text.body.velocity.y = -rng(acc, acc + opts.rate)
}

const splitX = (text, opts) => {
  text.body.setRectangle(4)
  let acc = rng(opts.y, opts.y - 50)
  if (opts.y > opts.height / 2) {
    acc = acc
  } else {
    acc = -acc
  }
  text.body.velocity.y = acc
}

const splitRL = (text, opts) => {
  text.body.setRectangle(4)
  let acc = rng(opts.y, opts.y - 50)
  if (opts.y > opts.height / 2) {
    acc = acc
  } else {
    acc = -acc
  }
  text.body.velocity.x = acc
}

const crossPass = (text, opts) => {
  text.body.damping = rng(0.8, 1.0)
  text.body.setRectangle(1)
  let acc = rng(opts.x / 2.0, opts.x * 1.5)
  if (opts.y > opts.height / 2) {
    acc = -acc
  }
  text.body.velocity.y = acc
}

const cross = (text, opts) => {
  text.body.damping = rng(0.8, 1.0)
  text.body.setRectangle(text.width)
  let acc = rng(opts.x / 2.0, opts.x * 1.5)
  if (opts.y > opts.height / 2) {
    acc = -acc
  }
  text.body.velocity.y = acc
}

const crunch = (text, opts) => {
  text.body.setRectangle(4)
  text.body.velocity.x = -rng(200, 200 + opts.rate)
}

const blob = (text, opts) => {
  text.body.setRectangle(1)
  if (Math.floor(Math.random() * 200) === 0) {
    text.body.setCircle(text.width * 4)
  }
}

const bullet = (text, opts) => {
  text.body.damping = rng(0.85, 0.95)
  text.body.setRectangle(1)
  if (Math.floor(Math.random() * 200) === 0) {
    text.body.setRectangle(text.width)
    text.body.velocity.x = 300
    text.body.velocity.y = 300
    text.body.damping = rng(-10, -1)
  }
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
  text.body.angularVelocity = -rng(-0.2, 0.2)
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

export const EFFECTS = {
  splatter,
  squish,
  bump,
  drift,
  shift,
  spin,
  springy,
  crunch,
  fadeLeft: fadeLeft.bind(null, rng(100, 400)),
  fadeRight: fadeRight.bind(null, rng(100, 400)),
  slantLeft,
  slantRight,
  splitX,
  splitY,
  cross,
  crossPass,
  splitRL,
  blob,
  bullet,
}

const EFFECT_LIST = Object.values(EFFECTS)

export default class extends Phaser.State {
  init () {
    this.style = {
      font: '16px Lora',
      fill: 'black',
      align: 'left',
    }
  }
  create () {
    this.game.physics.startSystem(Phaser.Physics.P2JS)
    this.game.renderer.renderSession.roundPixels = true

    this.letters = this.game.add.group()
    const collisions = this.game.physics.p2.createCollisionGroup()

    const t = document.getElementById('text')
    const range = document.createRange()

    const effectName = this.game._bookConfig && this.game._bookConfig.effect
    let effect
    if (effectName && EFFECTS[effectName]) {
      effect = EFFECTS[effectName]
    } else {
      effect = sample(EFFECT_LIST)
    }

    // Store the resolved effect name for external access
    const resolvedName = effectName && EFFECTS[effectName]
      ? effectName
      : Object.keys(EFFECTS).find(k => EFFECTS[k] === effect) || 'unknown'
    this.game._resolvedEffect = resolvedName

    const worldMaterial = game.physics.p2.createMaterial('worldMaterial')
    game.physics.p2.setWorldMaterial(worldMaterial, true, true, true, true)
    for (let i = 1;i < t.textContent.length + 1; i++) {
      range.setStart(t.firstChild, i-1)
      range.setEnd(t.firstChild, i)
      if (range.toString() !== ' ' && range.toString() !== '\n') {
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

          text.body.damping = rng(0.7, 0.9)

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
