import {action, computed, observable} from "mobx"
import {Card} from "../models/Card";
import {ApiService} from "../services/ApiService";
import {ChangeEvent} from "react";

export class CharacterDataStore {
    @observable public level: number = 1;
    @observable public rawCards: Card[] = [];
    @observable public finished: boolean = false;
    private notStartedLoading: boolean = true;

    public loadCharacterData() {
        if (this.notStartedLoading) {
            this.notStartedLoading = false;
            fetch("http://localhost:3003/cards")
                .then((response) => {
                    return response.json();
                })
                .then(this.transformToCards)
                .then(this.setRawCards)
                .catch((reason) => {
                    console.error("Failed to load response from backend. Is backend up?", reason);
                });
        }
    }

    @computed
    public get availableCards(): Card[] {
        return this.rawCards.filter((card) => {
            if (card.level === "X") {
                return true;
            }
            return Number(card.level) <= this.level;
        });
    }

    @computed
    public get selectedCards(): Card[] {
        return this.rawCards.filter((val) => val.selected);
    }

    private transformToCards(rawJsonData: any): Card[] {
        const data: Card[] = [];
        // @ts-ignore
        rawJsonData.cards.forEach((item) => {
            data.push(new Card(item.name, item.level));
        });
        return data;
    }

    @action.bound
    private setRawCards(cards: Card[]): void {
        this.rawCards = cards;
        this.finished = true
    }

    @action.bound
    public toggleSelect(evt: any) {
        this.rawCards.forEach((card) => {
            if (card.name === evt.target.alt && card.imgUrl != ApiService.defaultCardUrl) {
                card.selected = !card.selected;
            }
        })
    }

    @action.bound
    changeLevel(event: ChangeEvent<{}>, newLevel: number) {
        this.level = newLevel;
    }
}
