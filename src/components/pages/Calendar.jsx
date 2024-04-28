// Calendar.jsx
import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isSameDay, addMonths, subMonths, getYear, setMonth, setYear } from 'date-fns';
import Schedule from './Schedule';

const Calendar = ({ events, onDateSelect }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [hoveredDate, setHoveredDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [doubleClickedDate, setDoubleClickedDate] = useState(null);

  const firstDayOfMonth = startOfMonth(currentMonth);
  const lastDayOfMonth = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth });
  const firstDayIndex = getDay(firstDayOfMonth);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    onDateSelect(date);
  };

  const handleDateHover = (date) => {
    setHoveredDate(date);
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleMonthChange = (e) => {
    const selectedMonth = parseInt(e.target.value);
    setCurrentMonth((prevMonth) => setMonth(prevMonth, selectedMonth));
  };

  const handleYearChange = (e) => {
    const selectedYear = parseInt(e.target.value);
    setCurrentMonth((prevMonth) => setYear(prevMonth, selectedYear));
  };

  const months = Array.from({ length: 12 }, (_, index) => ({
    value: index,
    label: format(new Date(getYear(currentMonth), index), 'MMMM'),
  }));

  const years = Array.from({ length: 301 }, (_, index) => {
    const year = 1800 + index;
    return {
      value: year,
      label: year.toString(),
    };
  });

  return (
    <div className='p-8 flex justify-center'>
      <div className='max-w-2xl p-6 border-2 border-blue-500 rounded-lg w-1/2 mr-4'>
        <div className='flex justify-between mb-4'>
          <button onClick={handlePrevMonth}>Previous Month</button>
          <div className='flex items-center'>
            <select value={currentMonth.getMonth()} onChange={handleMonthChange}>
              {months.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
            <select value={getYear(currentMonth)} onChange={handleYearChange}>
              {years.map((year) => (
                <option key={year.value} value={year.value}>
                  {year.label}
                </option>
              ))}
            </select>
          </div>
          <button onClick={handleNextMonth}>Next Month</button>
        </div>
        <div className='grid grid-cols-7 gap-2 bg-gray-200 p-4 mb-4'>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className='text-center font-bold'>
              {day}
            </div>
          ))}
        </div>
        <div className='grid grid-cols-7 gap-2'>
          {Array.from({ length: firstDayIndex }, (_, i) => (
            <div key={`empty-${i}`}></div>
          ))}
          {daysInMonth.map((day, index) => (
            <div
              key={index}
              className={`text-center border border-gray-300 p-4 cursor-pointer relative ${
                isSameDay(day, new Date()) ? 'bg-blue-200' : ''
              } ${isSameDay(day, selectedDate) ? 'bg-green-200' : ''}`}
              onClick={() => handleDateClick(day)}
              onMouseEnter={() => handleDateHover(day)}
              onDoubleClick={() => handleDateDoubleClick(day)}
            >
              {format(day, 'd')}
              {events &&
                events.map((event) => isSameDay(event.date, day) && <div key={event.id} className='bg-green-200'>{event.title}</div>)}
              {hoveredDate && isSameDay(hoveredDate, day) && (
                <div className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center text-white'>
                  {/* Your content to display on hover */}
                </div>
              )}
              {doubleClickedDate && isSameDay(doubleClickedDate, day) && (
                <div className='absolute top-0 left-0 w-full h-full bg-blue-200 flex items-center justify-center text-white'>
                  Double clicked on {format(day, 'MMMM d, yyyy')}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className='max-w-xl p-6 border-2 border-red-500 rounded-lg w-1/2 justify-center'>
        <div className='mb-2 flex justify-center '>
          <h1>Appointments</h1>
        </div>
        <div className='flex justify-center'>
          <h2>{selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Select a Date'}</h2>
        </div>
        <Schedule selectedDate={selectedDate} />
      </div>
    </div>
  );
};

export default Calendar;
