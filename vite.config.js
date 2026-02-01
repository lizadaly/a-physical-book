import { defineConfig } from 'vite'
import path from 'path'

const phaserModule = path.join(__dirname, 'node_modules/phaser-ce/')

export default defineConfig({
  resolve: {
    alias: {
      phaser: path.join(phaserModule, 'build/custom/phaser-split.js'),
      pixi: path.join(phaserModule, 'build/custom/pixi.js'),
      p2: path.join(phaserModule, 'build/custom/p2.js'),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.js'),
      name: 'APhysicalBook',
      fileName: 'a-physical-book',
    },
  },
})
