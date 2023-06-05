import React from 'react';
import SectionHeader from './SectionHeader';
import DataCell from './DataCell';

const PersonDetail = ({ person }) => {
    const { eye_color, hair_color, skin_color, birth_year, vehicles } = person;

    return (
        <div>
            <SectionHeader title="General Information" />

            <DataCell label="Eye Color" value={eye_color} />
            <DataCell label="Hair Color" value={hair_color} />
            <DataCell label="Skin Color" value={skin_color} />
            <DataCell label="Birth Year" value={birth_year} />

            <SectionHeader title="Vehicles" />

            {vehicles.map((vehicle) => (
                <DataCell key={vehicle} label="Vehicle" value={vehicle} />
            ))}

        </div>
    );
};

export default PersonDetail;
