import { html } from 'lit';
import '../Header/Header.js';

export default {
  title: 'Components/Header',
  component: 'raffle-header',
  argTypes: {
    user: { control: 'object' },
  },
};

const Template = ({ user }) => html`
  <raffle-header ?user=${user}></raffle-header>
`;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  user: {
    name: 'Jane Doe',
  },
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {
  user: null,
}; 