import {action, computed, observable} from "mobx"
import {Card} from "../models/Card";

export class CharacterDataStore {
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
    public get selectedCards(): Card[] {
            return this.rawCards.filter((val) => val.selected);
    }

    private transformToCards(rawJsonData: any): Card[] {
        const data: Card[] = [];
        // @ts-ignore
        rawJsonData.cards.forEach((item) => {
            let newCard = new Card();
            newCard.name = item.name;
            newCard.level = item.level;
            data.push(newCard);
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
            if (card.name === evt.target.alt) {
                card.selected = !card.selected;
            }
        })
    }
}
