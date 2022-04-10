import { DaySelection } from '../components/DaySelection';
import {ComponentStory, StoryObj} from '@storybook/react';


import styles from '../styles/DaySelection.module.css'


export default {
    name: 'WeekDaySelection',
} as StoryObj

const Template: ComponentStory<any> = () => {
    return (
        <ul className={styles.weekContainer}>
            <li className={styles.dayOutContainer}><DaySelection isToday={false} shortWeekDay={'LUN'} dayOfMonth={28} numberOfEvents={0} /></li>
            <li className={styles.dayOutContainer}><DaySelection isToday={false} shortWeekDay={'MAR'} dayOfMonth={29} numberOfEvents={1} /></li>
            <li className={styles.dayOutContainer}><DaySelection isToday={false} shortWeekDay={'MER'} dayOfMonth={30} numberOfEvents={2} /></li>
            <li className={styles.dayOutContainer}><DaySelection isToday={true} shortWeekDay={'JEU'} dayOfMonth={31} numberOfEvents={3} /></li>
            <li className={styles.dayOutContainer}><DaySelection isToday={false} isSelected={true} shortWeekDay={'VEN'} dayOfMonth={1} reduce={true} numberOfEvents={4} /></li>
            <li className={styles.dayOutContainer}><DaySelection isToday={false} shortWeekDay={'SAM'} dayOfMonth={2} reduce={true} numberOfEvents={5} /></li>
            <li className={styles.dayOutContainer}><DaySelection isToday={false} shortWeekDay={'DIM'} dayOfMonth={3} reduce={true} numberOfEvents={6} /></li>
        </ul>
    )
}

export const Week = Template.bind({});
