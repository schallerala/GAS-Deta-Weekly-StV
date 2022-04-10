import { Details } from '../components/Details';
import {ComponentMeta, ComponentStory} from '@storybook/react';

export default {
    title: 'Details',
    component: Details,
} as ComponentMeta<typeof Details>;

const Template: ComponentStory<typeof Details> = (args) => <Details {...args} />;

export const NoEvents = Template.bind({});
NoEvents.args = {
    date: '1 avril 2022'
};

export const Ven01 = Template.bind({});
Ven01.args = {
    date: '10 avril 2022',
    organizationsDetails: [
        {
            organizationName: 'Leonina',
            events: [
                'Kreuzanlass mit GV Abbatia Wilensis (Wil, off, cpns -20:00 C.t.)',
            ]
        },
        {
            organizationName: 'Lemania',
            events: [
                'Kreuzstamm Adelphia (Genève, 20h)',
            ]
        },
        {
            organizationName: 'Alemannia',
            events: [
                'Fuxenrally (offiziell)',
            ]
        },
        {
            organizationName: 'Gréviria',
            events: [
                'Préparation stamm déguisé',
                'Stamm déguisé',
            ]
        },
        {
            organizationName: 'Berchtoldia',
            events: [
                'Lutherkneipe (Bern, A - off)',
            ]
        }
    ]
};
