declare global {
  namespace planck {
    export type Body = any;
    export type World = any;
    export type Vec2 = any;
  }

  type pBody = planck.Body;
  type EventEmitter = Phaser.Events.EventEmitter;
  type Sprite = Phaser.GameObjects.Sprite;
  type Container = Phaser.GameObjects.Container;
  type Scene = Phaser.Scene;
  type Vector2 = Phaser.Math.Vector2;
  type Vector2Like = Phaser.Types.Math.Vector2Like;
  type Transform = Phaser.GameObjects.Components.Transform;
  type Zone = Phaser.GameObjects.Zone;
  type Pointer = Phaser.Input.Pointer;
  type GameObject = Phaser.GameObjects.GameObject;
  type Graphics = Phaser.GameObjects.Graphics;
  type RenderTexture = Phaser.GameObjects.RenderTexture;
  type CanvasTexture = Phaser.Textures.CanvasTexture;
  type PhaserText = Phaser.GameObjects.Text;
  type Circle = Phaser.Geom.Circle;
  type ParticleEmitter = Phaser.GameObjects.Particles.ParticleEmitter;
  type TimerEvent = Phaser.Time.TimerEvent;
  type TileSprite = Phaser.GameObjects.TileSprite;
}

export {};