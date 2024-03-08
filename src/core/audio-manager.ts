import SOUNDS_LIST from "../data/sounds-list";

export default class AudioManager {
  private scene: Phaser.Scene;
  private sounds: any;

  private static exists: boolean;
  private static instance: AudioManager;

  constructor(scene: Scene) {
    if (AudioManager.exists) {
      return AudioManager.instance;
    }

    AudioManager.instance = this;
    AudioManager.exists = true;

    this.scene = scene;

    this.init();
  }

  public static getInstance() {
    return this.instance;
  }

  public play(name: string) {
    let sound = this.sounds[name];

    if (sound.isPlaying && sound.loop) {
      return;
    }

    sound.play();
  }

  private init() {
    this.sounds = {};

    for (const sound in SOUNDS_LIST) {
      const audio = (<any>SOUNDS_LIST)[sound];

      this.sounds[audio] = this.scene.sound.add(audio);
    }
  }
}