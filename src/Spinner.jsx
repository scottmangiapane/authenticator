import './Spinner.css';

function Spinner({ className, size }) {
    return <div
        className={ className + ' spinner' }
        style={{ height: size, width: size }}></div>;
}

export default Spinner;
