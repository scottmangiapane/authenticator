import { createRef, useContext, useEffect } from 'react';

import { AppContext } from './App';

import './ConfigEditor.css';

function ConfigEditor() {
    const editorRef = createRef();
    const { state, dispatch } = useContext(AppContext);

    useEffect(() => {
        const end = editorRef.current.value.length;
        editorRef.current.setSelectionRange(end, end);
        editorRef.current.blur();
        editorRef.current.focus();
    }, []);

    function onBlur() {
        editorRef.current.focus();
    }

    function onInput(event) {
        const sanitized = event.target.value.replaceAll('\u00a0', ' ');
        dispatch({ type: 'UPDATE_CONFIG', data: sanitized });
    }

    const exampleConfig = '[\n'
        + '  {\n'
        + '    "name": "Example"\n'
        + '    "secret": "JBSWY3DPEHPK3PXP"\n'
        + '  }\n'
        + ']\n';

    return (
        <textarea
            ref={ editorRef }
            autoFocus
            className='editor p-md'
            defaultValue={ exampleConfig }
            onBlur={ onBlur }
            onInput={ onInput }
            spellCheck='false'
            // value={ state.config }
            />
    );
}

export default ConfigEditor;
