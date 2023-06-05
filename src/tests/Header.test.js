import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../components/Header';
import { useMediaQuery } from 'react-responsive';
import '@testing-library/jest-dom';

jest.mock('react-responsive', () => ({
  useMediaQuery: jest.fn(),
}));


describe('Header component', () => {
  /*TEST 1: Verifica que el título "Ravn Star Wars Registry" se renderice correctamente cuando isDetailView es falso. */
  test('renders title correctly', () => {
    render(<Header isDetailView={false} />);
    const titleElement = screen.getByText(/Ravn Star Wars Registry/i);
    expect(titleElement).toBeInTheDocument();
  });

  /*TEST 2: Verifica que el botón de retroceso se renderice cuando isDetailView es verdadero.*/
  test('renders back button when isDetailView is true', () => {
    // Mockea useMediaQuery para devolver true
    useMediaQuery.mockImplementation(() => true);

    render(<Header isDetailView={true} />);
    const backButtonElement = screen.getByRole('button', { name: /back/i });
    expect(backButtonElement).toBeInTheDocument();
  });

  /*TEST 3: Simula un clic en el botón de retroceso y verifica que se llame correctamente a la función onBack cuando se hace clic en el botón.*/
  test('calls onBack callback when back button is clicked', () => {
    const mockOnBack = jest.fn();

    // Mockea useMediaQuery para devolver true
    useMediaQuery.mockImplementation(() => true);

    render(<Header isDetailView={true} onBack={mockOnBack} />);
    const backButtonElement = screen.getByRole('button', { name: /back/i });
    fireEvent.click(backButtonElement);
    expect(mockOnBack).toHaveBeenCalled();
  });
});

