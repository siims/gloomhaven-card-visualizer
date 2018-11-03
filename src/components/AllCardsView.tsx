import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import "./AllCardsView.css";
import Paper from "@material-ui/core/es/Paper/Paper";
import {CharacterDataStore} from "../stores/CharacterDataStore";
import Spinner from "./Spinner";
import {ApiService} from "../services/ApiService";

interface IAllCardsViewProps {
    characterDataStore?: CharacterDataStore;
}

@inject("characterDataStore")
@observer
class AllCardsView extends Component<IAllCardsViewProps> {

    componentDidMount(): void {
        this.props.characterDataStore!!.loadCharacterData();
    }

    public render() {
        const store = this.props.characterDataStore!!;
        if (!store.finished) {
            return <Spinner/>
        }
        return (
            <Paper>
                {store.rawCards.map(card => {
                    return (
                        <img
                            src={card.imgUrl}
                            key={card.name}
                            alt={card.name}
                            onClick={store.toggleSelect}
                            onError={() => {card.imgUrl = ApiService.defaultCardUrl}}
                            style={{display: "inline", width: "10rem"}}
                            className={card.selected ? "card-selected" : ""}
                        />
                    );
                })}
            </Paper>
        );
    }
}

export default AllCardsView;