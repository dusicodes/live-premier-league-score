import Score from "../Score/Score.jsx"
import styles from "./ScoreBlock.module.css"

function ScoreBlock(){

    return(
        <>
        <div className={styles["container"]}>
            <div className={styles["block"]}>
                <Score></Score>
            </div>
        </div>
        </>
    );
}

export default ScoreBlock;