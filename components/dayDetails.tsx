import {EventDetails} from '../api-types/weekResponse';
import _ from 'lodash';

function getDetails (location ?: string, notes ?: string): string {
    return location || notes
        ? location && notes
            ? ` (${location}, ${notes})`
            : location
                ? ` (${location})`
                : ` (${notes})`
        : '';
}

const DayDetails = (props: { eventsDetails: EventDetails[] }) => {
    const eventsByOrg = _.groupBy(props.eventsDetails, eventDetails => eventDetails.organizationName);

    return (
        <>
            <ul>
                {Object.entries(eventsByOrg).map(([orgName, /* @type EventDetails[] */ orgEvents], i) => {
                    return (
                        <li key={i}>
                            <span>{orgName}</span>
                            <ul>
                                {orgEvents.map(({name, location, notes}, i) => {

                                    const details = getDetails(location, notes);

                                    return (
                                        <li key={i}>
                                            <span>{name}</span>
                                            { details && <span>{details}</span> }
                                        </li>
                                    )
                                })}
                            </ul>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default DayDetails;
