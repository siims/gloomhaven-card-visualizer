
export class ApiService {
    public static cardImageUrl(cardName?: string): string {
        return `/static/images/cards/${cardName}.jpg`;
    }

    public static get defaultCardUrl(): string {
        return `/static/images/cards/card_back.jpg`;
    }
}