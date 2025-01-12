import styles from './DatePicker.module.css';
import React, {useEffect, useState} from "react";


function DatePicker(){

    const [currentSelection, setCurrentSelection] = useState();
    const [currentDayElement, setCurrentDayElement] = useState()

    const [dayDates, setDayDates] = useState([]);
    const [monthDates, setMonthDates] = useState([]);
    const [yearDates, setYearDates] = useState([]);


    const [currentDay, setCurrentDay] = useState('');
    const [currentMonth, setCurrentMonth] = useState('');
    const [currentYear, setCurrentYear] = useState('');

    const [selectedDay, setSelectedDay] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  
    function findDaysInMonth(month, year){
        return new Date(year, month, 0).getDate();
    }


    useEffect(() => {
        setCurrentDayElement(document.querySelector(`.${styles["today"]}`));
        setCurrentSelection(document.querySelector(`.${styles["current-selection"]}`));

        const today = new Date();
        setCurrentDay(today.getDate());
        setCurrentMonth(today.getMonth() + 1);
        setCurrentYear(today.getFullYear());

        setSelectedMonth(currentMonth);
        setSelectedYear(currentYear);

        const daysInMonth = findDaysInMonth(currentMonth, currentYear);
        const prevDayDates = [];
        const nextDayDates = [];
        const prevMonthDates = [];
        const nextMonthDates = [];
        const prevYearDates = [];
        const nextYearDates = [];
 

        for (let i = 1; i <= 6; i++){
            const prevDay = currentDay - i;
            const nextDay = currentDay + i;

            if (prevDay < 1){
                const prevMonth = currentMonth - 1 <= 0 ? 12 : currentMonth - 1;
                const prevYear = prevMonth === 12 ? currentYear - 1 : currentYear;
                const prevDaysInMonth = findDaysInMonth(prevMonth, prevYear);
                prevDayDates.push(prevDaysInMonth + prevDay);
                prevMonthDates.push(prevMonth);
                prevYearDates.push(prevYear);
            } else{
                prevDayDates.push(prevDay);
                prevMonthDates.push(currentMonth);
                prevYearDates.push(currentYear);
            }

            if (nextDay > daysInMonth){
                const nextMonth = currentMonth + 1 > 12 ? 1 : currentMonth + 1;
                const nextYear = nextMonth === 12 ? currentYear + 1 : currentYear;
                const nextDaysInMonth = findDaysInMonth(nextMonth, nextYear); 
                nextDayDates.push(nextDaysInMonth + nextDay);
                nextMonthDates.push(nextMonth);
                nextYearDates.push(nextYear);
            } else{
                nextDayDates.push(nextDay);
                nextMonthDates.push(currentMonth);
                nextYearDates.push(currentYear);
            }
        }
        setDayDates([...prevDayDates.reverse(), currentDay, ...nextDayDates]);
        setMonthDates([...prevMonthDates, currentMonth, ...nextMonthDates]);
        setYearDates([...prevYearDates, currentYear, ...nextYearDates]);
    }, [currentDay, currentMonth, currentYear]);

    function makeCurrentDay(newSelection, day, month, year){

        if (currentSelection){
            currentSelection.classList.remove(styles["current-selection"]);
        }
        newSelection.classList.add(styles["current-selection"]);
        setCurrentSelection(newSelection);

        setSelectedDay(day);
        setSelectedMonth(month);
        setSelectedYear(year);
    }

    useEffect(() => {
        console.log(dayDates);
        console.log(monthDates);
        console.log(yearDates);
    }, [selectedDay, selectedMonth, selectedYear]);

    
    function leftArrowPress() {
        const currentId = parseInt(currentSelection.id, 10);
        let newId = currentId - 1;
    
        // Handle wrap-around to the previous set of dates
        if (newId <= 0) {
            newId = 0;
    
            const newDayDates = [];
            const newMonthDates = [];
            const newYearDates = [];
    
            for (let i = 0; i < dayDates.length; i++) {
                const newDay = dayDates[i] - 1;
                const prevMonth = monthDates[i] === 1 ? 12 : monthDates[i] - 1;
                const prevYear = monthDates[i] === 1 ? yearDates[i] - 1 : yearDates[i];
                const daysInPrevMonth = findDaysInMonth(prevMonth, prevYear);
    
                if (newDay < 1) {
                    // If day goes below 1, wrap to the previous month's last day
                    newDayDates.push(daysInPrevMonth);
                    newMonthDates.push(prevMonth);
                    newYearDates.push(prevYear);
                } else {
                    newDayDates.push(newDay);
                    newMonthDates.push(monthDates[i]);
                    newYearDates.push(yearDates[i]);
                }
            }
    
            setDayDates(newDayDates);
            setMonthDates(newMonthDates);
            setYearDates(newYearDates);
        }
    
        const newSelection = document.getElementById(newId.toString());
        makeCurrentDay(newSelection, dayDates[newId], monthDates[newId], yearDates[newId]);
    }


    function rightArrowPress(){
        const id = currentSelection.id;
        let newId = parseInt(id, 10) + 1;

        if (newId >= 12){
            newId = 12;

            const newDayDates = [];
            const newMonthDates = [];
            const newYearDates = [];
    
            for (let i = 0; i < dayDates.length; i++) {
                const newDay = dayDates[i] + 1;
                const nextMonth = monthDates[i] === 12 ? 1 : monthDates[i] + 1;
                const nextYear = monthDates[i] === 12 ? yearDates[i] + 1 : yearDates[i];
                const daysInNextMonth = findDaysInMonth(monthDates[i], yearDates[i]);
    
                if (newDay > daysInNextMonth) {
                    // If day goes below 1, wrap to the previous month's last day
                    newDayDates.push(1);
                    newMonthDates.push(nextMonth);
                    newYearDates.push(nextYear);
                } else {
                    newDayDates.push(newDay);
                    newMonthDates.push(monthDates[i]);
                    newYearDates.push(yearDates[i]);
                }
            }
    
            setDayDates(newDayDates);
            setMonthDates(newMonthDates);
            setYearDates(newYearDates);
        }

        const newSelection = document.getElementById(newId.toString());
        makeCurrentDay(newSelection, dayDates[newId], monthDates[newId], yearDates[newId]);
    }

    return(
        <>
        <div className={styles["header"]}>
            <h3>{months[selectedMonth - 1]} {selectedYear}</h3><br></br>
        </div>
        <div className={styles["date-picker"]}>
            <button className={styles["arrow-left"]} onClick={leftArrowPress}>&lt;</button>
            <div className={styles["dates"]}>
                <div className={styles["date-item"]} onClick={() => makeCurrentDay(document.getElementById('0'), dayDates[0], monthDates[0], yearDates[0])} id='0'>
                    <button>{dayDates[0]}</button>
                </div>
                <div className={styles["date-item"]} onClick={() => makeCurrentDay(document.getElementById('1'), dayDates[1], monthDates[1], yearDates[1])} id='1'>
                    <button>{dayDates[1]}</button>
                </div>
                <div className={styles["date-item"]} onClick={() => makeCurrentDay(document.getElementById('2'), dayDates[2], monthDates[2], yearDates[2])} id='2'>
                    <button>{dayDates[2]}</button>
                </div>
                <div className={styles["date-item"]} onClick={() => makeCurrentDay(document.getElementById('3'), dayDates[3], monthDates[3], yearDates[3])} id='3'>
                    <button>{dayDates[3]}</button>
                </div>
                <div className={styles["date-item"]} onClick={() => makeCurrentDay(document.getElementById('4'), dayDates[4], monthDates[4], yearDates[4])} id='4'>
                    <button>{dayDates[4]}</button>
                </div>
                <div className={styles["date-item"]} onClick={() => makeCurrentDay(document.getElementById('5'), dayDates[5], monthDates[5], yearDates[5])} id='5'>
                    <button>{dayDates[5]}</button>
                </div>
                <div className={`${styles["date-item"]} ${styles["today"]} ${styles["current-selection"]}`} onClick={() => makeCurrentDay(document.getElementById('6'), dayDates[6], monthDates[6], yearDates[6])} id='6'>
                    <button>{dayDates[6]}</button>
                </div>
                <div className={styles["date-item"]} onClick={() => makeCurrentDay(document.getElementById('7'), dayDates[7], monthDates[7], yearDates[7])} id='7'>
                    <button>{dayDates[7]}</button>
                </div>
                <div className={styles["date-item"]} onClick={() => makeCurrentDay(document.getElementById('8'), dayDates[8], monthDates[8], yearDates[8])} id='8'>
                    <button>{dayDates[8]}</button>
                </div>
                <div className={styles["date-item"]} onClick={() => makeCurrentDay(document.getElementById('9'), dayDates[9], monthDates[9], yearDates[9])} id='9'>
                    <button>{dayDates[9]}</button>
                </div>
                <div className={styles["date-item"]} onClick={() => makeCurrentDay(document.getElementById('10'), dayDates[10], monthDates[10], yearDates[10])} id='10'>
                    <button>{dayDates[10]}</button>
                </div>
                <div className={styles["date-item"]} onClick={() => makeCurrentDay(document.getElementById('11'), dayDates[11], monthDates[11], yearDates[11])} id='11'>
                    <button>{dayDates[11]}</button>
                </div>
                <div className={styles["date-item"]} onClick={() => makeCurrentDay(document.getElementById('12'), dayDates[12], monthDates[12], yearDates[12])} id='12'>
                    <button>{dayDates[12]}</button>
                </div>
            </div>
            <button className={styles["arrow-right"]} onClick={rightArrowPress}>&gt;</button>
        </div>
        </>
    );

}
export default DatePicker;