import { DaySelection } from '../components/DaySelection';
import {ComponentMeta, ComponentStory} from '@storybook/react';

export default {
    title: 'DaySelection',
    component: DaySelection,
} as ComponentMeta<typeof DaySelection>;

const Template: ComponentStory<typeof DaySelection> = (args) => <DaySelection {...args} />;

export const Lundi = Template.bind({});
Lundi.args = {
    shortWeekDay: 'LUN',
    dayOfMonth: 11,
    numberOfEvents: 0
};

export const Mardi = Template.bind({});
Mardi.args = {
    shortWeekDay: 'MAR',
    dayOfMonth: 12,
    numberOfEvents: 1
};

export const Mercredi = Template.bind({});
Mercredi.args = {
    shortWeekDay: 'MER',
    dayOfMonth: 13,
    numberOfEvents: 2
};

export const Jeudi = Template.bind({});
Jeudi.args = {
    shortWeekDay: 'JEU',
    dayOfMonth: 14,
    isToday: true,
    numberOfEvents: 3
};

export const Vendredi = Template.bind({});
Vendredi.args = {
    shortWeekDay: 'VEN',
    dayOfMonth: 15,
    isSelected: true,
    numberOfEvents: 4
};

export const Samedi = Template.bind({});
Samedi.args = {
    shortWeekDay: 'SAM',
    dayOfMonth: 16,
    numberOfEvents: 5
};

export const Dimanche = Template.bind({});
Dimanche.args = {
    shortWeekDay: 'DIM',
    dayOfMonth: 17,
    numberOfEvents: 6
};
