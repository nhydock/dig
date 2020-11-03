import { Item } from "../Core/Item";

import data from '../data/items.json';

export type ItemPrize {
  item: ItemPrize
  amount: number
}

export class ItemFactory {
  readonly tbl: Item[] = data

  rollForItems(): ItemPrize | null {
    const c = Math.random();
    if (c > this.chance) return null;
  
    let a = Math.random();
    a = Math.round(a * this.diff + this.minAmount);
  
    log("Produced " + a + ' items of type "' + this.item.Name + '"');
  
    return { item: this.item, amount: a };
  }
  
  produceItems(type: number) {
    type -= 1; // Type/array offset
  
    if (type > this.itemMap.length) return;
  
    const chances = this.itemMap[type];
    for (const i in chances) {
      const result = chances[i].rollForItems();
      if (result !== null) {
        this.produceListeners.callAll(result);
        result.item.addMany(result.amount);
      }
    }
  }
}
