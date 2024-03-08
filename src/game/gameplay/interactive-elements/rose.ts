import Utils from "../../../core/utils";
import FRAME_NAME_DATA from "./data/frame-name-data";
import RoseType from "./enum/rose-type.enum";
import Coords from "./interface/coords.interface";

export default class Rose extends Phaser.GameObjects.Container {
  private roseType: RoseType;
  private view: Sprite;
  private objectDept: number;

  constructor(scene: Scene, roseType: RoseType) {
    super(scene)

    this.roseType = roseType;

    this.init();
  }

  public setObjectDepth(value: number) {
    this.objectDept = value;
  }

  public getObjectDepth() {
    return this.objectDept
  }

  public getRoseType() {
    return this.roseType;
  }

  public onDragStart() {
    this.animateScale(1.1);
  }

  public onDragEnd() {
    this.animateScale(1);
  }

  public onDrop() {
    this.scale = 1;
    this.animateScale(1.2, true);
  }

  public animateAnswer(to: Coords, delay: number) {
    const tween = this.scene.tweens.add({
      targets: this,
      x: to.x,
      y: to.y,
      duration: 800,
      delay,
      ease: Phaser.Math.Easing.Expo.Out,
    });

    return tween;
  }

  private init() {
    this.initView();
    this.initHitArea();
  }

  private initView() {
    const sprite = this.view = Utils.spriteMake(0, 0, FRAME_NAME_DATA[this.roseType]);
    this.add(sprite);
  }

  private initHitArea() {
    const {width, height} = this.view;
    this.setSize(width, height);
    this.setInteractive();
    this.scene.input.setDraggable(this);
  }

  private animateScale(scale: number, yoyo = false) {
    const ease = this.scale > scale
      ? Phaser.Math.Easing.Sine.Out
      : yoyo
        ? Phaser.Math.Easing.Sine.InOut
        : Phaser.Math.Easing.Sine.In;

    this.scene.tweens.add({
      targets: this,
      scale: scale,
      duration: 100,
      ease,
      yoyo,
      onComplete: () => {
        this.scale = yoyo ? 1 : scale;
      }
    });
  }
}