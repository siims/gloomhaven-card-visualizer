import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import "./AllCardsView.css";
import {CharacterDataStore} from "../stores/CharacterDataStore";
import Tab from "@material-ui/core/es/Tab/Tab";
import Tabs from "@material-ui/core/es/Tabs/Tabs";
import {CharacterTypes} from "../models/Character";

interface ICharacterSelectionProps {
    characterDataStore?: CharacterDataStore;
}

@inject("characterDataStore")
@observer
class CharacterSelection extends Component<ICharacterSelectionProps> {

    public render() {
        const store = this.props.characterDataStore!!;
        return (
            <Tabs
                value={CharacterTypes.indexOf(store.selectedCharacter)}
                onChange={(_, newCharacter) => {
                    store.setSelectedCharacter(CharacterTypes[newCharacter]);
                }}
                indicatorColor="primary"
                textColor="primary"
                fullWidth
            >
                {
                    CharacterTypes.map((characterType, i) => {
                        return <Tab label={characterType} key={i}/>
                    })
                }
            </Tabs>
        );
    }
}

export default CharacterSelection;