import { WinnerModal } from './WinnerModal.js';

export default {
  title: 'Components/WinnerModal',
  component: 'winner-modal',
  argTypes: {
    show: { control: 'boolean' },
    winnerName: { control: 'text' },
    winnerAvatar: { control: 'text' },
    titleText: { control: 'text' },
    winnerLabel: { control: 'text' }
  }
};

const Template = (args) => {
  const modal = document.createElement('winner-modal');
  Object.keys(args).forEach(key => {
    if (key === 'show') {
      if (args[key]) {
        modal.setAttribute('show', '');
      } else {
        modal.removeAttribute('show');
      }
    } else {
      modal.setAttribute(key, args[key]);
    }
  });
  return modal;
};

export const Default = Template.bind({});
Default.args = {
  show: false,
  winnerName: 'Juan Pérez',
  winnerAvatar: 'https://placehold.co/100x100/92A8D1/ffffff?text=JP',
  titleText: '¡Enhorabuena!',
  winnerLabel: 'El afortunado es:'
};

export const Open = Template.bind({});
Open.args = {
  ...Default.args,
  show: true
};

export const CustomWinner = Template.bind({});
CustomWinner.args = {
  ...Default.args,
  show: true,
  winnerName: 'María García',
  winnerAvatar: 'https://placehold.co/100x100/FF6B6B/ffffff?text=MG',
  titleText: '¡Tenemos un Ganador!',
  winnerLabel: 'Y el premio va para:'
};

// Función para demostrar la interacción
const InteractiveTemplate = () => {
  const container = document.createElement('div');
  const button = document.createElement('button');
  button.textContent = 'Abrir Modal';
  button.style.marginBottom = '20px';
  
  const modal = document.createElement('winner-modal');
  modal.setAttribute('winner-name', 'Ana Martínez');
  modal.setAttribute('winner-avatar', 'https://placehold.co/100x100/4ECDC4/ffffff?text=AM');
  modal.setAttribute('title-text', '¡Felicidades!');
  modal.setAttribute('winner-label', 'El ganador es:');
  
  button.addEventListener('click', () => {
    modal.openModal();
  });
  
  container.appendChild(button);
  container.appendChild(modal);
  return container;
};

export const Interactive = InteractiveTemplate.bind({}); 