import {observable} from "mobx";
import {ApiService} from "../services/ApiService";
import {CharacterType} from "./Character";

export class Card {
    name: string;
    level?: string;
    @observable inPlayerDeck: boolean;
    @observable inScenarioDeck: boolean;
    @observable imgUrl: string;

    constructor(character: CharacterType, name: string, level: string, inPlayerDeck: boolean, inScenarioDeck: boolean) {
        this.name = name;
        this.level = level;
        this.imgUrl = ApiService.cardImageUrl(character, this.name);
        this.inPlayerDeck = Card.alwaysInPlayerDeck(this) || inPlayerDeck;
        this.inScenarioDeck = inScenarioDeck;
    }

    static alwaysInPlayerDeck: (card: Card) => boolean = (card: Card) => {
        return card.level === "X" || card.level === "1" || card.level === "M";
    };
}