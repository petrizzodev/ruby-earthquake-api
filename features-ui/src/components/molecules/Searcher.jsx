import React, { useState } from 'react';
import '../../index.css';

export default function Searcher({ setMagType }) {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        const lowercasedValue = e.target.value.toLowerCase();
        setInputValue(lowercasedValue);
        
        if (e.key === 'Enter') {
            handleSearchClick();
        }
    };

    const handleSearchClick = () => {
        const magTypes = inputValue.split(',').map(type => type.trim());
        setMagType(magTypes);
        setInputValue('');
    };

    return (
        <div className='input-group'>
            <input
                type='text'
                className='form-control'
                placeholder='Digita uno o más tipos de magnitud separados por comas'
                aria-label='MagType'
                aria-describedby='button-addon2'
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleInputChange}
            />
            <button
                className='btn btn-primary'
                type='button'
                id='button-addon2'
                onClick={handleSearchClick}
            >
                Buscar
            </button>
        </div>
    );
}