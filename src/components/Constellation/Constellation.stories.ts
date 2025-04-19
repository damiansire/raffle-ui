import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './Constellation'; // Importa el componente para registrar el custom element

// Importa la clase SOLO para type hints y controles automáticos de Storybook
import { Constellation } from './Constellation';

const meta: Meta<Constellation> = {
  title: 'Components/Constellation', // Ruta en la barra lateral de Storybook
  component: 'constellation', // La etiqueta del custom element
  tags: ['autodocs'], // Habilita la página de documentación automática
  argTypes: {
    // Ejemplo de cómo definir controles más específicos
    title: {
      control: 'text',
      description: 'El título principal del componente',
    },
    counter: {
      control: 'number',
      description: 'Valor inicial del contador',
    },
    // Los slots y CSS custom properties necesitan configuración manual si quieres controles
    // slot: { control: 'text', description: 'Contenido del slot por defecto' },
  },
  render: (args) => html`
    <constellation
      .title=${args.title}
      .counter=${args.counter}
    >
     <!-- Ejemplo de contenido para el slot -->
     <p>Contenido del Slot</p>
    </constellation>`
};

export default meta;
type Story = StoryObj<Constellation>;

export const Default: Story = {
  args: {
    // Valores por defecto para la historia principal
    title: 'Componente Constellation',
    counter: 0,
  },
};

export const WithCustomTitle: Story = {
  args: {
    title: 'Este es un título diferente',
    counter: 5,
  },
};

export const SlottedContent: Story = {
    render: (args) => html`
    <constellation
      .title=${args.title}
      .counter=${args.counter}
    >
     <img src="https://placehold.co/100x50/orange/white?text=Slotted" alt="Placeholder"/>
     <p>Más contenido aquí.</p>
    </constellation>`,
    args: {
        title: 'Con Slot',
        counter: 10
    }
}
