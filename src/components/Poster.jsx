import React, { useState, useEffect } from "react";

const Poster = () => {
  // State for countdown timer
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Target date for the countdown (example: New Year)
    const targetDate = new Date("2025-01-01T00:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full bg-black">
      {/* Countdown Box */}
      <div className="flex flex-col justify-center items-center bg-black text-white text-center py-16 md:py-32 px-3">
        <p className="text-lg sm:text-xl md:text-2xl font-bold">Special Offer</p>
        <h2 className="mt-4 text-xl sm:text-3xl md:text-4xl font-bold">
          New Year Sale Up To 50% Off
        </h2>

        {/* Countdown Timer */}
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 mt-6">
          {/* Timer Box */}
          {["days", "hours", "minutes", "seconds"].map((unit, index) => (
            <div
              key={index}
              className="border-2 border-white p-3 sm:p-6 md:p-8 text-center rounded-md"
            >
              <p className="text-xl sm:text-4xl md:text-6xl font-bold">
                {String(timeLeft[unit]).padStart(2, "0")}
              </p>
              <p className="text-sm sm:text-lg md:text-2xl pt-2 capitalize">
                {unit}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Poster Image */}
      <div className="flex justify-center items-center">
        <img
          src="https://images.pexels.com/photos/14327386/pexels-photo-14327386.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Black Friday Sale"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Poster;