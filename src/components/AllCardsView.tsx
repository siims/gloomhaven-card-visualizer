import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import "./AllCardsView.css";
import Paper from "@material-ui/core/es/Paper/Paper";
import {CharacterDataStore} from "../stores/CharacterDataStore";
import Spinner from "./Spinner";

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
                {store.rawCards.map(card => (
                    <img
                        src={card.imgUrl}
                        key={card.name}
                        alt={card.name}
                        onClick={store.toggleSelect}
                        style={{display: "inline", width: "10rem"}}
                        className={card.selected ? "card-selected" : ""}
                    />
                ))}
            </Paper>
        );
    }
}

export default AllCardsView;