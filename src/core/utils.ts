import GAME_CONFIG from './game-config';

class Utils {
  public static scene: Phaser.Scene;
  public static font: string;
  public static S: number;
  public static INVS: number;

  public static registerGame(scene: Phaser.Scene): void {
    this.scene = scene;
  }

  public static textMake(x: number, y: number, value: string, style?: any): Phaser.GameObjects.Text {
    const fontStyle = style || {
      font: `30pt ${Utils.FONT}`,
      align: 'center',
      color: '#000000'
    };
    const text: Phaser.GameObjects.Text = new Phaser.GameObjects.Text(this.scene, x, y, value, fontStyle);

    return text;
  }

  public static isIE(): boolean {
    const ua = window.navigator.userAgent;
    const msie = ua.indexOf("MSIE ") > 0 || ua.indexOf('rv:11') > 0;

    return msie;
  }

  // eslint-disable-next-line complexity
  public static getDPI(): number {
    if (Utils.isIE()) // If Internet Explorer, return version number
    {
      return 1;
    }

    if ((<any>window).screen.deviceXDPI !== undefined || (<any>window).screen.logicalXDPI !== undefined) {
      return (<any>window).screen.deviceXDPI || (<any>window).screen.logicalXDPI;
    }

    let pixelRatio = 1;

    if (window.devicePixelRatio) {
      pixelRatio = window.devicePixelRatio > 2 ? 2 : window.devicePixelRatio;
    }

    return pixelRatio;
  }

  public static fitScale(container: Phaser.GameObjects.Container): void {
    const canvas: HTMLElement = document.getElementById('MathRose');
    const width: number = document.body.clientWidth * Utils.getDPI();
    const height: number = document.body.clientHeight * Utils.getDPI();

    const sX: number = width / GAME_CONFIG.baseWidth;
    const sY: number = height / GAME_CONFIG.baseHeight;
    const s: number = Math.min(sX, sY);

    container.x = ((<any>canvas).width - GAME_CONFIG.baseWidth * s) * 0.5;
    container.setScale(s);
    container.y = ((<any>canvas).height - GAME_CONFIG.baseHeight * s) * 0.5;

    const onFittedGame = new CustomEvent('onFittedGame');

    Utils.S = s;
    Utils.INVS = 1 / s;

    window.dispatchEvent(onFittedGame);
  }

  public static spriteMake(x: number, y: number, frameName: string): Phaser.GameObjects.Sprite {
    const sprite: Phaser.GameObjects.Sprite = new Phaser.GameObjects.Sprite(
      this.scene,
      x,
      y,
      this.getAtlas(frameName),
      frameName
    );

    return sprite;
  }

  public static getAtlas(frameName: string): string {
    const data: any = (<any>this.scene.textures).list;

    for (const key in data) {
      for (const keyFrame in data[key].frames) {
        if (data[key].frames.hasOwnProperty(keyFrame) && keyFrame === frameName) {
          return data[key].key;
        }
      }
    }

    console.warn(`FrameName '${frameName}' wasn't found in any of the atlases!`);
  }

  static get WIDTH(): number {
    return GAME_CONFIG.baseWidth;
  }

  static get HEIGHT(): number {
    return GAME_CONFIG.baseHeight;
  }

  static get BASE_ASPECT_RATIO(): number {
    return GAME_CONFIG.baseWidth / GAME_CONFIG.baseHeight;
  }

  static get FULL_HEIGHT(): number {
    const height: number = document.body.clientHeight * Utils.getDPI();

    return height;
  }

  static get FULL_WIDTH(): number {
    const width: number = document.body.clientWidth * Utils.getDPI();

    return width;
  }

  static get additionalHeight(): number {
    const height: number = document.body.clientHeight * Utils.getDPI();

    return height - GAME_CONFIG.baseHeight * Utils.S;
  }

  static get additionalWidth(): number {
    const width: number = document.body.clientWidth * Utils.getDPI();

    return (width - GAME_CONFIG.baseWidth * Utils.S) * 0.5;
  }

  static get centerView(): any {
    const y: number = Utils.additionalHeight + (Utils.HEIGHT * 0.5) * Utils.S;
    const x: number = Utils.additionalWidth + (Utils.WIDTH * 0.5) * Utils.S;

    return { x, y };
  }

  static get leftOffset(): number {
    return Utils.additionalWidth / Utils.S;
  }

  static get topOffset(): number {
    return Utils.additionalHeight / Utils.S;
  }

  static get FONT(): string {
    return this.font;
  }

  static set FONT(value: string) {
    this.font = value;
  }
}

export default Utils;
