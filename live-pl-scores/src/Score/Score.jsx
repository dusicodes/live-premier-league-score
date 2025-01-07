
import styles from './Score.module.css';

function Score() {
    return (
        <div className={styles.card}>
            <div data-status="inprogress" className={styles.teams}>
                <span className={`${styles['team-info']} ${styles['team-home']}`}>
                    <span className={styles['team-info-container']}>
                        <span className={styles['team-name-info']}>Team 1</span>
                    </span>
                </span>
                <span className={styles['event-scoreboard']}>
                    <span className={styles['event-score-container']}>
                        <span className={styles['current-time-container']}>
                            <span className={styles['event-current-time']}>
                                <span className={styles['event-clock']}>85'</span>
                                <span className={styles['current-part']}>2H</span>
                            </span>
                            <span className={styles['progress-dots']} data-progress="1S">
                                <span className={styles['load']}></span>
                            </span>
                        </span>
                        <span className={styles['score-container']}>
                            <span className={styles['score-home']}>2</span>
                            <span className={styles['custom-sep']}>-</span>
                            <span className={styles['score-away']}>4</span>
                        </span>
                    </span>
                </span>
                <span className={`${styles['team-info']} ${styles['team-away']}`}>
                    <span className={styles['team-info-container']}>
                        <span className={styles['team-icon-container']}></span>
                        <span className={styles['team-name-info']}>Team 2</span>
                    </span>
                </span>
            </div>
        </div>
    );
}

export default Score;

