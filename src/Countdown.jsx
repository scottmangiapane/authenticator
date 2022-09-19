import './Countdown.css';

function Countdown({ className, text, value }) {
  return (
    <div className='overlap'>
      <div
        className={ 'countdown ' + className }
        style={{ '--size': '2em', '--value': value }}>
      </div>
      <p className='center text-xs'>{ text }</p>
    </div>
  );
}

export default Countdown;
