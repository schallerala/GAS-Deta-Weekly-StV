import styles from '../styles/Header.module.css'


interface HeaderProps {
    monthName: string;
    year: number;

    enableToday?: boolean;

    onPrevious?: () => void;
    onToday?: () => void;
    onNext?: () => void;
}


export const Header = ({
    monthName,
    year,
    enableToday = false,
    onPrevious,
    onToday,
    onNext
}: HeaderProps) => {
    return (
        <div className={styles.headerContainer}>
            <span className={styles.headerMonthTitle}>
                {monthName} {year.toFixed(0)}
            </span>

            <div className={styles.rightContainer}>
                <svg className={styles.navigationArrows} width="20" height="34" viewBox="0 0 20 32" fill="none"
                     onClick={() => onPrevious && onPrevious()}
                     xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 2 L4 17 L18 32" stroke="#4442C0" strokeWidth="3"/>
                </svg>
                <button disabled={!enableToday}
                        className={`${styles.todayButton} ${enableToday ? '' : styles.disabledToday}`}
                        onClick={() => onToday && onToday()}>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    Aujourd'hui
                </button>
                <svg className={styles.navigationArrows} width="20" height="34" viewBox="0 0 20 32" fill="none"
                     onClick={() => onNext && onNext()}
                     xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 2 L16 17 L2 32" stroke="#4442C0" strokeWidth="3"/>
                </svg>
            </div>
        </div>
    )
};
