/*global chrome*/

import EditIcon from './icons/EditIcon';

import './InfoBar.css';

function InfoBar() {
  const manifest = chrome?.runtime?.getManifest();

  return (
    <div id='info-bar' className='m-sm-x p-sm row'>
      <p className='one-line row-fill-x'>
        { manifest && manifest?.name + ' v' + manifest?.version }
      </p>
      <EditIcon className='btn-icon' />
    </div>
  );
}

export default InfoBar;
