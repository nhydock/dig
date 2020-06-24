import {
  CostFunction,
  CostListenerFunc,
  LevelListenerFunc,
  VisibleListenerFunc
} from "./Common";
import { Listener } from "./Listener";

export class Technology {
  private static defaultCostFunc: CostFunction = (baseCost, level) =>
    baseCost * Math.pow(level + 1, 2);

  private level = 0;
  private maxLevel = 10;
  private currCost: number;

  private costListeners = new Listener<CostListenerFunc>();
  private levelListeners = new Listener<LevelListenerFunc>();
  private visibleListeners = new Listener<VisibleListenerFunc>();

  constructor(
    private name: string,
    private baseCost: number,
    private visible: boolean,
    private dependTech: Technology | null = null,
    private dependLevel: number = 0,
    private costFunc: CostFunction = Technology.defaultCostFunc
  ) {
    if (this.dependTech)
      this.dependTech.addLevelListener(this.checkDependencyLevel);

    this.currCost = baseCost;
  }

  private checkDependencyLevel = (level: number) => {
    if (level == this.dependLevel) {
      this.visible = true;
      this.visibleListeners.callAll(this.visible);
    }
  };

  tryResearch(money: number): number {
    if (money >= this.currCost) {
      const cost = this.currCost;

      this.level++;

      this.currCost = this.costFunc(this.baseCost, this.level + 1);
      this.costListeners.callAll(this.ResearchCost);
      this.levelListeners.callAll(this.level);

      return cost;
    }
    return -1;
  }

  get Name(): string {
    return this.name;
  }

  get Level(): number {
    return this.level;
  }

  get MaxLevel(): number {
    return this.maxLevel;
  }

  get ResearchCost(): number {
    return this.currCost;
  }

  get IsVisible(): boolean {
    return this.visible;
  }

  addCostListener(func: CostListenerFunc) {
    this.costListeners.add(func);
  }

  addLevelListener(func: LevelListenerFunc) {
    this.levelListeners.add(func);
  }

  addVisibilityListener(func: VisibleListenerFunc) {
    this.visibleListeners.add(func);
  }
}