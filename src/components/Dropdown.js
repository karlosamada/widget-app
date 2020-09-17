import React, {useState, useEffect, useRef} from 'react';

const Dropdown = ({label, options, selected, onSelectedChange, displayLabel}) => {

    const [open, setOpen] = useState(false);
    const ref = useRef();

    useEffect(() => {
        const onBodyClick = (event) => {
            if (ref.current.contains(event.target)) 
                return;

            setOpen(false)
        }

        return () => {
            document.body.removeEventListener('click', onBodyClick);
        }

    }, []);
    
    const renderedOptions = options.map((option) => {
        if (option.value === selected.value) {
            return null
        }
    
        return (
                <div onClick={() => onSelectedChange(option)} key={option.value} className="item">
                    {option.label}
                </div>
            
        );
    });

    return (
        <div>
            <div ref={ref} className="ui form">
                <div className="field">
                    <label className="label">{label}</label>
                    <div 
                        onClick={() => setOpen(!open)}
                        className={`ui selection dropdown ${open ? 'visible active' : ''}`}
                    >
                        <i className="dropdown icon"></i>
                        <div className="text">
                            {selected.label}
                        </div>
                        <div
                            onClick={() => setOpen(!open)}
                            className={`menu ${open ? 'visible transition' : ''}`}
                        >
                            {renderedOptions}
                        </div>
                    </div>
                </div>
            </div>
            {
                displayLabel ? 
                <div style={{padding: '10px'}}>
                    <a href="/" className={`ui ${selected.value} label`}>{selected.value}</a>
                </div>
                : null
            }
        </div>
        
    );
}

export default Dropdown;