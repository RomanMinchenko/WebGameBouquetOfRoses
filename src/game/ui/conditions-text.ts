import Utils from "../../core/utils";
import RoseType from "../gameplay/interactive-elements/enum/rose-type.enum";
import { LevelData } from "../interface/level-conditions.interface";

export default class ConditionsText extends Phaser.GameObjects.Container {
  private textFirstPart: PhaserText;
  private textLastPart: PhaserText;

  constructor(scene: Scene) {
    super(scene);

    this.init();
  }

  public setConditions(levelData: LevelData) {
    const {conditions} = levelData;
  
    this.textFirstPart.text = `Збери букет із ${conditions[RoseType.White]}`;
    this.textLastPart.text = `та ${conditions[RoseType.Red]}`;
  }

  private init() {
    this.initIcons();
    this.initText();
  }

  private initIcons() {
    const { WIDTH } = Utils;

    const cross = Utils.spriteMake(0, 0, "assets/ui/cross_btn_icon.png");
    cross.x = -WIDTH * 0.5 + 100;
    this.add(cross);

    const whiteRose = Utils.spriteMake(0, 0, "assets/ui/white_rose_icon.png");
    whiteRose.x = -WIDTH * 0.5 + 705;
    this.add(whiteRose);

    const redRose = Utils.spriteMake(0, 0, "assets/ui/red_rose_icon.png");
    redRose.x = -WIDTH * 0.5 + 970;
    this.add(redRose);
  }

  private initText() {
    const { WIDTH } = Utils;

    const fontStyle = {
      font: `42pt ${Utils.FONT}`,
      align: 'center',
      color: '#ffffff',
      shadow: { offsetX: 0, offsetY: 5, color: "#b68e3c", blur: 0, stroke: true, fill: true }
    };

    const firstPart = this.textFirstPart = Utils.textMake(0, -4, "Збери букет із 3", fontStyle);
    firstPart.x = -WIDTH * 0.5 + 180;
    firstPart.setOrigin(0, 0.5);
    this.add(firstPart);

    const lastPart = this.textLastPart = Utils.textMake(0, -4, "та 2", fontStyle);
    lastPart.x = -WIDTH * 0.5 + 780;
    lastPart.setOrigin(0, 0.5);
    this.add(lastPart);
  }
}