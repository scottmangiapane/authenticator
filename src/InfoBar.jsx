/* global chrome */

import { useContext } from 'react';

import { AppContext } from './App';
import EditIcon from './icons/EditIcon';
import SaveIcon from './icons/SaveIcon';

import { set } from './utils/storage';

function InfoBar() {
    const { dispatch, state } = useContext(AppContext);

    function handleClick() {
        if (state.editMode) {
            dispatch('CONFIG_LOADING');
            set('config', state.config).then(() => {
                dispatch('CONFIG_LOADED');
            });
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
