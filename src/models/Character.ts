import {Card} from "./Card";
import {observable} from "mobx";

export type CharacterType = "elementalist" | "cragheart" | "plagueherald" | "quartermaster" | "scoundrel";

export const CharacterTypes : CharacterType[] = ["cragheart", "elementalist", "plagueherald", "quartermaster", "scoundrel"];

export class Character {
    type: CharacterType;
    @observable level: number;
    numOfCards: number;
    allCards: Card[];

    constructor(type: CharacterType, allCards: Card[], level: number, numOfCards: number) {
        this.type = type;
        this.allCards = allCards;
        this.level = level;
        this.numOfCards = numOfCards;
    }
}