import './Spinner.css';

function Spinner({ className, size }) {
    return (
        <div className='center wrapper'>
            <div
                className={ className + ' spinner' }
                style={{ height: size, width: size }}></div>
        </div>
    );
}

export default Spinner;
