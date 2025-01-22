
import styles from './Score.module.css';

function Score({homeTeam, awayTeam, homeScore, awayScore, gameTime}) {
    const homeLogo = new URL(`../assets/football-logos/${homeTeam}.png`, import.meta.url).href;
    const awayLogo = new URL(`../assets/football-logos/${awayTeam}.png`, import.meta.url).href;

    return (
        <div className={styles.card}>
            <div data-status="inprogress" className={styles.teams}>
                <span className={`${styles['team-info']} ${styles['team-home']}`}>
                    <span className={styles['team-info-container']}>
                        {homeLogo && (
                            <img
                                src={homeLogo}
                                alt={`${homeTeam} logo`}
                                className={styles['team-logo']}
                            />
                        )}
                        <span className={styles['team-name-info']}>{homeTeam}</span>
                    </span>
                </span>
                <span className={styles['event-scoreboard']}>
                    <span className={styles['event-score-container']}>
                        <span className={styles['current-time-container']}>
                            <span className={styles['event-current-time']}>
                                <span className={styles['event-clock']}>{gameTime}</span>
                            </span>
                            <span className={styles['progress-dots']} data-progress="1S">
                                <span className={styles['load']}></span>
                            </span>
                        </span>
                        <span className={styles['score-container']}>
                            <span className={styles['score-home']}>{homeScore}</span>
                            <span className={styles['custom-sep']}>-</span>
                            <span className={styles['score-away']}>{awayScore}</span>
                        </span>
                    </span>
                </span>
                <span className={`${styles['team-info']} ${styles['team-away']}`}>
                    <span className={styles['team-info-container']}>
                        {awayLogo && (
                            <img
                                src={awayLogo}
                                alt={`${awayTeam} logo`}
                                className={styles['team-logo']}
                            />
                        )}
                        <span className={styles['team-icon-container']}></span>
                        <span className={styles['team-name-info']}>{awayTeam}</span>
                    </span>
                </span>
            </div>
        </div>
    );
}

export default Score;

