import {observable} from "mobx";
import {ApiService} from "../services/ApiService";

export class Card {
    name: string;
    level?: string;
    @observable selected: boolean = false;
    @observable imgUrl: string;

    constructor(name: string, level?: string) {
        this.name = name;
        this.level = level;
        this.imgUrl = ApiService.cardImageUrl(this.name);
    }
}