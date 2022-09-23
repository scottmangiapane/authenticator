/* global chrome */

import { createRef, useContext, useEffect, useState } from 'react';

import { AppContext } from './App';
import Spinner from './Spinner';

import './ConfigEditor.css';

function ConfigEditor() {
    const editorRef = createRef();
    const { state, dispatch } = useContext(AppContext);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        chrome.runtime.sendMessage({ action: 'get-config' }, (config) => {
            dispatch({ type: 'SET_EDITED_CONFIG', data: config });
            setIsLoaded(true);
        });
    }, []);

    function onBlur() {
        editorRef.current.focus();
    }

    function onInput(event) {
        const sanitized = event.target.value.replaceAll('\u00a0', ' ');
        dispatch({ type: 'SET_EDITED_CONFIG', data: sanitized });
    }

    if (!isLoaded) {
        return <Spinner className='m-md' size='16px' />;
    }

    return (
        <textarea
            ref={ editorRef }
            autoFocus
            className='editor p-md'
            onBlur={ onBlur }
            onInput={ onInput }
            spellCheck='false'
            value={ state.editedConfig }
            />
    );
}

export default ConfigEditor;
