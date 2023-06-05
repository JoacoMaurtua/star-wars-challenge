import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';

const PersonCell = ({ person, onSelect }) => {
    const { name, species, homeworld } = person;
    return (
        <div
            style={{
                borderRadius: '4px',
                margin: '10px 0',
                padding: '10px 16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer',
                borderBottom: '1.5px solid #c2c0c0'
            }}
            onClick={() => onSelect(person)}
        >
            <div style={{ marginRight: '10px' }}>
                <h2 style={{ margin: 0, fontSize: '19px', fontWeight:'bolder', marginBottom: '4px' }}>{name}</h2>
                <p style={{ margin: 0, color: '#828282', fontSize: '16px', marginTop: '2px' }}>
                    {species} from {homeworld}
                </p>
            </div>
            <IoIosArrowForward size={20} />
        </div>
    );
};

export default PersonCell;