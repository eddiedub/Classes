import React from 'react';
import { Course, Day, Student } from '../types';
import { DAYS } from '../constants';

interface BreaksDisplayProps {
  courses: Course[];
}

interface Break {
    day: Day;
    startTime: string;
    endTime: string;
    duration: string;
}

const timeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
};

const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const h = parseInt(hours, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const displayHour = h % 12 === 0 ? 12 : h % 12;
    return `${displayHour}:${minutes} ${ampm}`;
};

const minutesToDuration = (minutes: number): string => {
    if (minutes < 60) {
        return `${minutes}m`;
    }
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
};

const calculateBreaks = (courses: Course[], student: Student): Break[] => {
    const studentCourses = courses.filter(c => c.student === student || c.student === Student.Shared);
    const breaks: Break[] = [];

    DAYS.forEach(day => {
        const coursesOnDay = studentCourses
            .filter(c => c.day === day)
            .sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));

        if (coursesOnDay.length > 1) {
            for (let i = 0; i < coursesOnDay.length - 1; i++) {
                const currentCourse = coursesOnDay[i];
                const nextCourse = coursesOnDay[i + 1];

                const breakStart = timeToMinutes(currentCourse.endTime);
                const breakEnd = timeToMinutes(nextCourse.startTime);

                if (breakEnd > breakStart) {
                    breaks.push({
                        day: day,
                        startTime: currentCourse.endTime,
                        endTime: nextCourse.startTime,
                        duration: minutesToDuration(breakEnd - breakStart)
                    });
                }
            }
        }
    });
    return breaks;
};

const BreakTable: React.FC<{ title: string; breaks: Break[] }> = ({ title, breaks }) => (
    <div className="mt-4">
        <h3 className="text-xl font-semibold text-slate-100">{title}</h3>
        <div className="mt-2 overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead className="text-xs text-slate-400 uppercase bg-slate-800">
                    <tr>
                        <th scope="col" className="px-4 py-3">Day</th>
                        <th scope="col" className="px-4 py-3">Break Window</th>
                        <th scope="col" className="px-4 py-3">Duration</th>
                    </tr>
                </thead>
                <tbody>
                    {breaks.map((b, index) => (
                        <tr key={index} className="border-b border-slate-700">
                            <td className="px-4 py-3 font-medium text-slate-200">{b.day}</td>
                            <td className="px-4 py-3">{formatTime(b.startTime)} – {formatTime(b.endTime)}</td>
                            <td className="px-4 py-3">{b.duration}</td>
                        </tr>
                    ))}
                    {breaks.length === 0 && (
                        <tr className="border-b border-slate-700">
                            <td colSpan={3} className="px-4 py-3 text-slate-400 italic">No breaks between classes found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
);

export const BreaksDisplay: React.FC<BreaksDisplayProps> = ({ courses }) => {
    const eddieBreaks = calculateBreaks(courses, Student.Eddie);
    const elieBreaks = calculateBreaks(courses, Student.Elie);

    return (
        <section className="mt-8 p-6 bg-slate-800/50 backdrop-blur-sm rounded-lg shadow-lg border border-slate-700">
            <h2 className="text-2xl font-bold text-slate-100 mb-4">Breaks &amp; Free Time</h2>
            <BreakTable title="Eddie" breaks={eddieBreaks} />
            <BreakTable title="Elie (Brother)" breaks={elieBreaks} />
        </section>
    );
};
