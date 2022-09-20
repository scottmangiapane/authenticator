import { createRef, useContext } from 'react';

import { AppContext } from './App';

import './ConfigEditor.css';

function ConfigEditor() {
    const editorRef = createRef();
    const { state, dispatch } = useContext(AppContext);

    function onBlur() {
        editorRef.current.focus();
    }

    function onInput(event) {
        const sanitized = event.target.value.replaceAll('\u00a0', ' ');
        dispatch({ type: 'UPDATE_CONFIG', data: sanitized });
    }

    return (
        <textarea
            ref={ editorRef }
            autoFocus
            className='editor p-md'
            onBlur={ onBlur }
            onInput={ onInput }
            spellCheck='false'
            value={ state.config }
            />
    );
}

export default ConfigEditor;
