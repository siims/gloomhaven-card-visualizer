import {observable} from "mobx";

export class Card {
    name?: string;
    level?: string;
    imgUrl?: string;
    @observable selected: boolean = false;
}