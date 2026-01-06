// DateDisplay.tsx
import React from 'react';

interface DateDisplayProps {
    /** The ISO date string (e.g., "2026-01-04T08:08:24.516Z") or a Date object */
    value: string | Date;
    /** Optional CSS class for styling */
    className?: string;
}

export const DateDisplay: React.FC<DateDisplayProps> = ({ value, className = '' }) => {
    // 1. Handle potential invalid inputs safely
    if (!value) return null;

    const date = new Date(value);

    // 2. Check if the date is valid
    if (isNaN(date.getTime())) {
        return <span className={className}>Invalid Date</span>;
    }

    // 3. Format the date to "DD Month YYYY" (e.g., 25 May 2023)
    const formattedDate = new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(date);

    // 4. Return semantic HTML
    return (
        <time dateTime={date.toISOString()} className={className}>
            {formattedDate}
        </time>
    );
};