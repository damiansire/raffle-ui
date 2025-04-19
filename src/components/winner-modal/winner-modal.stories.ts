import type { Meta, StoryObj } from '@storybook/web-components';
import { WinnerModal } from './winner-modal'; // Import from the .ts file

// Register the custom element if it's not already registered globally
if (!customElements.get('winner-modal')) {
    customElements.define('winner-modal', WinnerModal);
}

// Define the interface for the component's props based on its properties
interface WinnerModalProps extends WinnerModal { }

const meta: Meta<WinnerModalProps> = {
    title: 'Components/WinnerModal',
    component: 'winner-modal', // Use the tag name for web components
    argTypes: {
        show: { control: 'boolean' },
        winnerName: { control: 'text' },
        winnerAvatar: { control: 'text' },
        titleText: { control: 'text' },
        winnerLabel: { control: 'text' },
        // Define actions for events if needed
        // onOpened: { action: 'opened' },
        // onClosed: { action: 'closed' },
    },
    // Define how the component should be rendered
    render: (args) => {
        const modal = document.createElement('winner-modal') as WinnerModal;
        // Assign properties directly
        modal.show = args.show ?? false;
        modal.winnerName = args.winnerName ?? 'Desconocido';
        modal.winnerAvatar = args.winnerAvatar ?? 'https://placehold.co/100x100/cccccc/ffffff?text=Avatar';
        modal.titleText = args.titleText ?? '¡Felicidades!';
        modal.winnerLabel = args.winnerLabel ?? 'El ganador es:';
        return modal;
    },
};

export default meta;
type Story = StoryObj<WinnerModalProps>;

// Story for the default state (closed)
export const Default: Story = {
    args: {
        show: false,
        winnerName: 'Juan Pérez',
        winnerAvatar: 'https://placehold.co/100x100/92A8D1/ffffff?text=JP',
        titleText: '¡Enhorabuena!',
        winnerLabel: 'El afortunado es:',
    },
};

// Story for the open state
export const Open: Story = {
    args: {
        ...Default.args,
        show: true,
    },
};

// Story with different winner information
export const CustomWinner: Story = {
    args: {
        ...Default.args,
        show: true,
        winnerName: 'María García',
        winnerAvatar: 'https://placehold.co/100x100/FF6B6B/ffffff?text=MG',
        titleText: '¡Tenemos un Ganador!',
        winnerLabel: 'Y el premio va para:',
    },
};

// Interactive story to demonstrate opening the modal
export const Interactive: Story = {
    render: () => {
        const container = document.createElement('div');
        const button = document.createElement('button');
        button.textContent = 'Abrir Modal';
        button.style.marginBottom = '20px';
        button.style.padding = '10px 20px';
        button.style.backgroundColor = '#10b981'; // Example button style
        button.style.color = 'white';
        button.style.border = 'none';
        button.style.borderRadius = '6px';
        button.style.cursor = 'pointer';

        const modal = document.createElement('winner-modal') as WinnerModal;
        // Set initial winner info for the interactive example
        modal.setWinnerInfo(
            'Ana Martínez',
            'https://placehold.co/100x100/4ECDC4/ffffff?text=AM',
            '¡Felicidades!',
            'La ganadora es:'
        );

        button.addEventListener('click', () => {
            modal.openModal();
        });

        // Optional: Listen for close event to demonstrate
        modal.addEventListener('closed', () => {
            console.log('Modal closed event received');
        });

        container.appendChild(button);
        container.appendChild(modal);
        return container;
    },
    args: {
        // Args are not directly used in this render function but can be defined if needed
        // for addons or controls that might interact differently with a render function.
    },
}; 