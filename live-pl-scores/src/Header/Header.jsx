import styles from './Header.module.css'

function Header(){

    return(

        <>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=block" />
            <div className={styles['header-bar']}>
            <button className={styles['home-button']}></button>
            
            <div className={styles['search-container']}>
                <input type="search" className={styles['search-input']} placeholder="Enter a team...">
                </input>
                <span className="material-symbols-outlined" 
                style={{ fontSize: '2.5vw', right: 0}}>
                 search
                </span>
            </div>

            <nav className={styles['navbar']}>
                <ul>
                    <li><a href="">Scores & Fixtures</a></li>
                    <li><a href="">Table</a></li>
                    <li><a href="">Top Scorers</a></li>
                    <li><a href="">News</a></li>
                </ul>
            </nav>

            <button className={styles["account-button"]}></button>

        </div>
        </>

    );
}

export default Header;