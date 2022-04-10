import { Header } from '../components/Header';
import {ComponentMeta, ComponentStory} from '@storybook/react';

export default {
    title: 'Header',
    component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const April2022 = Template.bind({});
April2022.args = {
    monthName: "Avril",
    year: 2022,
    enableToday: false
};

export const November2022 = Template.bind({});
November2022.args = {
    monthName: "Novembre",
    year: 2022,
    enableToday: true
};
