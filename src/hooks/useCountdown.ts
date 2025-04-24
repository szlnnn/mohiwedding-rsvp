import { useEffect, useState } from 'react';

const useCountdown = (targetDate: string) => {
    const countDownDate = new Date(targetDate).getTime();

    const [timeLeft, setTimeLeft] = useState(() => getTimeRemaining());

    function getTimeRemaining() {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        return {
            days: Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((distance / (1000 * 60)) % 60),
            seconds: Math.floor((distance / 1000) % 60)
        };
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(getTimeRemaining());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return timeLeft;
};

export default useCountdown;
