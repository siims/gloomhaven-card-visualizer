import {CharacterType} from "../models/Character";

export class ApiService {
    public static cardImageUrl(cardName?: string): string {
        return `/static/images/cards/${cardName}.jpg`;
    }

    public static defaultCardUrl(characterType: CharacterType = "scoundrel"): string {
        return `/static/images/cards/card_back_${characterType}.jpg`;
    }
}