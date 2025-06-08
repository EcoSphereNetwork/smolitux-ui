import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from '../Pagination';

describe('Pagination', () => {
  it('renders correctly with default props', () => {
    render(<Pagination pageCount={10} currentPage={1} onChange={jest.fn()} />);

    // Erste Seite sollte aktiv sein
    const page1Button = screen.getByText('1');
    expect(page1Button).toHaveAttribute('aria-current', 'page');

    // Prüfen, ob die Pfeile vorhanden sind
    expect(screen.getByTitle('Erste')).toBeInTheDocument();
    expect(screen.getByTitle('Zurück')).toBeInTheDocument();
    expect(screen.getByTitle('Weiter')).toBeInTheDocument();
    expect(screen.getByTitle('Letzte')).toBeInTheDocument();
  });

  it('calls onChange when a page is clicked', () => {
    const handleChange = jest.fn();
    render(<Pagination pageCount={10} currentPage={1} onChange={handleChange} />);

    // Klick auf Seite 3
    fireEvent.click(screen.getByText('3'));

    expect(handleChange).toHaveBeenCalledWith(3);
  });

  it('disables previous and first buttons on first page', () => {
    render(<Pagination pageCount={10} currentPage={1} onChange={jest.fn()} />);

    const firstButton = screen.getByTitle('Erste');
    const prevButton = screen.getByTitle('Zurück');

    expect(firstButton).toBeDisabled();
    expect(prevButton).toBeDisabled();

    const nextButton = screen.getByTitle('Weiter');
    const lastButton = screen.getByTitle('Letzte');

    expect(nextButton).not.toBeDisabled();
    expect(lastButton).not.toBeDisabled();
  });

  it('disables next and last buttons on last page', () => {
    render(<Pagination pageCount={10} currentPage={10} onChange={jest.fn()} />);

    const firstButton = screen.getByTitle('Erste');
    const prevButton = screen.getByTitle('Zurück');

    expect(firstButton).not.toBeDisabled();
    expect(prevButton).not.toBeDisabled();

    const nextButton = screen.getByTitle('Weiter');
    const lastButton = screen.getByTitle('Letzte');

    expect(nextButton).toBeDisabled();
    expect(lastButton).toBeDisabled();
  });

  it('renders with siblingCount prop', () => {
    render(<Pagination pageCount={10} currentPage={5} onChange={jest.fn()} siblingCount={2} />);

    // Mit siblingCount=2 sollten die Seiten 3, 4, 5, 6, 7 sichtbar sein
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
  });

  it('renders without first/last buttons when showFirstLast is false', () => {
    render(
      <Pagination pageCount={10} currentPage={5} onChange={jest.fn()} showFirstLast={false} />
    );

    expect(screen.queryByTitle('Erste')).not.toBeInTheDocument();
    expect(screen.queryByTitle('Letzte')).not.toBeInTheDocument();

    // Prev/Next sollten noch da sein
    expect(screen.getByTitle('Zurück')).toBeInTheDocument();
    expect(screen.getByTitle('Weiter')).toBeInTheDocument();
  });

  it('renders without prev/next buttons when showPrevNext is false', () => {
    render(<Pagination pageCount={10} currentPage={5} onChange={jest.fn()} showPrevNext={false} />);

    expect(screen.queryByTitle('Zurück')).not.toBeInTheDocument();
    expect(screen.queryByTitle('Weiter')).not.toBeInTheDocument();

    // First/Last sollten noch da sein
    expect(screen.getByTitle('Erste')).toBeInTheDocument();
    expect(screen.getByTitle('Letzte')).toBeInTheDocument();
  });

  it('renders with different sizes', () => {
    const { rerender } = render(
      <Pagination pageCount={10} currentPage={1} onChange={jest.fn()} size="sm" />
    );

    // Small size
    let buttons = screen.getAllByRole('button');
    expect(buttons[0]).toHaveClass('h-8');

    // Medium size
    rerender(<Pagination pageCount={10} currentPage={1} onChange={jest.fn()} size="md" />);

    buttons = screen.getAllByRole('button');
    expect(buttons[0]).toHaveClass('h-10');

    // Large size
    rerender(<Pagination pageCount={10} currentPage={1} onChange={jest.fn()} size="lg" />);

    buttons = screen.getAllByRole('button');
    expect(buttons[0]).toHaveClass('h-12');
  });

  it('renders with different variants', () => {
    const { rerender } = render(
      <Pagination pageCount={10} currentPage={1} onChange={jest.fn()} variant="outlined" />
    );

    // Outlined variant
    let buttons = screen.getAllByRole('button');
    expect(buttons[0]).toHaveClass('border');

    // Filled variant
    rerender(<Pagination pageCount={10} currentPage={1} onChange={jest.fn()} variant="filled" />);

    buttons = screen.getAllByRole('button');
    expect(buttons[0]).toHaveClass('bg-gray-200');

    // Simple variant
    rerender(<Pagination pageCount={10} currentPage={1} onChange={jest.fn()} variant="simple" />);

    buttons = screen.getAllByRole('button');
    expect(buttons[0]).toHaveClass('bg-transparent');
  });

  it('renders in disabled state', () => {
    render(<Pagination pageCount={10} currentPage={1} onChange={jest.fn()} disabled />);

    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      expect(button).toBeDisabled();
    });
  });

  it('shows page count when showPageCount is true', () => {
    render(<Pagination pageCount={10} currentPage={5} onChange={jest.fn()} showPageCount />);

    expect(screen.getByText('Seite 5 / 10')).toBeInTheDocument();
  });

  it('renders with custom labels', () => {
    render(
      <Pagination
        pageCount={10}
        currentPage={1}
        onChange={jest.fn()}
        labels={{
          previous: 'Vorherige',
          next: 'Nächste',
          first: 'Anfang',
          last: 'Ende',
          page: 'Seite',
        }}
        showPageCount
      />
    );

    expect(screen.getByTitle('Anfang')).toBeInTheDocument();
    expect(screen.getByTitle('Vorherige')).toBeInTheDocument();
    expect(screen.getByTitle('Nächste')).toBeInTheDocument();
    expect(screen.getByTitle('Ende')).toBeInTheDocument();
    expect(screen.getByText('Seite 1 / 10')).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    render(
      <Pagination
        pageCount={10}
        currentPage={1}
        onChange={jest.fn()}
        className="custom-pagination"
      />
    );

    const pagination = screen.getByRole('navigation');
    expect(pagination).toHaveClass('custom-pagination');
  });

  it('renders with custom style', () => {
    render(
      <Pagination
        pageCount={10}
        currentPage={1}
        onChange={jest.fn()}
        style={{ marginTop: '20px' }}
      />
    );

    const pagination = screen.getByRole('navigation');
    expect(pagination).toHaveStyle('margin-top: 20px');
  });
});
