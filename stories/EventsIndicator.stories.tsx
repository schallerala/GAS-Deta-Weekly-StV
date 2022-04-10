import { EventsIndicator } from '../components/EventsIndicator';
import {ComponentMeta, ComponentStory} from '@storybook/react';

export default {
    title: 'EventsIndicator',
    component: EventsIndicator,
} as ComponentMeta<typeof EventsIndicator>;

const Template: ComponentStory<typeof EventsIndicator> = (args) => <EventsIndicator {...args} />;

export const None = Template.bind({});
None.args = {
    count: 0
};

export const One = Template.bind({});
One.args = {
    count: 1
};

export const Two = Template.bind({});
Two.args = {
    count: 2
};

export const Three = Template.bind({});
Three.args = {
    count: 3
};

export const Four = Template.bind({});
Four.args = {
    count: 4
};

export const Five = Template.bind({});
Five.args = {
    count: 5
};
