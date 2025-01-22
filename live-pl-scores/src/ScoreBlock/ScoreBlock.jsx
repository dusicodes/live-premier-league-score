import React, { useEffect, useState } from 'react';
import Score from "../Score/Score.jsx"
import styles from "./ScoreBlock.module.css"
import axios from 'axios';


function ScoreBlock({day, month, year, scheduledGames, liveGames, allGames}){

    let gameDictionary = new Map();
    const [formattedDate, setFormattedDate] = useState('');
    const [gamesForDate, setGamesForDate] = useState([]);
    
    mapMatches();
    useEffect(() => {
        if (day && month && year) {
          const formatted = formatDate(day, month, year);
          setFormattedDate(formatted);
        }
        console.log(scheduledGames);
        console.log(liveGames);
        console.log(allGames);

      }, [day, month, year]);

    useEffect(() => {
        if (formattedDate) {
            const gamesForThisDate = gameDictionary.get(formattedDate) || [];
            console.log('Games for this date:', gamesForThisDate);  // Check the structure here
            setGamesForDate(gamesForThisDate);
        }
    }, [formattedDate]);

    function mapMatches() {
        allGames.forEach(game => {
            const matchDate = game.utcDate;
            const [date, time] = matchDate.split("T");
            const homeTeam = game.homeTeam
            const awayTeam = game.awayTeam
            if (!homeTeam || !awayTeam) return;
            const teamsTuple = [homeTeam, awayTeam];
            
            if (gameDictionary.has(date)) {
                gameDictionary.get(date).push(teamsTuple);
            } else {
                // Otherwise, create a new array with the first tuple
                gameDictionary.set(date, [teamsTuple]);
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
              {gamesForDate.length > 0 ? (
                gamesForDate.map((game, index) => {
                  console.log('Full game object:', game); // Log the entire game object
                  const homeTeamName = game[0].shortName ? game[0].shortName : 'Unknown Home Team';
                  const awayTeamName = game[1].shortName ? game[1].shortName: 'Unknown Away Team';
                  return (
                    <Score
                      key={index}
                      homeTeam={homeTeamName}
                      awayTeam={awayTeamName}
                    />
                  );
                })
              ) : (
                <p>No games available for this date.</p> // Display a message if no games are available
              )}
            </div>
          </div>
        </>
      );
}
export default ScoreBlock;