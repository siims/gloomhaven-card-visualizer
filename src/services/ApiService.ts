import {CharacterType} from "../models/Character";

export class ApiService {
    public static cardImageUrl(character: CharacterType, cardName: string): string {
        const characterString = character.toLowerCase().replace(/ /g, "_");
        const cardNameString = cardName.toLowerCase().replace(/ /g, "_").replace(/'/g, "");

        return `${process.env.PUBLIC_URL}/static/images/cards/${characterString}/${cardNameString}.png`;
    }

    public static defaultCardUrl(characterType: CharacterType = "scoundrel"): string {
        const characterString = characterType.toLowerCase().replace(/ /g, "_");
        return `${process.env.PUBLIC_URL}/static/images/cards/${characterString}/${characterString}_back.png`;
    }

    public static characterIconUrl(characterType: CharacterType = "scoundrel"): string {
        const characterString = characterType.toLowerCase().replace(/ /g, "_");
        return `${process.env.PUBLIC_URL}/static/images/icons/${characterString}.svg`;
    }
}