type Particle = Phaser.GameObjects.Particles.ParticleEmitter;

export default class Confetti extends Phaser.GameObjects.Container {
  private particles: Particle;

  constructor(scene: Phaser.Scene) {
    super(scene);

    this.init();
  }

  public show(x: number = 0, y: number = 0): void {
    this.particles.visible = true;
    const maxCount = 35;
    this.particles.explode(maxCount, x, y);
  }

  public hideAll(): void {
    this.particles.visible = false;
  }

  private init(): void {
    const particleManager = this.scene.make.particles({ key: 'assets' });
    this.add(particleManager);

    const frameNames: string[] = [
      'assets/fxs/confetti/particle_1_1.png',
      'assets/fxs/confetti/particle_1_2.png',
      'assets/fxs/confetti/particle_1_3.png',
      'assets/fxs/confetti/particle_1_4.png',
      'assets/fxs/confetti/particle_1_6.png',
      'assets/fxs/confetti/particle_1_8.png',
    ];

    this.particles = this.scene.add.particles(0,0,"assets",{
      frame: frameNames,
      lifespan: 1600,
      scale: { start: 1, end: 0.5 },
      alpha: { start: 1, end: 0 },
      speedX: { min: -300, max: 300 },
      speedY: { min: -100, max: 50 },
      rotate: { start: -360, end: 360 },
      gravityY: 150,
      emitting: false,
    });
  }
}
