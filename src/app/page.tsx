'use client'

import React, { useState, useEffect } from 'react';


interface Quote {
  content: string;
  author: string;
}

const FocusApp: React.FC = () => {
  const [dailyFocus, setDailyFocus] = useState<string>('');
  const [currentQuote, setCurrentQuote] = useState<Quote>({ content: '', author: '' });
  const [backgroundUrl, setBackgroundUrl] = useState<string>('');
  const [yearCountdown, setYearCountdown] = useState<string>('');
  const [dayCountdown, setDayCountdown] = useState<string>('');

  const fetchBackgroundImage = async () => {
    // Fetch a random landscape image from Unsplash API
    // Placeholder code for fetching background image
    const imageUrl = 'https://source.unsplash.com/random/1920x1080?landscape';
    setBackgroundUrl(imageUrl);
  };

  const fetchQuote = async () => {
    // Fetch a motivational quote from Quotable API
    // Placeholder code for fetching quote
    const response = await fetch('https://api.quotable.io/random');
    const data = await response.json();
    setCurrentQuote({ content: data.content, author: data.author, tags: data.tags});
  };

  const getMinutesRemainingInYear = (): string => {
    // Calculate and return remaining time until the end of the year
    // Placeholder code for year countdown
    return '365,000:00';
  };

  const getMinutesRemainingInDay = (): string => {
    // Calculate and return remaining time until the end of the current day
    // Placeholder code for day countdown
    return '1,440:00';
  };

  useEffect(() => {
    fetchBackgroundImage();
    fetchQuote();
    setYearCountdown(getMinutesRemainingInYear());
    setDayCountdown(getMinutesRemainingInDay());
    const yearInterval = setInterval(() => setYearCountdown(getMinutesRemainingInYear()), 1000);
    const dayInterval = setInterval(() => setDayCountdown(getMinutesRemainingInDay()), 1000);

    return () => {
      clearInterval(yearInterval);
      clearInterval(dayInterval);
    };
  }, []);

  return (
    <div style={{ backgroundImage: `url(${backgroundUrl})`, height: '100vh', color: 'white', textShadow: '2px 2px 4px #000000' }}>
      <div style={{ textAlign: 'center', paddingTop: '20px' }}>
        <div>Year Countdown: {yearCountdown}</div>
        <div>Day Countdown: {dayCountdown}</div>
      </div>
      <div style={{ textAlign: 'center', marginTop: '200px', color: 'white', textShadow: '2px 2px 4px #000000'}}>
        <div>Today's Focus:</div>
        <input type="text" value={dailyFocus} onChange={(e) => setDailyFocus(e.target.value)} style={{ color: 'black' }} />
      </div>
      <div style={{ textAlign: 'center', position: 'absolute', bottom: '100px', width: '100%', fontSize: '30px', textShadow: '2px 2px 4px #000000'}}>
        <div>{currentQuote.content}</div>
        <div>- {currentQuote.author}</div>
      </div>
    </div>
  );
};

export default FocusApp;
