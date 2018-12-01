import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import "./AllCardsView.css";
import {CharacterDataStore} from "../stores/CharacterDataStore";
import Tab from "@material-ui/core/es/Tab/Tab";
import Tabs from "@material-ui/core/es/Tabs/Tabs";
import {CharacterTypes} from "../models/Character";
import {CharacterIcons} from "./icons/Icons";

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
                    CharacterIcons.map((icon, i) => {
                        return (<Tab style={{minWidth: "3rem"}} icon={icon} key={i}/>);
                    })
                }
            </Tabs>
        );
    }
}

export default CharacterSelection;