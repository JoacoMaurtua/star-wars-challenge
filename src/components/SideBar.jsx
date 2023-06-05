import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PersonCell from './PersonCell';
import LoadingCell from './LoadingCell';
import NoticeCell from './NoticeCell';

const SideBar = ({ onSelect }) => {
    const [people, setPeople] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState(null); 

    useEffect(() => {
        setLoading(true);
        const getData = async () => {
            const { data } = await axios.get('https://swapi.dev/api/people/'); //Absorción del endpoint principal de Star Wars
            try {
                const peopleWithDetails = await Promise.all( //Como algunos campos de cada objeto personaje son arreglos que contienen otros endpoint, utilizo Promise.all para manejar otras llamadas simultaneamente
                    data.results.map(async (person) => {
                        const homeworldResponse = await axios.get(person.homeworld);
                        let speciesName = 'Unspecified';  //Asumo que cada personaje tiene por lo menos una especie en el API, caso contrario coloco unknown
                        let vehicleNames = ['Unspecified']; //Asumo que cada personaje tiene por lo menos un vehiculo en el API, caso contrario coloco unknown

                        if (person.species.length > 0) {
                            const speciesResponse = await axios.get(person.species[0]); 
                            speciesName = speciesResponse.data.name;
                        }

                        if (person.vehicles.length > 0) {
                            const vehicleResponses = await Promise.all(person.vehicles.map((vehicleURL) => axios.get(vehicleURL))); //Aqui mapeo sobre todas las URL de los vehículos y realizo una llamada API para cada una
                            vehicleNames = vehicleResponses.map((response) => response.data.name); // Mapeo sobre las respuestas para extraer los nombres de los vehículos.
                        }

                        return {
                            ...person,
                            homeworld: homeworldResponse.data.name,
                            species: speciesName,
                            vehicles: vehicleNames,
                        };
                    })
                );
                setPeople(peopleWithDetails);
                setLoading(false);
            } catch (err) {
                setError(true);
                setLoading(false);
            }
        };
        getData();
    }, []);

    if (loading) {
        return <LoadingCell />;
    }

    if (error) {
        return <NoticeCell />;
    }

    return (
        <div>
            {people.map((person) => (
                <PersonCell key={person.name} person={person} onSelect={onSelect} />
            ))}
        </div>
    );
};

export default SideBar;
