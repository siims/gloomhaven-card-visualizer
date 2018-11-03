import {action, computed, observable} from "mobx"
import {Card} from "../models/Card";
import {ApiService} from "../services/ApiService";
import {ChangeEvent} from "react";
import {Character, CharacterType} from "../models/Character";

export class CharacterDataStore {
    // @ts-ignore
    @observable public selectedCharacter: CharacterType = localStorage.getItem(`lastSelectedCharacter`) || "scoundrel";
    @observable public characters: Character[] = [];
    @observable public finished: boolean = false;
    private notStartedLoading: boolean = true;

    public loadCharacterData() {
        if (this.notStartedLoading) {
            this.notStartedLoading = false;
            let url: string = "/cards?character=" + this.selectedCharacter;
            if (process.env.NODE_ENV === "development") {
                url = "http://localhost:3003" + url;
            }
            fetch(url)
                .then((response) => {
                    return response.json();
                })
                .then(this.transformToCharacter)
                .then(this.setCharacter)
                .catch((reason) => {
                    console.error("Failed to load response from backend. Is backend up?", reason);
                });
        }
    }

    @computed
    public get currentCharacter(): Character | null {
        if (this.isCharacterLoaded(this.selectedCharacter)) {
            return this.characters.filter((char) => char.type === this.selectedCharacter)[0];
        }
        return null;
    }
    @computed
    public get level(): number {
        return this.currentCharacter != null ? this.currentCharacter.level!! : 1;

    }

    @computed
    public get availableCards(): Card[] {
        return this.currentCards.filter((card) => {
            if (card.level === "X") {
                return true;
            }
            return Number(card.level) <= this.level;
        });
    }

    @computed
    public get selectedCards(): Card[] {
        return this.currentCards.filter((val) => val.selected);
    }

    @action.bound
    public setSelectedCharacter(characterType: CharacterType): void {
        this.selectedCharacter = characterType;
        localStorage.setItem(`lastSelectedCharacter`, this.selectedCharacter);
        if (!this.isCharacterLoaded(characterType)) {
            this.finished = false;
            this.notStartedLoading = true;
            this.loadCharacterData();
        }
    }

    @action.bound
    public toggleSelect(evt: any) {
        this.currentCards.forEach((card) => {
            if (card.name === evt.target.alt && card.imgUrl != ApiService.defaultCardUrl) {
                card.selected = !card.selected;
            }
        })
    }

    @action.bound
    public changeLevel(event: ChangeEvent<{}>) {
        // @ts-ignore
        this.currentCharacter!!.level = Number(event.target.value);
        localStorage.setItem(`level.${this.selectedCharacter}`, String(this.currentCharacter!!.level))
    }

    private transformToCharacter(rawJsonData: any): Character {
        const cards: Card[] = [];
        rawJsonData.cards.forEach((item: any) => {
            cards.push(new Card(item.name, item.level));
        });
        const type = rawJsonData.type;
        return new Character(type, cards, localStorage.getItem(`level.${type}`));
    }

    @action.bound
    private setCharacter(character: Character): void {
        if (!this.isCharacterLoaded(character.type)) {
            this.characters.push(character);
            this.finished = true;
        }
    }

    private get currentCards() {
        let characters = this.characters.filter((char) => char.type === this.selectedCharacter);

        return characters.length !== 1 ? [] : characters.values().next().value.cards
    }

    private isCharacterLoaded(type: CharacterType) {
        return this.characters.filter((char) => char.type === type).length === 1;
    }
}
