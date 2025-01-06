import styles from './Header.module.css'

function Header(){

    return(

        <>
        <div className={styles['header-bar']}>
            <button className={styles['home-button']}>A</button>
            
            <div className={styles['search-container']}>
                <button className={styles['search-icon']}>🔍</button>
                <input type="text" className={styles['search-input']} placeholder="Enter a team...">
                </input>
            </div>

        </div>
        </>

    );
}

export default Header;