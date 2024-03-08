import AudioManager from "../../../core/audio-manager";
import MathHelper from "../../../core/math-helper";
import Utils from "../../../core/utils";
import { LevelData } from "../../interface/level-conditions.interface";
import Confetti from "../../libs/confetti";
import GameplayEventsType from "../enum/gameplay-events-type.enum";
import RoseType from "./enum/rose-type.enum";
import Coords from "./interface/coords.interface";
import Rose from "./rose";

const offsetX = 510;

export default class InteractiveElements extends Phaser.GameObjects.Container {
  private whiteRosesList: Rose[];
  private redRosesList: Rose[];
  private targetRoseList: Rose[];
  private whiteRosesContainer: Container;
  private redRosesContainer: Container;
  private targetContainer: Container;
  private freeTargetPositions: Coords[];
  private rosePositions: Coords[];
  private levelData: LevelData;
  private attempt: number;
  private particles: Confetti;

  constructor(scene: Scene) {
    super(scene);

    this.init();
  }

  public setLevelConditions(levelData: LevelData) {
    this.levelData = levelData;
    this.attempt = 1;
  }

  public checkTaskResult([promise, resolve, reject]: any) {
    const {WIDTH, S} = Utils;
    const { conditions } = this.levelData;

    promise
      .then(() => {
        AudioManager.getInstance().play("success");

        this.disableInput();
        this.particles.show(WIDTH * 0.5 * S, 150);
        this.scene.time.delayedCall(1500, () => this.onLevelComplete());
       })
      .catch(() => {
        AudioManager.getInstance().play("fail");
        
        this.reset();
        if (this.attempt === 0) {
          this.showCorrectAnswer();
        } else {
          this.attempt -= 1;
        }
      });

    let white = 0;
    let red = 0;

    this.targetRoseList.forEach(rose => {
      const type = rose.getRoseType();

      if (type === RoseType.Red) {
        red += 1;
      } else if (type === RoseType.White) {
        white += 1;
      }
    });

    function getSuccess(goal: number, result: number) {
      return goal <= result ? goal : result;
    }

    const redSuccess = getSuccess(conditions[RoseType.Red], red);
    const whiteSuccess = getSuccess(conditions[RoseType.White], white);

    this.levelData.results = { all: 5, success: redSuccess + whiteSuccess };

    if (this.levelData.results.all === this.levelData.results.success) {
      resolve();
    } else {
      reject(this.attempt);
    }
  }

  private reset() {
    this.targetContainer.removeAll();
    this.freeTargetPositions = this.getFreePositions();

    this.whiteRosesContainer.removeAll();
    this.whiteRosesList.forEach(rose => this.whiteRosesContainer.add(rose));

    this.redRosesContainer.removeAll();
    this.redRosesList.forEach(rose => this.redRosesContainer.add(rose));

    this.setRosesPositions(this.redRosesList);
    this.setRosesPositions(this.whiteRosesList);

    this.enableInput();

    this.targetRoseList = [];
  }

  private enableInput() {
    this.whiteRosesList.forEach(rose => rose.setInteractive());
    this.redRosesList.forEach(rose => rose.setInteractive());
    this.targetRoseList.forEach(rose => rose.setInteractive());
  }

  private disableInput() {
    this.whiteRosesList.forEach(rose => rose.disableInteractive());
    this.redRosesList.forEach(rose => rose.disableInteractive());
    this.targetRoseList.forEach(rose => rose.disableInteractive());
  }

  private showCorrectAnswer() {
    const { levelData } = this;
    const freeTargetPositions = this.getFreePositions();
    const delay = 400;
    let completedTweenNumber = 0;

    const animateRoses = (roses: Rose[],container: Container, rosesNumber: number, containerOffsetX: number, delayOffset: number) => {
      for (let i = 0; i < rosesNumber; i++) {
        const rose = roses[i];
        rose.x += containerOffsetX;
        container.remove(rose);
        this.targetContainer.add(rose);
        const position = freeTargetPositions.shift();

        rose.animateAnswer(position, delay * freeTargetPositions.length)
        .on("complete", () => {
          if (completedTweenNumber === 4) {
            this.onLevelComplete();
          } else {
            ++completedTweenNumber;
          }
        });
      }
    }

    animateRoses(this.redRosesList, this.redRosesContainer, levelData.conditions[RoseType.Red], -offsetX, 0);
    animateRoses(this.whiteRosesList, this.whiteRosesContainer, levelData.conditions[RoseType.White], offsetX, 400);
  }

  private onLevelComplete() {
    let outerReject, outerResolve;
    const promise = new Promise((resolve, reject) => {
      outerReject = reject;
      outerResolve = resolve;
    });

    this.emit(GameplayEventsType.LevelCompleted, [promise, outerResolve, outerReject]);

    promise
    .then(() => {
      this.reset();
    });
  }

  private init() {
    const roseNumber = 5;
    this.rosePositions = MathHelper.GetEllipsePosition(roseNumber, 100, 60, -Math.PI * 0.9);
    this.freeTargetPositions = this.getFreePositions();

    const {
      container: whiteRosesContainer,
      roses: whiteRosesList
    } = this.initRoses(RoseType.White, roseNumber, offsetX);
    this.whiteRosesList = whiteRosesList;
    this.whiteRosesContainer = whiteRosesContainer;

    const {
      container: redRosesContainer,
      roses: redRosesList
    } = this.initRoses(RoseType.Red, roseNumber, -offsetX);
    this.redRosesList = redRosesList;
    this.redRosesContainer = redRosesContainer;

    this.setRosesPositions(this.whiteRosesList);
    this.setRosesPositions(this.redRosesList);

    this.initTargetContainer();
    this.initDropZone();
    this.initParticles();
    this.listenSignals();
  }

  private initRoses(roseType: RoseType, quantity: number, posX: number) {
    const container = new Phaser.GameObjects.Container(this.scene);
    container.x = posX;
    this.add(container);

    const roses = [];
    for (let i = 0; i < quantity; ++i) {
      const rose = new Rose(this.scene, roseType);
      rose.setObjectDepth(i);
      container.add(rose);

      roses.push(rose);
    }

    return { container, roses };
  }

  private setRosesPositions(roses: Rose[]) {
    const { rosePositions } = this;

    roses.forEach((rose: Rose, i: number) => {
      rose.x = rosePositions[i].x;
      rose.y = rosePositions[i].y;
      rose.setInteractive();
    });
  }

  private initTargetContainer() {
    this.targetRoseList = [];
    const targetContainer = this.targetContainer = new Phaser.GameObjects.Container(this.scene, 0, 0);
    this.add(targetContainer);
  }

  private initDropZone() {
    const zone = new Phaser.GameObjects.Rectangle(this.scene, 0, -50, 300, 200, 0xffff00, 0);
    zone.setInteractive();
    zone.input.dropZone = true;

    this.add(zone);
  }

  private initParticles() {
    const {WIDTH, HEIGHT} = Utils;

    this.particles = new Confetti(this.scene);
    this.particles.x = WIDTH * 0.5;
    this.particles.y = HEIGHT * 0.5;
  }

  private listenSignals() {
    const { input } = this.scene;

    const roseLocalStartPosition = { x: 0, y: 0 };
    const roseWorldStartPosition = { x: 0, y: 0 };
    const parentWorldPosition = { x: 0, y: 0 };
    const nativeRoseParent: { container: Container | null } = { container: null };

    input.on("dragstart", (pointer: Pointer, rose: Rose) => {
      this.onDragStart(rose, roseLocalStartPosition, roseWorldStartPosition, parentWorldPosition, nativeRoseParent);
    });

    input.on("drag", (pointer: Pointer, rose: Rose, dragX: number, dragY: number) => {
      this.onDrag(rose, dragX, dragY, roseWorldStartPosition, parentWorldPosition, roseLocalStartPosition);
    });

    input.on("dragend", (pointer: Pointer, rose: Rose, dropZone: boolean) => {
      this.onDragEnd(rose, dropZone, roseLocalStartPosition, nativeRoseParent);
    });
  }

  getFreePositions() {
    return JSON.parse(JSON.stringify(this.rosePositions));
  }

  private onDragStart(rose: Rose, roseLocalStartPosition: Coords, roseWorldStartPosition: Coords, parentWorldPosition: Coords, nativeRoseParent: { container: Container }) {
    const { INVS } = Utils;

    rose.onDragStart();

    nativeRoseParent.container = rose.parentContainer;
    roseLocalStartPosition.x = rose.x;
    roseLocalStartPosition.y = rose.y;

    const roseWorldTransformMatrix = rose.getWorldTransformMatrix();
    const x1 = roseWorldStartPosition.x = roseWorldTransformMatrix.tx;
    const y1 = roseWorldStartPosition.y = roseWorldTransformMatrix.ty;

    const worldTransformMatrix = this.parentContainer.getWorldTransformMatrix();
    const x2 = parentWorldPosition.x = worldTransformMatrix.tx;
    const y2 = parentWorldPosition.y = worldTransformMatrix.ty;

    rose.x = (x1 - x2) * INVS;
    rose.y = (y1 - y2) * INVS;

    rose.parentContainer.remove(rose);
    this.parentContainer.add(rose);
    this.parentContainer.bringToTop(rose);
  }

  private onDrag(rose: Rose, dragX: number, dragY: number, roseWorldStartPosition: Coords, parentWorldPosition: Coords, roseLocalStartPosition: Coords) {
    const { INVS } = Utils;
    const { x: x1, y: y1 } = roseWorldStartPosition;
    const { x: x2, y: y2 } = parentWorldPosition;
    const { x: x3, y: y3 } = roseLocalStartPosition;

    rose.x = (x1 - x2 - x3 + dragX) * INVS;
    rose.y = (y1 - y2 - y3 + dragY) * INVS;
  }

  private onDragEnd(rose: Rose, dropZone: boolean, roseLocalStartPosition: Coords, nativeRoseParent: { container: Container }) {
    if (dropZone) {
      this.parentContainer.remove(rose);
      this.targetContainer.add(rose);
      const { x, y } = this.freeTargetPositions.shift();
      rose.x = x;
      rose.y = y;
      rose.disableInteractive();

      rose.onDrop();

      this.targetRoseList.push(rose);
    } else {
      const { x, y } = roseLocalStartPosition;
      const depth = rose.getObjectDepth();

      nativeRoseParent.container.addAt(rose, depth);
      rose.x = x;
      rose.y = y;

      rose.onDragEnd();
    }
  }
}