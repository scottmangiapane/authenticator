import { createContext, useEffect, useReducer } from 'react';

import CardList from './CardList';
import ConfigEditor from './ConfigEditor';
import InfoBar from './InfoBar';
import Spinner from './Spinner';

import './App.css';
import { get } from './utils/storage';

export const AppContext = createContext();

function App() {
    const exampleConfig = '[\n'
    + '  {\n'
    + '    "name": "Example",\n'
    + '    "secret": "JBSWY3DPEHPK3PXP",\n'
    + '    "auto-fill": [\n'
    + '      "example.com"\n'
    + '    ]\n'
    + '  }\n'
    + ']\n';

    const [state, dispatch] = useReducer(appReducer, {
        config: exampleConfig,
        copyExpiration: null,
        editMode: false,
        isConfigLoading: true
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
            case 'CONFIG_LOADED':
                return { ...state, isConfigLoading: false };
            case 'CONFIG_LOADING':
                return { ...state, isConfigLoading: true };
            case 'TOGGLE_EDIT_MODE':
                return { ...state, editMode: !state.editMode };
            case 'UPDATE_CONFIG':
                return { ...state, config: action?.data };
            default:
                return state;
        }
    }

    useEffect(() => {
        get('config', exampleConfig).then((config) => {
            dispatch({ type: 'UPDATE_CONFIG', data: config });
            dispatch('CONFIG_LOADED');
        });
    }, [exampleConfig]);

    const content = (state.isConfigLoading)
        ? <Spinner className='m-md' size='16px' />
        : <>
            { (state.editMode) ? <ConfigEditor /> : <CardList /> }
            <div className='hr'></div>
            <InfoBar />
        </>;

    return (
        <div id='app'>
            <AppContext.Provider value={{ state, dispatch }}>
                { content }
            </AppContext.Provider>
        </div>
    );
}

export default App;
