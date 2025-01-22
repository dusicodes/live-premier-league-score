import React, { useEffect, useState } from 'react';
import Score from "../Score/Score.jsx"
import styles from "./ScoreBlock.module.css"
import axios from 'axios';


function ScoreBlock({day, month, year, scheduledGames, liveGames, allGames}){

    let gameDictionary = new Map();
    const [formattedDate, setFormattedDate] = useState('');
    const [gamesForDate, setGamesForDate] = useState(new Map());
    
    mapMatches();
    useEffect(() => {
        if (day && month && year) {
          const formatted = formatDate(day, month, year);
          setFormattedDate(formatted);
        }
        // console.log(scheduledGames);
        // console.log(liveGames);
        console.log(allGames);
      }, [day, month, year]);

    useEffect(() => {
        if (formattedDate) {
            const gamesForThisDate = gameDictionary.get(formattedDate) || new Map();
            //console.log('Games for this date:', gamesForThisDate);  // Check the structure here
            setGamesForDate(gamesForThisDate);
        }
    }, [formattedDate]);

    function mapMatches() {
      gameDictionary.clear();
      allGames.forEach(game => {
          const matchDate = game.utcDate;
          const [date, timeZ] = matchDate.split("T");
          const timeWithMS = timeZ.split("Z")[0];
          const time = timeWithMS.split(":")[0] + ":" + timeWithMS.split(":")[1]
          const homeTeam = game.homeTeam;
          const awayTeam = game.awayTeam;
          if (!homeTeam || !awayTeam) return;
          const teamsTuple = [homeTeam, awayTeam];

          const homeScore = game.score.fullTime.home;
          const awayScore = game.score.fullTime.away;

          let display = "0`"
          if (homeScore == null || awayScore == null){
            if ((game.score.halfTime.home !== null) && (game.score.halfTime.away !== null)){
              display = "HT";
            }
          } else{
            display = "FT";
          }
          
          if (!gameDictionary.has(date)) {
            gameDictionary.set(date, new Map());
          }
          const timeMap = gameDictionary.get(date);
          if (timeMap.has(time)) {
            timeMap.get(time).push({teamsTuple, homeScore, awayScore, display});
          } else {
            timeMap.set(time, [{teamsTuple, homeScore, awayScore, display}]);
          }
        });
    }

    function formatDate(day, month, year) {
        const formattedDay = day < 10 ? `0${day}` : `${day}`;
        const formattedMonth = month < 10 ? `0${month}` : `${month}`;
    
        return `${year}-${formattedMonth}-${formattedDay}`;
    }

  
    return (
        <>
          <div className={styles["container"]}>
            <div className={styles["block"]}>
              {gamesForDate.size > 0 ? (
                Array.from(gamesForDate.entries()).map(([time, games], index) => (
                  <div key={index}>
                    <h2>{time}</h2>
                    {games.map((game, idx) => {
                      console.log(game);
                      const homeTeamName = game.teamsTuple[0].shortName || 'Unknown Home Team';
                      const awayTeamName = game.teamsTuple[1].shortName || 'Unknown Away Team';
                      return (
                        <Score
                          key={`${index}-${idx}`}
                          homeTeam={homeTeamName}
                          awayTeam={awayTeamName}
                          homeScore={game.homeScore}
                          awayScore={game.awayScore}
                          gameTime={game.display}
                        />
                      );
                    })}
                  </div>
                ))
               ) : (
                <p>No games available for this date.</p> // Display a message if no games are available
              )}
            </div>
          </div>
        </>
      );
}
export default ScoreBlock;