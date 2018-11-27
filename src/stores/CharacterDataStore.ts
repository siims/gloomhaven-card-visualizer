import {action, computed, observable} from "mobx"
import {Card} from "../models/Card";
import {ApiService} from "../services/ApiService";
import {ChangeEvent} from "react";
import {Character, CharacterType} from "../models/Character";
import {LocalStorageService} from "../services/LocalStorageService";

const cragheartData = require("../data/cragheart.json");
const elementalistData = require("../data/elementalist.json");
const plagueheraldData = require("../data/plagueherald.json");
const quartermasterData = require("../data/quartermaster.json");
const scoundrelData = require("../data/scoundrel.json");

export class CharacterDataStore {
    private localStoreService: LocalStorageService;

    @observable public selectedCharacter: CharacterType;
    @observable public characters: Character[] = [];
    @observable public finished: boolean = false;
    private notStartedLoading: boolean = true;

    constructor(localStoreService: LocalStorageService) {
        this.localStoreService = localStoreService;
        this.selectedCharacter = this.localStoreService.getSelectedCharacter();
    }

    public loadCharacterData = () => {
        if (this.notStartedLoading) {
            this.notStartedLoading = false;
            this.setCharacter(this.transformToCharacter(cragheartData));
            this.setCharacter(this.transformToCharacter(elementalistData));
            this.setCharacter(this.transformToCharacter(plagueheraldData));
            this.setCharacter(this.transformToCharacter(quartermasterData));
            this.setCharacter(this.transformToCharacter(scoundrelData));
        }
    };

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
        return this.currentCards.filter(this.inLevelRange);
    }

    @computed
    public get selectedCards(): Card[] {
        return this.currentCards.filter((val) => val.inScenarioDeck).filter(this.inLevelRange);
    }

    @action.bound
    public setSelectedCharacter(characterType: CharacterType): void {
        this.selectedCharacter = characterType;
        this.localStoreService.setSelectedCharacter(this.selectedCharacter);
        if (!this.isCharacterLoaded(characterType)) {
            this.finished = false;
            this.notStartedLoading = true;
            this.loadCharacterData();
        }
    }

    @action.bound
    public toggleToFromScenarioDeck(card: Card): void {

        if (card.inPlayerDeck && card.imgUrl != ApiService.defaultCardUrl(this.selectedCharacter)) {
            if (this.maxCardsHaveBeenSelected(card)) {
                alert(`You have selected maximum amount of cards for your character.\n\n
                        ${this.capitalize(this.selectedCharacter)} can hold ${this.currentCharacter!!.numOfCards} cards.`);
                return;
            }
            card.inScenarioDeck = !card.inScenarioDeck;
            this.localStoreService.setCardInScenarioDeckState(this.selectedCharacter, card);
        }
    }

    @action.bound
    public toggleToFromPlayerDeck(currentCard: Card): void {
        const isAddingCard = !currentCard.inPlayerDeck;
        const playerCardCount = this.currentCards.filter((card) => card.inPlayerDeck).length;
        const levelOneCards = this.currentCards.filter((card) => Card.alwaysInPlayerDeck(card)).length;
        const currentLevel = this.currentCharacter!.level;
        const allowedCardAmount = levelOneCards + (currentLevel - 1);
        const numberOfLastLevelCardsSelected = this.countCardsInPlayerDeck(currentLevel);
        const numberOfPreviousLevelCardsSelected = this.countCardsInPlayerDeck(currentLevel - 1);

        if (isAddingCard && playerCardCount === allowedCardAmount) {
            alert("You have selected all card allowed. Remove a card from your player deck first.");
            return;
        }
        if (isAddingCard && Number(currentCard.level) === currentLevel && (numberOfLastLevelCardsSelected === 1 || numberOfPreviousLevelCardsSelected === 2)) {
            alert("Cannot select two cards of current level nor card from current level when two previous level cards are selected.");
            return;
        }
        if (isAddingCard && Number(currentCard.level) === currentLevel - 1 && numberOfLastLevelCardsSelected === 1 && numberOfPreviousLevelCardsSelected === 1) {
            alert("Cannot select two cards of previous level when one card is selected from last level.");
            return;
        }

        currentCard.inPlayerDeck = !currentCard.inPlayerDeck;
        currentCard.inScenarioDeck = false;
        this.localStoreService.setCardInPlayerDeckState(this.selectedCharacter, currentCard);
        this.localStoreService.setCardInScenarioDeckState(this.selectedCharacter, currentCard);
    }

    @action.bound
    public changeLevel(event: ChangeEvent<{}>) {
        // @ts-ignore
        this.currentCharacter!!.level = Number(event.target.value);
        this.localStoreService.setCharacterLevel(this.selectedCharacter, this.currentCharacter!!.level);
    }

    private transformToCharacter = (rawJsonData: any): Character => {
        const cards: Card[] = [];
        const type: CharacterType = rawJsonData.type;
        rawJsonData.cards.forEach((item: any) => {
            let cardName = item.name;
            let card = new Card(cardName, item.level, this.localStoreService.getCardInPlayerDeckState(type, cardName), this.localStoreService.getCardInScenarioDeckState(type, cardName));
            cards.push(card);
        });
        return new Character(type, cards, this.localStoreService.getCharacterLevel(type), rawJsonData.numOfCards);
    };

    @action.bound
    private setCharacter(character: Character): void {
        if (!this.isCharacterLoaded(character.type)) {
            this.characters.push(character);
            this.finished = true;
        }
    }

    private get currentCards() {
        let characters = this.characters.filter((char) => char.type === this.selectedCharacter);

        return characters.length !== 1 ? [] : characters.values().next().value.allCards
    }

    private isCharacterLoaded = (type: CharacterType) => {
        return this.characters.filter((char) => char.type === type).length === 1;
    };

    private inLevelRange = (card: Card) => {
        if (card.level === "X") {
            return true;
        }
        return Number(card.level) <= this.level;
    };

    private maxCardsHaveBeenSelected = (card: Card) => {
        return !card.inScenarioDeck && this.currentCards.filter((card) => card.inScenarioDeck).length >= this.currentCharacter!!.numOfCards;
    };

    private capitalize = (word: string): string => {
        return word[0].toUpperCase() + word.slice(1);
    };

    private countCardsInPlayerDeck(level: number): number {
        return this.currentCards.filter((card) => Number(card.level) === level && card.inPlayerDeck).length;
    }
}
