import React from 'react';
import renderer from 'react-test-renderer';
import { Modal } from '../Modal';

// Mock für createPortal
jest.mock('react-dom', () => {
  const originalModule = jest.requireActual('react-dom');
  return {
    ...originalModule,
    createPortal: (node: React.ReactNode) => node,
  };
});

describe('Modal Snapshots', () => {
  beforeAll(() => {
    jest.spyOn(Math, 'random').mockReturnValue(0.42);
  });

  afterAll(() => {
    (Math.random as jest.Mock).mockRestore();
  });
  test('renders correctly with default props', () => {
    const tree = renderer
      .create(
        <Modal isOpen={true} onClose={() => {}}>
          <p>Modal Content</p>
        </Modal>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with title', () => {
    const tree = renderer
      .create(
        <Modal isOpen={true} onClose={() => {}} title="Test Modal">
          <p>Modal Content</p>
        </Modal>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with footer', () => {
    const tree = renderer
      .create(
        <Modal isOpen={true} onClose={() => {}} title="Test Modal" footer={<button>Save</button>}>
          <p>Modal Content</p>
        </Modal>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with small size', () => {
    const tree = renderer
      .create(
        <Modal isOpen={true} onClose={() => {}} size="sm">
          <p>Small Modal</p>
        </Modal>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with large size', () => {
    const tree = renderer
      .create(
        <Modal isOpen={true} onClose={() => {}} size="lg">
          <p>Large Modal</p>
        </Modal>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with top position', () => {
    const tree = renderer
      .create(
        <Modal isOpen={true} onClose={() => {}} position="top">
          <p>Top Modal</p>
        </Modal>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with bottom position', () => {
    const tree = renderer
      .create(
        <Modal isOpen={true} onClose={() => {}} position="bottom">
          <p>Bottom Modal</p>
        </Modal>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly without close button', () => {
    const tree = renderer
      .create(
        <Modal isOpen={true} onClose={() => {}} showCloseButton={false}>
          <p>Modal without close button</p>
        </Modal>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with custom className', () => {
    const tree = renderer
      .create(
        <Modal isOpen={true} onClose={() => {}} className="custom-class">
          <p>Modal with custom class</p>
        </Modal>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with custom ID', () => {
    const tree = renderer
      .create(
        <Modal isOpen={true} onClose={() => {}} id="custom-modal-id">
          <p>Modal with custom ID</p>
        </Modal>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly without animation', () => {
    const tree = renderer
      .create(
        <Modal isOpen={true} onClose={() => {}} animated={false}>
          <p>Modal without animation</p>
        </Modal>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly without shadow', () => {
    const tree = renderer
      .create(
        <Modal isOpen={true} onClose={() => {}} shadow={false}>
          <p>Modal without shadow</p>
        </Modal>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly without rounded corners', () => {
    const tree = renderer
      .create(
        <Modal isOpen={true} onClose={() => {}} rounded={false}>
          <p>Modal without rounded corners</p>
        </Modal>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly without border', () => {
    const tree = renderer
      .create(
        <Modal isOpen={true} onClose={() => {}} bordered={false}>
          <p>Modal without border</p>
        </Modal>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with multiple props combined', () => {
    const tree = renderer
      .create(
        <Modal
          isOpen={true}
          onClose={() => {}}
          title="Combined Modal"
          footer={<button>Save</button>}
          size="lg"
          position="top"
          className="custom-class"
          headerClassName="header-class"
          bodyClassName="body-class"
          footerClassName="footer-class"
          id="combined-modal"
          animated={false}
          showCloseButton={true}
          shadow={true}
          rounded={true}
          bordered={true}
          scrollable={true}
        >
          <p>Modal with multiple props</p>
        </Modal>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
