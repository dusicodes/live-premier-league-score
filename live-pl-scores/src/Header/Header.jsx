import styles from './Header.module.css'

function Header(){

    return(

        <>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=search" />
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
        </div>
        </>

    );
}

export default Header;