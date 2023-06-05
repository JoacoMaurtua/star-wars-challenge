import React from 'react';
import { BsArrowRightShort } from 'react-icons/bs';

const PersonCell = ({ person, onSelect }) => {
    const { name, species, homeworld } = person; //Esto va a provenir de otra llamada a otros endpoints
    return (
        <div
            style={{
                border: '1px solid gray',
                borderRadius: '5px',
                margin: '10px 0',
                padding: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer',
            }}
        >
            <div>
                <h2 style={{ margin: 0 }}>{name}</h2>
                <p style={{ margin: 0 }}>
                    {species} from {homeworld}
                </p>
            </div>
            <BsArrowRightShort size={30} onClick={() => onSelect(person)}/>
        </div>
    );
};

export default PersonCell;
