import { useEffect, useState } from "react";

const CountUp = ({ target, duration = 1000 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!target) return;

        let start = 0;
        const increment = target / (duration / 16);

        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [target, duration]);

    return count;
};
export default CountUp;
