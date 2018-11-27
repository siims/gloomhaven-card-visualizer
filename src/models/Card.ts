import {observable} from "mobx";
import {ApiService} from "../services/ApiService";

export class Card {
    name: string;
    level?: string;
    @observable inPlayerDeck: boolean;
    @observable inScenarioDeck: boolean;
    @observable imgUrl: string;

    constructor(name: string, level: string, inPlayerDeck: boolean, inScenarioDeck: boolean) {
        this.name = name;
        this.level = level;
        this.imgUrl = ApiService.cardImageUrl(this.name);
        this.inPlayerDeck = Card.alwaysInPlayerDeck(this) || inPlayerDeck;
        this.inScenarioDeck = inScenarioDeck;
    }

    static alwaysInPlayerDeck: (card: Card) => boolean = (card: Card) => {
        return card.level === "X" || card.level === "1";
    };
}