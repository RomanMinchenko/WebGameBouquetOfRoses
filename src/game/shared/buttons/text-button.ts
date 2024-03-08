import Utils from "../../../core/utils";
import AbstractButton from "./abstract-button";

export default class TextButton extends AbstractButton {
  constructor(scene: Scene, text: string) {
    super(scene, "assets/ui/button_blue.png");

    const fontStyle =  {
      font: `42pt ${Utils.FONT}`,
      align: 'center',
      color: '#ffffff',
      shadow: { offsetX: 0, offsetY: 5, color: "#2e6eaa", blur: 0, stroke: true, fill: true }
    };

    this.addText(0, -6, text, fontStyle);
  }
}