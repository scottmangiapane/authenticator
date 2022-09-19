import './Countdown.css';

function Countdown({ className, value }) {
  return (
    <div
      className={ 'countdown ' + className }
      style={{ '--size': '1.5em', '--value': value }}>
    </div>
  );
}

export default Countdown;
