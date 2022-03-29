export interface EventDetails {
    name: string,
    date: string,
    location?: string,
    notes?: string,
    organizationName: string
}


export interface ContextEventsDetails {
    eventsDetails: EventDetails[],
    week: {
        dates: string[]
        format: string
    }
    previous: {
        date: string,
        format: string
    }
    next: {
        date: string,
        format: string
    }
}
