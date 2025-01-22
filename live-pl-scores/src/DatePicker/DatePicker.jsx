import styles from './DatePicker.module.css';
import React, {useEffect, useState, useRef} from "react";


function DatePicker({onDateChange}){

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

    const leftInterval = useRef(null);
    const rightInterval = useRef(null);
    const initialDelayTimeoutRef = useRef(null);

  
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

        setSelectedDay(currentDay);
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

    useEffect(() => {
        onDateChange?.(selectedDay, selectedMonth, selectedYear)
    }, [selectedDay, selectedMonth, selectedYear]);

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

    // useEffect(() => {
    //     console.log(dayDates);
    //     console.log(monthDates);
    //     console.log(yearDates);
    // }, [selectedDay, selectedMonth, selectedYear]);

    
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
                <button className={styles["arrow-left"]} onClick={leftArrowPress}>&lt;
                </button>
            <div className={styles["dates"]}>
                
             {dayDates.map((dayDate, index) => (
                <div key={index}
                className={`${styles["date-item"]} ${index === 6 ? `${styles["today"]} ${styles["current-selection"]}` : ""}`}
                onClick={() => makeCurrentDay(document.getElementById(index.toString()), dayDates[index], monthDates[index], yearDates[index]
                )}
                id={index.toString()}
                >
                    <button>{dayDate}</button>
                </div>
             ))}

            </div>
                <button className={styles["arrow-right"]} onClick={rightArrowPress}>&gt;
                </button>
            </div>
        </>
    );

}
export default DatePicker;