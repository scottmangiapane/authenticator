import { createContext, useReducer } from 'react';

import CardList from './CardList';
import ConfigEditor from './ConfigEditor';
import InfoBar from './InfoBar';

import './App.css';

export const AppContext = createContext();

function App() {
    const [state, dispatch] = useReducer(appReducer, {
        copyExpiration: null,
        editedConfig: null,
        editMode: false
    });

    function appReducer(state, action) {
        switch (action?.type || action) {
            case 'CHECK_COPIED':
                if ((new Date()).getTime() >= state.copyExpiration) {
                    return { ...state, copyExpiration: null };
                }
                return state;
            case 'SET_COPIED':
                const duration = 1600;
                setTimeout(() => dispatch('CHECK_COPIED'), duration);
                return { ...state, copyExpiration: (new Date()).getTime() + duration };
            case 'SET_EDITED_CONFIG':
                return { ...state, editedConfig: action?.data };
            case 'TOGGLE_EDIT_MODE':
                return { ...state, editMode: !state.editMode };
            default:
                return state;
        }
    }

    return (
        <div id='app'>
            <AppContext.Provider value={{ state, dispatch }}>
                { (state.editMode) ? <ConfigEditor /> : <CardList /> }
                <div className='hr'></div>
                <InfoBar />
            </AppContext.Provider>
        </div>
    );
}

export default App;
