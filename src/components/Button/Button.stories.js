import { html } from 'lit';
import '../Button/Button.js';

export default {
  title: 'Components/Button',
  component: 'raffle-button',
  argTypes: {
    primary: { control: 'boolean' },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    label: { control: 'text' },
    backgroundColor: { control: 'color' },
  },
};

const Template = ({ primary, size, label, backgroundColor }) => html`
  <raffle-button
    ?primary=${primary}
    size=${size}
    label=${label}
    background-color=${backgroundColor}
  ></raffle-button>
`;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Button',
  size: 'medium',
};

export const Secondary = Template.bind({});
Secondary.args = {
  primary: false,
  label: 'Button',
  size: 'medium',
};

export const Large = Template.bind({});
Large.args = {
  primary: true,
  label: 'Button',
  size: 'large',
};

export const Small = Template.bind({});
Small.args = {
  primary: true,
  label: 'Button',
  size: 'small',
}; 