/* global chrome */

import { useContext } from 'react';

import { AppContext } from './App';
import EditIcon from './icons/EditIcon';
import SaveIcon from './icons/SaveIcon';

function InfoBar() {
    const { dispatch, state } = useContext(AppContext);

    function handleClick() {
        if (state.editMode) {
            // TODO how to get editor contents since they're not in global state?
            chrome.runtime.sendMessage({ action: 'set-config', request: null });
        }
        dispatch('TOGGLE_EDIT_MODE');
    }

    const copied = <span className='text-green'>Copied</span>;

    const manifest = chrome?.runtime?.getManifest();
    const versionInfo = manifest && manifest?.name + ' v' + manifest?.version;

    const icon = (state.editMode)
        ? <SaveIcon className='btn-icon' />
        : <EditIcon className='btn-icon' />;

    return (
        <div id='info-bar' className='p-sm row'>
            <p className='m-sm-x one-line row-fill-x'>
                { state.copyExpiration ? copied : versionInfo}
            </p>
            <p className='m-sm-x' onClick={ handleClick }>{ icon }</p>
        </div>
    );
}

export default InfoBar;
