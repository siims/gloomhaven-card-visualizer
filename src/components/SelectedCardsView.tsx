import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import "./AllCardsView.css";
import Paper from "@material-ui/core/es/Paper/Paper";
import {CharacterDataStore} from "../stores/CharacterDataStore";
import Typography from "@material-ui/core/es/Typography/Typography";

interface ISelectedCardsViewProps {
    characterDataStore?: CharacterDataStore;
}

@inject("characterDataStore")
@observer
class SelectedCardsView extends Component<ISelectedCardsViewProps> {

    public render() {
        const store = this.props.characterDataStore!!;
        return (
            <Paper style={{marginTop: "1rem"}}>
                <Typography variant={"h6"}>
                    {`Card count: ${store.selectedCards.length} / ${store.currentCharacter && store.currentCharacter!!.numOfCards}`}
                </Typography>

                {store.selectedCards.length === 0 && <Typography>No Cards Selected</Typography>}
                {store.selectedCards.map(card => (
                    <img
                        src={card.imgUrl}
                        key={card.name}
                        alt={card.name}
                        onClick={store.toggleToFromScenarioDeck}
                        style={{display: "inline", width: "12rem"}}
                    />
                ))}
            </Paper>
        );
    }
}

export default SelectedCardsView;