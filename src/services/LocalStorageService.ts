import {CharacterType} from "../models/Character";
import {Card} from "../models/Card";

export class LocalStorageService {

    public setCardSelected(characterType: CharacterType, card: Card): void {
        localStorage.setItem(`selectedCard.${characterType}.${card.name}`, String(card.selected));
    }

    public getCardSelected(characterType: CharacterType, card: Card): boolean {
        let value = localStorage.getItem(`selectedCard.${characterType}.${card.name}`);
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
}