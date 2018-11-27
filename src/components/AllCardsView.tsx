import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {CharacterDataStore} from "../stores/CharacterDataStore";
import {ApiService} from "../services/ApiService";
import "./AllCardsView.css";
import Paper from "@material-ui/core/es/Paper/Paper";
import Spinner from "./Spinner";
import Typography from "@material-ui/core/es/Typography/Typography";
import CharacterSelection from "./CharacterSelection";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import SwapVertIcon from '@material-ui/icons/SwapVert';
import {Card} from "../models/Card";

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
        return (
            <React.Fragment>
                <Paper style={{margin: "1rem", padding: "1rem"}}>
                    <Typography variant={"body1"}>Level {store.level}
                        <input
                            type="range"
                            value={store.level}
                            min={1}
                            max={9}
                            step={1}
                            onChange={store.changeLevel}
                            style={{width: "15rem", height: "1rem"}}
                        />
                    </Typography>
                    <CharacterSelection/>
                </Paper>
                <Paper>
                    {!store.finished ? <Spinner/> :
                        store.availableCards.map(card => {
                            const cardInScenarioDeck = card.inScenarioDeck ? "card-in-scenario-deck" : "";
                            const cardInPlayerDeck = card.inPlayerDeck ? "card-in-player-deck" : "";
                            const cardImageClasses = `card-image ${cardInPlayerDeck} ${cardInScenarioDeck}`;
                            return (
                                <div key={card.name} className={"card"}>
                                    <img
                                        src={card.imgUrl}
                                        alt={card.name}
                                        onClick={store.toggleToFromScenarioDeck}
                                        onError={() => {
                                            card.imgUrl = ApiService.defaultCardUrl(store.selectedCharacter)
                                        }}
                                        className={cardImageClasses}
                                    />
                                    <IconButton
                                        onClick={(evt) => store.toggleToFromPlayerDeck(evt, card.name)}
                                        className={"card-to-from-player-deck"}
                                        aria-label="Toggle to-from player deck"
                                        style={{display: Card.alwaysInPlayerDeck(card) ? "none": "initial"}}
                                    >
                                        <SwapVertIcon/>
                                    </IconButton>
                                </div>
                            );
                        })}
                </Paper>
            </React.Fragment>

        );
    }
}

export default AllCardsView;