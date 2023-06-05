import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PersonCell from './PersonCell';
import LoadingCell from './LoadingCell';
import NoticeCell from './NoticeCell';

/* NOTA: Aqui quiero aclarar que dentro de los personajes, hay algunos campos vacios en la API proporcionada, 
   por ejemplo, hay objetos cuyo campos species o vehicles no tienen ningun valor, y es por ello que en esos
   casos agregue el string ´Unspecified´*/

const SideBar = ({ onSelect }) => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      try {
        const { data } = await axios.get('https://swapi.dev/api/people/'); // Absorción del endpoint principal de Star Wars
        if (!data.results) { // Si hay un error en la carga general del endpoint
          throw new Error('Error fetching people data');
        }
        const peopleWithDetails = await Promise.all(
          // Como algunos campos de cada objeto personaje son arreglos que contienen otros endpoint, utilizo Promise.all para manejar otras llamadas simultaneamente
          data.results.map(async (person) => {
            const homeworldResponse = await axios.get(person.homeworld);
            let speciesName = 'Unspecified'; // Asumo que cada personaje tiene por lo menos una especie en el API, caso contrario coloco unknown
            let vehicleNames = ['Unspecified']; // Asumo que cada personaje tiene por lo menos un vehiculo en el API, caso contrario coloco unknown

            if (person.species.length > 0) {
              const speciesResponse = await axios.get(person.species[0]);
              speciesName = speciesResponse.data.name;
            }

            if (person.vehicles.length > 0) {
              const vehicleResponses = await Promise.all(person.vehicles.map((vehicleURL) => axios.get(vehicleURL))); // Aqui mapeo sobre todas las URL de los vehículos y realizo una llamada API para cada una
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
        console.log(err);
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
    <div style={{ borderRight: '1.5px solid #c2c0c0', marginTop: '0' }}>
      {people.map((person) => (
        <PersonCell key={person.name} person={person} onSelect={() => onSelect(person)} />
      ))}
    </div>
  );
};

export default SideBar;



