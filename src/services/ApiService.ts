import {CharacterType} from "../models/Character";

export class ApiService {
    public static cardImageUrl(cardName?: string): string {
        return `/static/images/cards/${cardName}.png`;
    }

    public static defaultCardUrl(characterType: CharacterType = "scoundrel"): string {
        return `/static/images/cards/card_back_${characterType}.png`;
    }
}