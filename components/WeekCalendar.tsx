import useSwr from 'swr';
import {ContextEventsDetails, EventDetails} from '../api-types/weekResponse';
import moment from 'moment';
import 'moment/locale/fr-ch';
import {useState} from 'react';
import {Header} from './Header';
import {DaySelection} from './DaySelection';
import _ from 'lodash';
import styles from '../styles/WeekCalendar.module.css';
import {Details, OrganizationProps} from './Details';

const fetcher = (url: string) => fetch(url).then(res => res.json())

const WEEK_DAYS = ['LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM', 'DIM'];
const MONTH = ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'];

const getMaxEntry = <E, >(dict: _.Dictionary<E[]>) => {
    const [first, ...entries] = Object.entries(dict);

    let result = first;
    let maxCount = dict[first[0]].length;

    for (let i = 0; i < entries.length; i++) {
        const [key, group] = entries[i];

        if (group.length > maxCount) {
            result = entries[i];
            maxCount = group.length;
        }
    }

    return result;
}

const simplifyEventDetails = (eventDetails: EventDetails) => {
    const details = eventDetails.location || eventDetails.notes
        ? eventDetails.location && eventDetails.notes
            ? `(${eventDetails.location}, ${eventDetails.notes})`
            : eventDetails.location
                ? `(${eventDetails.location})`
                : `(${eventDetails.notes})`
        : undefined;
    return [eventDetails.name].concat(details ? [details] : []).join(' ');
};

const mapEventDetails = (events: EventDetails[]) : OrganizationProps[] => {
    const eventsByOrganization = _.groupBy(events, event => event.organizationName);

    return Object.entries(eventsByOrganization).map(([orgName, eventDetails]) => {
        return {
            organizationName: orgName,
            events: eventDetails.map(eventDetails => simplifyEventDetails(eventDetails))
        }
    });
}

const WeekCalendar = () => {
    const [contextDate, setContextDate] = useState<ContextEventsDetails['previous']>();
    const [selectedDate, setSelectedDate] = useState<string>(moment().format('YYYY-MM-DD'));

    const thisWeek = !contextDate;

    const {data, error} = useSwr<ContextEventsDetails>(
        () => contextDate
            ? `/api/week-events?date=${contextDate.date}&format=${contextDate.format}`
            : `/api/week-events`,
        fetcher);

    if (error)
        return <div>Failed to load events. Contact Johnny Bravo</div>

    if (!data)
        return <div>En chargement...</div>

    const {format, dates} = data.week;

    const weekDates = dates.map((weekDate: string) => moment(weekDate, format));
    /* { '2022-03': [moment(...), moment(...), ...], '2022-04': [moment(...), ...] } */
    const yearMonthGroups = _.groupBy(weekDates, momentDate => momentDate.format('YYYY-MM'));

    const mostPresentYearMonth = getMaxEntry(yearMonthGroups)[0];
    const [maxYearCount, maxMonthCount] = mostPresentYearMonth.split('-').map(n => Number.parseInt(n));

    /* { '2022-03-28': [eventDetails, ...], ... } */
    const dayEventsGroups = _.groupBy(data.eventsDetails, event => event.date);

    const TODAY = moment();

    return (
        <div className={styles.container}>
            <div className={styles.headerContainer}>
                <Header monthName={MONTH[maxMonthCount - 1]} year={maxYearCount}
                        onPrevious={() => {
                            setSelectedDate(undefined);
                            setContextDate(data?.previous)
                        }}
                        enableToday={!thisWeek}
                        onToday={() => {
                            setContextDate(undefined)
                        }}
                        onNext={() => {
                            setSelectedDate(undefined);
                            setContextDate(data?.next);
                        }}
                />
            </div>
            <ul className={styles.weekContainer}>
                {_.zip(weekDates, dates).map(([momentWeekDate, weekDate], i) => {
                    const isToday = momentWeekDate!.isSame(TODAY, 'day');
                    const isDisplayedMonth = momentWeekDate!.format('YYYY-MM') == mostPresentYearMonth;
                    const dayEvents = dayEventsGroups[weekDate!] || [];
                    const eventCount = dayEvents.length;

                    return (<li key={i} className={styles.dayOutContainer}>
                        <DaySelection isToday={isToday}
                                      shortWeekDay={WEEK_DAYS[momentWeekDate!.isoWeekday() - 1]}
                                      dayOfMonth={momentWeekDate!.date()}
                                      isSelected={selectedDate === weekDate}
                                      reduce={!isDisplayedMonth}
                                      numberOfEvents={eventCount}
                                      onClick={() => setSelectedDate(weekDate)}
                        />
                    </li>)
                })}
            </ul>

            { selectedDate &&
                <Details date={moment(selectedDate, format).format("dddd DD MMMM YYYY")}
                         organizationsDetails={(selectedDate in dayEventsGroups) ? mapEventDetails(dayEventsGroups[selectedDate!]) : []} />
            }
        </div>
        // <div>
        //     <header>
        //         <span>
        //             {}
        //         </span>
        //
        //             <button onClick={() => {
        //                 setSelectedDate(undefined)
        //                 setContextDate(data?.previous)
        //             }}>{'<-'}</button>
        //
        //             <button disabled={thisWeek}
        //                     onClick={() => {
        //                         setSelectedDate(undefined)
        //                         setContextDate(undefined)
        //                     }}>
        //                 Today
        //             </button>
        //
        //             <button onClick={() => {
        //                 setSelectedDate(undefined)
        //                 setContextDate(data?.next)
        //             }}>{'->'}</button>
        //     </header>
        //
        //     <ul>
        //         {weekDates.map(weekDate => {
        //             const dayMonthKey = weekDate.format("MM-DD");
        //             const day = weekDate.format("DD");
        //
        //             const formattedDate = weekDate.format(format);
        //
        //             // TODO
        //             const mainMonth = weekDate.month() == maxMonth;
        //
        //             const hasEvents = (dateEvents.get(formattedDate)?.length || 0) > 0;
        //
        //             return (
        //                 <li key={dayMonthKey}
        //                     onClick={() => setSelectedDate(formattedDate)}>
        //                     {day} {hasEvents ? '√' : 'X'}
        //                 </li>
        //             );
        //         })}
        //     </ul>
        //
        //     <footer>
        //         {selectedDate && dateEvents.get(selectedDate) && <DayDetails eventsDetails={dateEvents.get(selectedDate)!} />}
        //     </footer>
        // </div>
    );
}

export default WeekCalendar
