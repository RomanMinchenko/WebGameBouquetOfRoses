import * as Loader from 'webfontloader';
import GAME_CONFIG from "./core/game-config";
import GameScene from "./states/game-scene";
import PreloaderScene from "./states/preloader-scene";

const FontsLoader = {};
const localFonts: string[] = ['Inter-Regular'];

(<any>FontsLoader).load = (callback: any): void => {
  const config = {
    active: (): void => {
      if (document.readyState === 'complete') {
        callback();
      } else {
        window.addEventListener('load', () => {
          callback();
        });
      }

      console.log('Fonts loaded');
    },
    fontactive: (): void => {
      localFonts.forEach((name: string) => activateFonts(name));
    },
    custom: {
      families: localFonts
    }
  };

  localFonts.forEach((name: string) => activateFonts(name));

  Loader.load(config);
};

function activateFonts(familyName: string): void {
  const element: HTMLStyleElement = document.createElement('style');

  document.head.appendChild(element);

  const sheet: CSSStyleSheet = element.sheet;

  const styles: string = `@font-face {
    font-family: "${familyName}";
    src: url("fonts/${familyName}.woff");
    format("woff"); }\n`;
  sheet.insertRule(styles, 0);

}

class Main extends Phaser.Game {
  constructor(GAME_CONFIG: any) {
    super(GAME_CONFIG);

    this.canvas.id = 'MathRose';

    this.scene.add('Game', GameScene);
    this.scene.add('Preloader', PreloaderScene, true);
  }
}

window.addEventListener('load', () => {
  (<any>FontsLoader).load(
    () => {
      new Main(GAME_CONFIG);
    });
});