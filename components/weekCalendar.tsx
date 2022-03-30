import useSwr from 'swr';
import {ContextEventsDetails, EventDetails} from '../api-types/weekResponse';
import moment from 'moment';
import {useState} from 'react';
import DayDetails from './dayDetails';

const fetcher = (url: string) => fetch(url).then(res => res.json())

const MONTH = ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'];

const WeekCalendar = () => {
    const [ contextDate, setContextDate ] = useState<ContextEventsDetails['previous']>();
    const [ selectedDate, setSelectedDate ] = useState<string>();

    const thisWeek = !contextDate;

    const { data, error } = useSwr<ContextEventsDetails>(
        () => contextDate
            ? `/api/week-events?date=${contextDate.date}&format=${contextDate.format}`
            : `/api/week-events`,
        fetcher);

    if (error)
        return <div>Failed to load events. Contact Johnny Bravo</div>

    if ( ! data)
        return <div>Loading...</div>

    const { format, dates } = data.week;

    const weekDates = dates.map((weekDate: string) => moment(weekDate, format));

    const monthCount = new Map<number, number>();
    weekDates.forEach(date => {
        const dateMonth = date.month();
        monthCount.set(dateMonth, (monthCount.get(dateMonth) || 0) + 1);
    });

    // initiate with empty array
    const dateEvents = new Map<string, EventDetails[]>(
        dates.map(weekDate => [weekDate, []])
    );

    // populate map's array
    data.eventsDetails.forEach(eventDetails => {
        dateEvents.get(eventDetails.date)?.push(eventDetails);
    });

    let maxMonth: number = 0,
        maxMonthCount: number;

    monthCount.forEach((monthCount, month) => {
        if (monthCount > (maxMonthCount || 0)) {
            maxMonth = month;
            maxMonthCount = monthCount;
        }
    });

    return (
        <div>
            <header>
                <span>
                    {MONTH[maxMonth]}
                </span>

                    <button onClick={() => {
                        setSelectedDate(undefined)
                        setContextDate(data?.previous)
                    }}>{'<-'}</button>

                    <button disabled={thisWeek}
                            onClick={() => {
                                setSelectedDate(undefined)
                                setContextDate(undefined)
                            }}>
                        Today
                    </button>

                    <button onClick={() => {
                        setSelectedDate(undefined)
                        setContextDate(data?.next)
                    }}>{'->'}</button>
            </header>

            <ul>
                {weekDates.map(weekDate => {
                    const dayMonthKey = weekDate.format("MM-DD");
                    const day = weekDate.format("DD");

                    const formattedDate = weekDate.format(format);

                    // TODO
                    const mainMonth = weekDate.month() == maxMonth;

                    const hasEvents = (dateEvents.get(formattedDate)?.length || 0) > 0;

                    return (
                        <li key={dayMonthKey}
                            onClick={() => setSelectedDate(formattedDate)}>
                            {day} {hasEvents ? '√' : 'X'}
                        </li>
                    );
                })}
            </ul>

            <footer>
                {selectedDate && dateEvents.get(selectedDate) && <DayDetails eventsDetails={dateEvents.get(selectedDate)!} />}
            </footer>
        </div>
    );
}

export default WeekCalendar
