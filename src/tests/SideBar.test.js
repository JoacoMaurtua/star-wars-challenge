import React from 'react';
import axios from 'axios';
import { render, waitFor, screen } from '@testing-library/react';
import SideBar from '../components/SideBar';
import '@testing-library/jest-dom';

jest.mock('axios');

describe('SideBar component', () => {
  /* After each test, we clear all the mocks, this helps us to make sure 
   that there's no spill over state from one test to another */
  afterEach(() => {
    jest.clearAllMocks();
  });

  /*TEST 1: Verifica si el componente SideBar se renderiza correctamente cuando está en estado de carga. 
  Utiliza el spinner de carga como indicador del estado de carga.*/
  test('renders loading state', async () => {
    // Iniciar con la suposición de que una API está en proceso
    axios.get.mockResolvedValue({});

    render(<SideBar />);

    // Verificar si el elemento de carga está presente
    const loadingElement = screen.getByTestId('loading-cell');
    expect(loadingElement).toBeInTheDocument();
  });

  /*TEST 2: Verifica si el componente SideBar se renderiza correctamente cuando se encuentra un error al obtener los datos. 
  Utiliza el mensaje de error como indicador del estado de error.*/
  test('renders error state', async () => {
    // Suponemos que hay un error en la API
    axios.get.mockRejectedValue(new Error('Error fetching people data'));

    render(<SideBar />);

    // Esperamos que el componente NoticeCell se muestre después de que se produce un error
    await waitFor(() => {
      const noticeElement = screen.getByTestId('notice-cell');
      expect(noticeElement).toBeInTheDocument();
    });
  });

  /*TEST 3: Verifica si el componente SideBar se renderiza correctamente cuando los datos se obtienen con éxito.
  Utiliza el nombre de la primera persona en los datos como indicador del estado de éxito.*/
  test('renders success state', async () => {
    // Suponemos que los datos se devuelven correctamente desde la API
    const mockData = {
      data: {
        results: [
          {
            name: 'Luke Skywalker',
            homeworld: 'https://swapi.dev/api/planets/1/',
            species: [],
            vehicles: [],
          },
        ],
      },
    };
    // Resolvemos las llamadas adicionales
    axios.get.mockResolvedValueOnce(mockData);
    axios.get.mockResolvedValueOnce({ data: { name: 'Tatooine' } });
    axios.get.mockResolvedValueOnce({ data: { name: 'Unspecified species' } });
    axios.get.mockResolvedValueOnce({ data: { name: 'Unspecified vehicles' } });

    render(<SideBar />);

    // Esperamos que el componente PersonCell se muestre después de que se produzca una respuesta exitosa
    await waitFor(() => {
      const personElement = screen.getByText(/Luke Skywalker/i);
      expect(personElement).toBeInTheDocument();
    });
  });
});