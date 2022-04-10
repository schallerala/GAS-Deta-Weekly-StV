import styles from '../styles/DaySelection.module.css'
import {EventsIndicator} from './EventsIndicator';


interface DaySelection<SelectionArguments> {
    isToday: boolean,
    isSelected?: boolean,
    shortWeekDay: string,
    dayOfMonth: number,
    numberOfEvents: number,
    reduce?: boolean,
    onClick?: () => void
}

export const DaySelection = <SelectionArguments,>({
    isToday = false,
    isSelected = false,
    shortWeekDay,
    dayOfMonth,
    numberOfEvents,
    reduce = false,
    onClick
}: DaySelection<SelectionArguments>) => {
    return (
        <div className={`${styles.dayContainer} ${isSelected ? styles.dayContainerSelected : ''} ${isToday && isSelected ? styles.todaySelected : isToday ? styles.todayUnselected : ''}`}
             onClick={() => onClick && onClick()}>
            <span className={`${styles.weekDay} ${isSelected ? styles.selectedWeekDay : reduce ? styles.reduced : ''}`}>{shortWeekDay}</span>

            <svg width={40} height={40} className={styles.dayOfMonth}>
                {isSelected && <circle cx={20} cy={20} r={20} fill="#4442C0" />}
                <text x="20" y="29" textAnchor="middle" className={`${isSelected ? styles.selectedDayOfMonth : reduce ? styles.reduced : ''}`}>{dayOfMonth.toString(10).padStart(2, '0')}</text>
            </svg>

            <div className={styles.eventsIndicatorContainer}>
                <EventsIndicator count={numberOfEvents} />
            </div>
        </div>
    )
}
