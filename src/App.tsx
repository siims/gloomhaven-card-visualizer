import React, {Component} from 'react';
import 'typeface-roboto';
import {MuiThemeProvider} from "@material-ui/core/es";
import {Provider} from "mobx-react";
import {createMuiTheme} from "@material-ui/core";
import CssBaseline from "@material-ui/core/es/CssBaseline/CssBaseline";
import {CharacterDataStore} from "./stores/CharacterDataStore";
import AllCardsView from "./components/AllCardsView";
import SelectedCardsView from "./components/SelectedCardsView";
import {LocalStorageService} from "./services/LocalStorageService";

const localStoreService = new LocalStorageService();
const characterDataStore = new CharacterDataStore(localStoreService);
const theme = createMuiTheme({
    typography: {
        useNextVariants: true
    }
});

class App extends Component {
    public render() {
        return (
            <Provider characterDataStore={characterDataStore} localStoreService={localStoreService}>
                <MuiThemeProvider theme={theme}>
                    <CssBaseline/>
                    <AllCardsView />
                    <SelectedCardsView />
                </MuiThemeProvider>
            </Provider>
        );
    }
}

export default App;
