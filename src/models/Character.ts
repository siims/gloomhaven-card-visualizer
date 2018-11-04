import {Card} from "./Card";
import {observable} from "mobx";

export type CharacterType = "elementalist" | "plagueherald" | "quartermaster" | "scoundrel";

export class Character {
    type: CharacterType;
    @observable level: number;
    cards: Card[];

    constructor(type: CharacterType, cards: Card[], level?: string | null) {
        this.type = type;
        this.cards = cards;
        if (level != null) {
            this.level = Number(level);
        } else {
            this.level = 1;
        }
    }
}