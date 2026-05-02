import React, { Suspense, lazy } from 'react';
import Loader from '../components/Loader';

// Lazy load the heavy animation component
const TimelineComponent = lazy(() => import('../components/Timeline'));

const Timeline = () => {
    return (
        <div className="min-h-screen">
            <Suspense fallback={<Loader />}>
                <TimelineComponent />
            </Suspense>
        </div>
    );
};

export default Timeline;

