import 'phaser';

const BASE_WIDTH: number = 1920;
const BASE_HEIGHT: number = 1080;

const GAME_CONFIG: any = {
  baseWidth: BASE_WIDTH,
  baseHeight: BASE_HEIGHT,
  width: BASE_WIDTH > window.innerWidth ? window.innerWidth : BASE_WIDTH,
  height: BASE_HEIGHT > window.innerHeight ? window.innerHeight : BASE_HEIGHT,
  type: Phaser.AUTO,
  transparent: true,
  render: {
    batchSize: 512,
    powerPreference: 'high-performance',
    clearBeforeRender: false,
    antialiasGL: true,
    antialias: true
  },
};

export default GAME_CONFIG;
