import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import "./AllCardsView.css";
import Paper from "@material-ui/core/es/Paper/Paper";
import Slider from '@material-ui/lab/Slider';
import {CharacterDataStore} from "../stores/CharacterDataStore";
import Spinner from "./Spinner";
import {ApiService} from "../services/ApiService";
import Typography from "@material-ui/core/es/Typography/Typography";

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
            <React.Fragment>
                <Paper style={{margin: "1rem", padding: "1rem"}}>
                    <Typography id="level-slider-label">Level {store.level}</Typography>
                    <Slider
                        aria-labelledby="level-slider-label"
                        value={store.level}
                        min={1}
                        max={9}
                        step={1}
                        onChange={store.changeLevel}
                        style={{padding: "1rem", width: "12rem"}}
                    />
                </Paper>
                <Paper>
                    {store.availableCards.map(card => {
                        return (
                            <img
                                src={card.imgUrl}
                                key={card.name}
                                alt={card.name}
                                onClick={store.toggleSelect}
                                onError={() => {
                                    card.imgUrl = ApiService.defaultCardUrl
                                }}
                                style={{display: "inline", width: "10rem"}}
                                className={card.selected ? "card-selected" : ""}
                            />
                        );
                    })}
                </Paper>
            </React.Fragment>

        );
    }
}

export default AllCardsView;