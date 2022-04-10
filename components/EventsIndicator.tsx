import styles from '../styles/EventsIndicator.module.css'


interface EventsIndicatorProps {
    count?: number
}


export const EventsIndicator = ({
    count = 0
}: EventsIndicatorProps) => {


    if (count <= 0) {
        return (<svg width={0} height={0}/>)
    }

    const iterable = new Array(count).fill(true).map((_, i) => i);

    if (count < 4) {
        return (
            <svg width={count * 10 + (count - 1) * 2} height={13}>
                {iterable.map(i => {
                    // 5 + 3px for center y to compensate height of bigger indicator
                    return (
                        <circle key={i} cx={12 * i + 5} cy={8} r={5} strokeWidth={0} />
                    )
                })}
            </svg>
        )
    }

    // more than 3, add a bigger circle
    return (
        <svg width={28} height={16}>
            <circle cx={5} cy={8} r={5} strokeWidth={0} />
            <circle cx={23} cy={8} r={5} strokeWidth={0} />
            <circle cx={14} cy={8} r={7} strokeWidth={1.5} stroke="#FFFFFF" />
            <path d="M14 8 l0 -3 l0 6 l0 -3 l3 0 l-6 0" stroke="#FFFFFF" />
        </svg>
    )
}
