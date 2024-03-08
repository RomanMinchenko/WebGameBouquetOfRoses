import Utils from "../../../core/utils";
import { LevelData } from "../../interface/level-conditions.interface";

const offsetY = 100;
const textOffsetY = 160;

export default class TableResult extends Phaser.GameObjects.Container {
  private strings: PhaserText[];
  private bg: Sprite;

  constructor(scene: Scene) {
    super(scene);

    this.init();
  }

  public show() {
    this.visible = true;

    this.animateAppear(this.bg)
    .on("complete", () => {
      this.strings.forEach((string, i) => {
        this.animateAppear(string, 300, 150 * i);
      });
    });
  }

  public setResult(levelData: LevelData[]) {
    this.strings.forEach((string, i) => {
      const {all, success} = levelData[i].results;
      const result = `${i + 1} завдання: ${success} з ${all}`

      string.text = result;
    });
  }

  private animateAppear(target: any, duration = 400, delay = 400) {
    const tween = this.scene.tweens.add({
      targets: target, 
      alpha: 1,
      duration,
      delay,
      onStart: () => {
        target.alpha = 0;
        target.visible = true;
      },
    });

    return tween; 
  }
 
  private init() {
    this.initBg();
    this.initRows();
  }

  private initBg() {
    const bg = this.bg = Utils.spriteMake(0, 0, "assets/screens/ebdScreen/popup.png");
    bg.visible = false;
    this.add(bg);
  }

  private initRows() {
    this.strings = [];
    for (let i = 0; i < 5; i++) {
      const text = this.createText();
      text.visible = false;
      text.y = i * offsetY - textOffsetY;

      this.strings.push(text);
    }
  }

  private createText() {
    const fontStyle =  {
      font: `28pt ${Utils.FONT}`,
      align: 'center',
      color: '#6D867D',
    };

    const text = Utils.textMake(0,0,"", fontStyle);
    text.setOrigin(0.5);
    this.add(text);

    return text;
  }
}