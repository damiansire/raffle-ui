import { html } from 'lit';
import '../Page/Page.js';

export default {
  title: 'Components/Page',
  component: 'raffle-page',
  argTypes: {
    user: { control: 'object' },
  },
};

const Template = ({ user }) => html`
  <raffle-page ?user=${user}></raffle-page>
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