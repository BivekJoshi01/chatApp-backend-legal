import React, { useEffect, useState } from "react";

interface Props {
    fallback: React.ReactNode;
    children: React.ReactNode;
    minDelay?: number; 
}

const DelayedSuspense: React.FC<Props> = ({ fallback, children, minDelay = 1000 }) => {
    const [delayPassed, setDelayPassed] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDelayPassed(true);
        }, minDelay);
        return () => clearTimeout(timer);
    }, [minDelay]);

    return (
        <React.Suspense fallback={fallback}>
            {delayPassed ? children : fallback}
        </React.Suspense>
    );
};

export default DelayedSuspense;
