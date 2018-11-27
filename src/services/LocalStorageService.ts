import {CharacterType} from "../models/Character";
import {Card} from "../models/Card";

export class LocalStorageService {

    public setCardInScenarioDeckState(characterType: CharacterType, card: Card): void {
        localStorage.setItem(`scenarioDeck.${characterType}.${card.name}`, String(card.inScenarioDeck));
    }

    public getCardInScenarioDeckState(characterType: CharacterType, cardName: string): boolean {
        let value = localStorage.getItem(`scenarioDeck.${characterType}.${cardName}`);
        return value != null ? (value === "true") : false;
    }

    public getSelectedCharacter(): CharacterType {
        // @ts-ignore
        return localStorage.getItem(`lastSelectedCharacter`) || "scoundrel";
    }

    public setSelectedCharacter(selectedCharacter: CharacterType) {
        return localStorage.setItem(`lastSelectedCharacter`, selectedCharacter);
    }

    public getCharacterLevel(characterType: CharacterType): number {
        let level: any = localStorage.getItem(`level.${characterType}`);
        return level != null ? Number(level) : 1;
    }

    public setCharacterLevel(characterType: CharacterType, level: number) {
        localStorage.setItem(`level.${characterType}`, String(level));
    }

    public setCardInPlayerDeckState(characterType: CharacterType, card: Card) {
        localStorage.setItem(`playerDeck.${characterType}.${card.name}`, String(card.inPlayerDeck));
    }

    public getCardInPlayerDeckState(characterType: CharacterType, cardName: string): boolean {
        let value = localStorage.getItem(`playerDeck.${characterType}.${cardName}`);
        return value != null ? (value === "true") : false;
    }
}