import React, {useState, useEffect} from "react";
import Header from "./Header/Header.jsx"
import ScoreBlock from "./ScoreBlock/ScoreBlock.jsx"
import DatePicker from "./DatePicker/DatePicker.jsx"
import axios from 'axios';


function App() {

  const [displayDay, setDisplayDay] = useState();
  const [displayMonth, setDisplayMonth] = useState();
  const [displayYear, setDisplayYear] = useState();
  const [dateKey, setDateKey] = useState(0);

  const [scheduled, setScheduled] = useState([]);
  const [live, setLive] = useState([]);
  const [matches, setMatches] = useState([]);
  const [standing, setStanding] = useState([]);

  const handleDateChange = (day, month, year) => {
    setDisplayDay(day);
    setDisplayMonth(month);
    setDisplayYear(year);
    setDateKey(prevKey => prevKey + 1);
  }

  const API_TOKEN = import.meta.env.VITE_REACT_APP_API_KEY;
  async function getPremierLeagueData(dataType) {
      const url = `https://thingproxy.freeboard.io/fetch/https://api.football-data.org/v4/competitions/PL/${dataType}`; // have to use a proxy to avoid some protocol...
      try {
        const response = await axios.get(url, {
          headers: {
            'X-Auth-Token': API_TOKEN
          }
        });

        console.log(`Full ${dataType} Response:`, response.data); 
        
        if (response.data.matches && Array.isArray(response.data.matches)) {
          if (dataType === "matches?status=SCHEDULED") {
            setScheduled(response.data.matches);  
          } else if (dataType === "matches?status=LIVE") {
            setLive(response.data.matches); 
          } else if (dataType === "matches"){
            setMatches(response.data.matches);
          }
        } else {
          console.warn("No 'matches' data found in response:", response.data);
        }

      } catch (error) {
        console.error("Error fetching data:", error.response ? error.response.data : error);
      }
    }


    useEffect(() => {
      //getPremierLeagueData('standings');
      getPremierLeagueData('matches?status=SCHEDULED')
      getPremierLeagueData('matches?status=LIVE'); 
      getPremierLeagueData('matches')
    }, []);

  // only render ScoreBlock once a date has been selected
  return (
    <>
    <Header></Header>
    <DatePicker onDateChange={handleDateChange}></DatePicker>
    {(displayDay && displayMonth && displayYear && scheduled.length > 0  && matches.length > 0) && (
      <ScoreBlock day={displayDay} month={displayMonth} year={displayYear} key={dateKey} scheduledGames={scheduled} liveGames={live} allGames={matches}></ScoreBlock>
    )}
    </>
  );
}

export default App
