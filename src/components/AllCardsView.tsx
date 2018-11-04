import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {CharacterDataStore} from "../stores/CharacterDataStore";
import {ApiService} from "../services/ApiService";
import "./AllCardsView.css";
import Paper from "@material-ui/core/es/Paper/Paper";
import Spinner from "./Spinner";
import Typography from "@material-ui/core/es/Typography/Typography";
import Button from "@material-ui/core/es/Button/Button";

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
                    <Button onClick={() => store.setSelectedCharacter("cragheart")}>Cragheart</Button>
                    <Button onClick={() => store.setSelectedCharacter("elementalist")}>Elementalist</Button>
                    <Button onClick={() => store.setSelectedCharacter("plagueherald")}>Plagueherald</Button>
                    <Button onClick={() => store.setSelectedCharacter("quartermaster")}>Quartermaster</Button>
                    <Button onClick={() => store.setSelectedCharacter("scoundrel")}>Scoundrel</Button>
                    <Typography>Level {store.level}</Typography>
                    <input
                        type="range"
                        value={store.level}
                        min={1}
                        max={9}
                        step={1}
                        onChange={store.changeLevel}
                        style={{width: "15rem", height: "1rem"}}
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
                                    card.imgUrl = ApiService.defaultCardUrl()
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