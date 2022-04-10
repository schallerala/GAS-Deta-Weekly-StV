import styles from '../styles/Details.module.css'


export interface OrganizationProps {
    organizationName: string,
    events: string[]
}


interface DetailsProps {
    date: string
    organizationsDetails?: OrganizationProps[]
}


export const Details = ({
    date,
    organizationsDetails = []
}: DetailsProps) => {
    if ((organizationsDetails?.length || 0) == 0)
        return (<div>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <span className={styles.noDetails}>Pas d'événements le {date}</span>
        </div>)

    return (
        <div>
            {organizationsDetails.map((details, i) => (<div key={i}>
                <h3 className={styles.orgName}>{details.organizationName}</h3>
                <ul className={styles.orgEvents}>
                    {details.events.map((event, i) => (<li key={i} className={styles.orgEventLi}>
                        <p className={styles.orgEvent}>
                            {event}
                        </p>
                    </li>))}
                </ul>
            </div>))}
        </div>
    )
}
