import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Carousel } from '../Carousel';

const meta: Meta<typeof Carousel> = {
  title: 'Core/Media/Carousel',
  component: Carousel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    slides: {
      control: 'array',
      description: 'Die Slides, die im Carousel angezeigt werden sollen',
    },
    autoPlay: {
      control: 'boolean',
      description: 'Gibt an, ob das Carousel automatisch abspielen soll',
    },
    interval: {
      control: 'number',
      description: 'Das Intervall in Millisekunden zwischen den Slides bei automatischer Wiedergabe',
    },
    showArrows: {
      control: 'boolean',
      description: 'Gibt an, ob Pfeile zum Navigieren angezeigt werden sollen',
    },
    showIndicators: {
      control: 'boolean',
      description: 'Gibt an, ob Indikatoren angezeigt werden sollen',
    },
    infiniteLoop: {
      control: 'boolean',
      description: 'Gibt an, ob das Carousel in einer Endlosschleife laufen soll',
    },
    swipeable: {
      control: 'boolean',
      description: 'Gibt an, ob das Carousel per Wischgeste bedient werden kann',
    },
    emulateTouch: {
      control: 'boolean',
      description: 'Gibt an, ob Touch-Ereignisse emuliert werden sollen',
    },
    showThumbs: {
      control: 'boolean',
      description: 'Gibt an, ob Thumbnails angezeigt werden sollen',
    },
    selectedItem: {
      control: 'number',
      description: 'Der Index des ausgewählten Slides',
    },
    onChange: {
      action: 'changed',
      description: 'Callback, der aufgerufen wird, wenn sich der aktive Slide ändert',
    },
    onClickItem: {
      action: 'clicked',
      description: 'Callback, der aufgerufen wird, wenn auf einen Slide geklickt wird',
    },
    onClickThumb: {
      action: 'thumbClicked',
      description: 'Callback, der aufgerufen wird, wenn auf einen Thumbnail geklickt wird',
    },
    width: {
      control: 'text',
      description: 'Die Breite des Carousels',
    },
    dynamicHeight: {
      control: 'boolean',
      description: 'Gibt an, ob die Höhe des Carousels dynamisch angepasst werden soll',
    },
    centerMode: {
      control: 'boolean',
      description: 'Gibt an, ob der aktive Slide zentriert werden soll',
    },
    centerSlidePercentage: {
      control: 'number',
      description: 'Der Prozentsatz der Breite, den der zentrale Slide einnehmen soll',
    },
    children: {
      description: 'Die Kinder-Elemente des Carousels',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Carousel>;

export const Basic: Story = {
  render: () => (
    <div style={{ width: '600px', height: '400px' }}>
      <Carousel>
        <div>
          <img src="https://via.placeholder.com/600x400/3498db/ffffff?text=Slide+1" alt="Slide 1" />
          <p className="legend">Slide 1</p>
        </div>
        <div>
          <img src="https://via.placeholder.com/600x400/e74c3c/ffffff?text=Slide+2" alt="Slide 2" />
          <p className="legend">Slide 2</p>
        </div>
        <div>
          <img src="https://via.placeholder.com/600x400/2ecc71/ffffff?text=Slide+3" alt="Slide 3" />
          <p className="legend">Slide 3</p>
        </div>
      </Carousel>
    </div>
  ),
};

export const WithoutArrows: Story = {
  render: () => (
    <div style={{ width: '600px', height: '400px' }}>
      <Carousel showArrows={false}>
        <div>
          <img src="https://via.placeholder.com/600x400/3498db/ffffff?text=Slide+1" alt="Slide 1" />
        </div>
        <div>
          <img src="https://via.placeholder.com/600x400/e74c3c/ffffff?text=Slide+2" alt="Slide 2" />
        </div>
        <div>
          <img src="https://via.placeholder.com/600x400/2ecc71/ffffff?text=Slide+3" alt="Slide 3" />
        </div>
      </Carousel>
    </div>
  ),
};

export const WithoutIndicators: Story = {
  render: () => (
    <div style={{ width: '600px', height: '400px' }}>
      <Carousel showIndicators={false}>
        <div>
          <img src="https://via.placeholder.com/600x400/3498db/ffffff?text=Slide+1" alt="Slide 1" />
        </div>
        <div>
          <img src="https://via.placeholder.com/600x400/e74c3c/ffffff?text=Slide+2" alt="Slide 2" />
        </div>
        <div>
          <img src="https://via.placeholder.com/600x400/2ecc71/ffffff?text=Slide+3" alt="Slide 3" />
        </div>
      </Carousel>
    </div>
  ),
};

export const WithThumbnails: Story = {
  render: () => (
    <div style={{ width: '600px', height: '500px' }}>
      <Carousel showThumbs={true}>
        <div>
          <img src="https://via.placeholder.com/600x400/3498db/ffffff?text=Slide+1" alt="Slide 1" />
        </div>
        <div>
          <img src="https://via.placeholder.com/600x400/e74c3c/ffffff?text=Slide+2" alt="Slide 2" />
        </div>
        <div>
          <img src="https://via.placeholder.com/600x400/2ecc71/ffffff?text=Slide+3" alt="Slide 3" />
        </div>
        <div>
          <img src="https://via.placeholder.com/600x400/f39c12/ffffff?text=Slide+4" alt="Slide 4" />
        </div>
        <div>
          <img src="https://via.placeholder.com/600x400/9b59b6/ffffff?text=Slide+5" alt="Slide 5" />
        </div>
      </Carousel>
    </div>
  ),
};

export const AutoPlay: Story = {
  render: () => (
    <div style={{ width: '600px', height: '400px' }}>
      <Carousel autoPlay interval={3000} infiniteLoop>
        <div>
          <img src="https://via.placeholder.com/600x400/3498db/ffffff?text=Slide+1" alt="Slide 1" />
        </div>
        <div>
          <img src="https://via.placeholder.com/600x400/e74c3c/ffffff?text=Slide+2" alt="Slide 2" />
        </div>
        <div>
          <img src="https://via.placeholder.com/600x400/2ecc71/ffffff?text=Slide+3" alt="Slide 3" />
        </div>
      </Carousel>
    </div>
  ),
};

export const CenterMode: Story = {
  render: () => (
    <div style={{ width: '600px', height: '400px' }}>
      <Carousel centerMode centerSlidePercentage={80}>
        <div>
          <img src="https://via.placeholder.com/600x400/3498db/ffffff?text=Slide+1" alt="Slide 1" />
        </div>
        <div>
          <img src="https://via.placeholder.com/600x400/e74c3c/ffffff?text=Slide+2" alt="Slide 2" />
        </div>
        <div>
          <img src="https://via.placeholder.com/600x400/2ecc71/ffffff?text=Slide+3" alt="Slide 3" />
        </div>
      </Carousel>
    </div>
  ),
};

export const DynamicHeight: Story = {
  render: () => (
    <div style={{ width: '600px' }}>
      <Carousel dynamicHeight>
        <div>
          <img src="https://via.placeholder.com/600x300/3498db/ffffff?text=Height+300px" alt="Slide 1" />
        </div>
        <div>
          <img src="https://via.placeholder.com/600x400/e74c3c/ffffff?text=Height+400px" alt="Slide 2" />
        </div>
        <div>
          <img src="https://via.placeholder.com/600x500/2ecc71/ffffff?text=Height+500px" alt="Slide 3" />
        </div>
      </Carousel>
    </div>
  ),
};

export const CustomContent: Story = {
  render: () => (
    <div style={{ width: '600px', height: '400px' }}>
      <Carousel>
        <div className="bg-blue-500 text-white p-8 h-full flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold mb-4">Willkommen</h2>
          <p className="text-xl">Dies ist der erste Slide mit benutzerdefiniertem Inhalt.</p>
        </div>
        <div className="bg-red-500 text-white p-8 h-full flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold mb-4">Funktionen</h2>
          <ul className="text-xl list-disc pl-6">
            <li>Funktion 1</li>
            <li>Funktion 2</li>
            <li>Funktion 3</li>
          </ul>
        </div>
        <div className="bg-green-500 text-white p-8 h-full flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold mb-4">Kontakt</h2>
          <p className="text-xl mb-4">Nehmen Sie Kontakt mit uns auf:</p>
          <button className="bg-white text-green-500 px-4 py-2 rounded font-bold">
            Kontakt
          </button>
        </div>
      </Carousel>
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [currentSlide, setCurrentSlide] = React.useState(0);
    
    return (
      <div className="space-y-4">
        <div style={{ width: '600px', height: '400px' }}>
          <Carousel
            selectedItem={currentSlide}
            onChange={setCurrentSlide}
            showArrows={true}
            showStatus={true}
          >
            <div>
              <img src="https://via.placeholder.com/600x400/3498db/ffffff?text=Slide+1" alt="Slide 1" />
            </div>
            <div>
              <img src="https://via.placeholder.com/600x400/e74c3c/ffffff?text=Slide+2" alt="Slide 2" />
            </div>
            <div>
              <img src="https://via.placeholder.com/600x400/2ecc71/ffffff?text=Slide+3" alt="Slide 3" />
            </div>
          </Carousel>
        </div>
        
        <div className="flex justify-center space-x-2">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => setCurrentSlide(0)}
          >
            Slide 1
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={() => setCurrentSlide(1)}
          >
            Slide 2
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded"
            onClick={() => setCurrentSlide(2)}
          >
            Slide 3
          </button>
        </div>
        
        <div className="text-center">
          Aktueller Slide: {currentSlide + 1}
        </div>
      </div>
    );
  },
};