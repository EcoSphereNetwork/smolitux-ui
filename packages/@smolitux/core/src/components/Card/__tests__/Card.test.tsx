import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  it('renders correctly with default props', () => {
    render(
      <Card>
        <div>Card Content</div>
      </Card>
    );
    
    expect(screen.getByText('Card Content')).toBeInTheDocument();
    const card = screen.getByText('Card Content').closest('.card');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('card');
  });

  it('renders with title when provided', () => {
    render(
      <Card title="Card Title">
        <div>Card Content</div>
      </Card>
    );
    
    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Card Content')).toBeInTheDocument();
    
    const titleElement = screen.getByText('Card Title');
    expect(titleElement).toHaveClass('card-title');
  });

  it('renders with subtitle when provided', () => {
    render(
      <Card title="Card Title" subtitle="Card Subtitle">
        <div>Card Content</div>
      </Card>
    );
    
    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Card Subtitle')).toBeInTheDocument();
    expect(screen.getByText('Card Content')).toBeInTheDocument();
    
    const subtitleElement = screen.getByText('Card Subtitle');
    expect(subtitleElement).toHaveClass('card-subtitle');
  });

  it('renders with custom className', () => {
    render(
      <Card className="custom-card">
        <div>Card Content</div>
      </Card>
    );
    
    const card = screen.getByText('Card Content').closest('.card');
    expect(card).toHaveClass('custom-card');
  });

  it('renders with custom style', () => {
    const customStyle = { backgroundColor: 'lightblue', padding: '20px' };
    render(
      <Card style={customStyle}>
        <div>Card Content</div>
      </Card>
    );
    
    const card = screen.getByText('Card Content').closest('.card');
    expect(card).toHaveStyle('background-color: lightblue');
    expect(card).toHaveStyle('padding: 20px');
  });

  it('renders with different variants', () => {
    const { rerender } = render(
      <Card variant="default">
        <div>Default Card</div>
      </Card>
    );
    
    let card = screen.getByText('Default Card').closest('.card');
    expect(card).toHaveClass('card-default');
    
    rerender(
      <Card variant="outlined">
        <div>Outlined Card</div>
      </Card>
    );
    
    card = screen.getByText('Outlined Card').closest('.card');
    expect(card).toHaveClass('card-outlined');
    
    rerender(
      <Card variant="elevated">
        <div>Elevated Card</div>
      </Card>
    );
    
    card = screen.getByText('Elevated Card').closest('.card');
    expect(card).toHaveClass('card-elevated');
  });

  it('renders with header when provided', () => {
    render(
      <Card
        header={<div data-testid="card-header">Custom Header</div>}
      >
        <div>Card Content</div>
      </Card>
    );
    
    expect(screen.getByTestId('card-header')).toBeInTheDocument();
    expect(screen.getByText('Custom Header')).toBeInTheDocument();
    expect(screen.getByText('Card Content')).toBeInTheDocument();
    
    const headerElement = screen.getByTestId('card-header');
    expect(headerElement.closest('.card-header')).toBeInTheDocument();
  });

  it('renders with footer when provided', () => {
    render(
      <Card
        footer={<div data-testid="card-footer">Custom Footer</div>}
      >
        <div>Card Content</div>
      </Card>
    );
    
    expect(screen.getByTestId('card-footer')).toBeInTheDocument();
    expect(screen.getByText('Custom Footer')).toBeInTheDocument();
    expect(screen.getByText('Card Content')).toBeInTheDocument();
    
    const footerElement = screen.getByTestId('card-footer');
    expect(footerElement.closest('.card-footer')).toBeInTheDocument();
  });

  it('renders with image when provided', () => {
    render(
      <Card
        image={<img src="card-image.jpg" alt="Card Image" data-testid="card-image" />}
      >
        <div>Card Content</div>
      </Card>
    );
    
    expect(screen.getByTestId('card-image')).toBeInTheDocument();
    expect(screen.getByAlt('Card Image')).toBeInTheDocument();
    expect(screen.getByText('Card Content')).toBeInTheDocument();
    
    const imageElement = screen.getByTestId('card-image');
    expect(imageElement.closest('.card-image')).toBeInTheDocument();
  });

  it('renders with different sizes', () => {
    const { rerender } = render(
      <Card size="sm">
        <div>Small Card</div>
      </Card>
    );
    
    let card = screen.getByText('Small Card').closest('.card');
    expect(card).toHaveClass('card-sm');
    
    rerender(
      <Card size="md">
        <div>Medium Card</div>
      </Card>
    );
    
    card = screen.getByText('Medium Card').closest('.card');
    expect(card).toHaveClass('card-md');
    
    rerender(
      <Card size="lg">
        <div>Large Card</div>
      </Card>
    );
    
    card = screen.getByText('Large Card').closest('.card');
    expect(card).toHaveClass('card-lg');
  });

  it('renders with hover effect when hoverable is true', () => {
    render(
      <Card hoverable>
        <div>Hoverable Card</div>
      </Card>
    );
    
    const card = screen.getByText('Hoverable Card').closest('.card');
    expect(card).toHaveClass('card-hoverable');
  });

  it('renders with clickable style when onClick is provided', () => {
    const handleClick = jest.fn();
    render(
      <Card onClick={handleClick}>
        <div>Clickable Card</div>
      </Card>
    );
    
    const card = screen.getByText('Clickable Card').closest('.card');
    expect(card).toHaveClass('card-clickable');
  });

  it('renders with border when bordered is true', () => {
    render(
      <Card bordered>
        <div>Bordered Card</div>
      </Card>
    );
    
    const card = screen.getByText('Bordered Card').closest('.card');
    expect(card).toHaveClass('card-bordered');
  });

  it('renders with shadow when shadow is true', () => {
    render(
      <Card shadow>
        <div>Shadow Card</div>
      </Card>
    );
    
    const card = screen.getByText('Shadow Card').closest('.card');
    expect(card).toHaveClass('card-shadow');
  });

  it('renders with rounded corners when rounded is true', () => {
    render(
      <Card rounded>
        <div>Rounded Card</div>
      </Card>
    );
    
    const card = screen.getByText('Rounded Card').closest('.card');
    expect(card).toHaveClass('card-rounded');
  });

  it('renders with custom width when width is provided', () => {
    render(
      <Card width="300px">
        <div>Custom Width Card</div>
      </Card>
    );
    
    const card = screen.getByText('Custom Width Card').closest('.card');
    expect(card).toHaveStyle('width: 300px');
  });

  it('renders with custom height when height is provided', () => {
    render(
      <Card height="200px">
        <div>Custom Height Card</div>
      </Card>
    );
    
    const card = screen.getByText('Custom Height Card').closest('.card');
    expect(card).toHaveStyle('height: 200px');
  });

  it('renders with custom padding when padding is provided', () => {
    render(
      <Card padding="30px">
        <div>Custom Padding Card</div>
      </Card>
    );
    
    const card = screen.getByText('Custom Padding Card').closest('.card');
    expect(card).toHaveStyle('padding: 30px');
  });

  it('renders with custom background color when bgColor is provided', () => {
    render(
      <Card bgColor="#f0f0f0">
        <div>Custom Background Card</div>
      </Card>
    );
    
    const card = screen.getByText('Custom Background Card').closest('.card');
    expect(card).toHaveStyle('background-color: #f0f0f0');
  });
});