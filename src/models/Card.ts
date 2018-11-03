import {computed, observable} from "mobx";

export class Card {
    @observable name?: string;
    level?: string;
    @observable selected: boolean = false;

    @computed
    get imgUrl(): string {
        return `/static/images/cards/${this.name}.jpg`;
    }
}