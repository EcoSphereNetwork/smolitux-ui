import React from 'react';
import { render } from '@testing-library/react';
import { Accordion, AccordionItem } from '../';

describe('Accordion Snapshots', () => {
  it('renders default accordion correctly', () => {
    const { asFragment } = render(
      <Accordion>
        <AccordionItem title="Section 1">Content 1</AccordionItem>
        <AccordionItem title="Section 2">Content 2</AccordionItem>
      </Accordion>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with defaultIndex correctly', () => {
    const { asFragment } = render(
      <Accordion defaultIndex={[0]}>
        <AccordionItem title="Section 1">Content 1</AccordionItem>
        <AccordionItem title="Section 2">Content 2</AccordionItem>
      </Accordion>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with allowMultiple correctly', () => {
    const { asFragment } = render(
      <Accordion allowMultiple defaultIndex={[0, 1]}>
        <AccordionItem title="Section 1">Content 1</AccordionItem>
        <AccordionItem title="Section 2">Content 2</AccordionItem>
      </Accordion>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with disabled item correctly', () => {
    const { asFragment } = render(
      <Accordion>
        <AccordionItem title="Section 1">Content 1</AccordionItem>
        <AccordionItem title="Section 2" isDisabled>Content 2</AccordionItem>
      </Accordion>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with custom icon correctly', () => {
    const { asFragment } = render(
      <Accordion>
        <AccordionItem 
          title="Section 1" 
          icon={<span>+</span>}
        >
          Content 1
        </AccordionItem>
      </Accordion>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with different variants correctly', () => {
    const { asFragment } = render(
      <>
        <Accordion variant="outline">
          <AccordionItem title="Outline Variant">Content</AccordionItem>
        </Accordion>
        <Accordion variant="filled">
          <AccordionItem title="Filled Variant">Content</AccordionItem>
        </Accordion>
        <Accordion variant="unstyled">
          <AccordionItem title="Unstyled Variant">Content</AccordionItem>
        </Accordion>
      </>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});