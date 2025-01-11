
import styles from './Score.module.css';

function Score(props) {
    return (
        <div className={styles.card}>
            <div data-status="inprogress" className={styles.teams}>
                <span className={`${styles['team-info']} ${styles['team-home']}`}>
                    <span className={styles['team-info-container']}>
                        <span className={styles['team-name-info']}>Manchester United</span>
                    </span>
                </span>
                <span className={styles['event-scoreboard']}>
                    <span className={styles['event-score-container']}>
                        <span className={styles['current-time-container']}>
                            <span className={styles['event-current-time']}>
                                <span className={styles['event-clock']}>0'</span>
                            </span>
                            <span className={styles['progress-dots']} data-progress="1S">
                                <span className={styles['load']}></span>
                            </span>
                        </span>
                        <span className={styles['score-container']}>
                            <span className={styles['score-home']}>0</span>
                            <span className={styles['custom-sep']}>-</span>
                            <span className={styles['score-away']}>0</span>
                        </span>
                    </span>
                </span>
                <span className={`${styles['team-info']} ${styles['team-away']}`}>
                    <span className={styles['team-info-container']}>
                        <span className={styles['team-icon-container']}></span>
                        <span className={styles['team-name-info']}>Chelsea</span>
                    </span>
                </span>
            </div>
        </div>
    );
}

export default Score;

