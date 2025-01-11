import React, { useEffect, useState } from 'react';
import Score from "../Score/Score.jsx"
import styles from "./ScoreBlock.module.css"
import axios from 'axios';


function ScoreBlock(){

    const API_TOKEN = import.meta.env.VITE_REACT_APP_API_KEY;
    
    async function getPremierLeagueData(dataType) {
        const url = `https://thingproxy.freeboard.io/fetch/https://api.football-data.org/v4/competitions/PL/${dataType}`; // have to use a proxy to avoid some protocol...
        try {
          const response = await axios.get(url, {
            headers: {
              'X-Auth-Token': API_TOKEN
            }
          });

          console.log(`Full ${dataType} Response:`, response.data);  // Log full response to inspect

          if (dataType.includes('matches?status=LIVE')) {
            const liveMatches = response.data.matches;
            liveMatches.forEach(match => {
                const homeTeam = match.homeTeam.name;
                const awayTeam = match.awayTeam.name;
                const homeScore = match.score.fullTime.homeTeam;
                const awayScore = match.score.fullTime.awayTeam;

                console.log(`${homeTeam} vs ${awayTeam}: ${homeScore} - ${awayScore}`);
            });
          }
      } catch (error) {
          console.error('Error fetching data:', error.response ? error.response.data : error);
        }
      }

      useEffect(() => {
        getPremierLeagueData('standings');
        getPremierLeagueData(encodeURIComponent('matches?status=SCHEDULED'))
        getPremierLeagueData('matches?status=LIVE'); 
        //getPremierLeagueData(encodeURIComponent('matches'))

      }, []);

      
    
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