import { createContext, useReducer } from 'react';

import CardList from './CardList';
import InfoBar from './InfoBar';

import './App.css';

export const AppContext = createContext();

function App() {
  const initialState = { lastCopy: 0 };
  const [state, dispatch] = useReducer(appReducer, initialState);

  function appReducer(state, action) {
    switch (action.type) {
      case 'SET_COPIED':
        return { ...state, lastCopy: action.data }
      default:
        return initialState;
    }
  }

  return (
    <div id='app'>
      <AppContext.Provider value={{ state, dispatch }}>
        <CardList />
        <div className='hr'></div>
        <InfoBar />
      </AppContext.Provider>
    </div>
  );
}

export default App;
