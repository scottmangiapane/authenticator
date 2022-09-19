/*global chrome*/

import { useContext } from 'react';

import { AppContext } from './App';
import EditIcon from './icons/EditIcon';

function InfoBar() {
    const { state } = useContext(AppContext);

    const manifest = chrome?.runtime?.getManifest();
    const versionInfo = manifest && manifest?.name + ' v' + manifest?.version;

    const copied = (
        <span className='text-green'>Copied</span>
    );

    return (
        <div id='info-bar' className='p-sm row'>
            <p className='m-sm-x one-line row-fill-x'>
                { state.copyExpiration ? copied : versionInfo}
            </p>
            <EditIcon className='btn-icon m-sm-x' />
        </div>
    );
}

export default InfoBar;
