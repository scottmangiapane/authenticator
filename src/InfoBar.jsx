/*global chrome*/

import EditIcon from './icons/EditIcon';

function InfoBar() {
  const manifest = chrome?.runtime?.getManifest();

  return (
    <div id='info-bar' className='p-sm row'>
      <p className='m-sm-x one-line row-fill-x'>
        { manifest && manifest?.name + ' v' + manifest?.version }
      </p>
      <EditIcon className='btn-icon m-sm-x' />
    </div>
  );
}

export default InfoBar;
