import React, { useState, useEffect } from 'react';
import { Course, Student } from '../types';
import { DAYS, TIME_SLOTS } from '../constants';
import { CourseModal } from './CourseModal';

interface ScheduleProps {
  courses: Course[];
}

const START_HOUR = 7;
const END_HOUR = 21;
const TOTAL_HOURS = END_HOUR - START_HOUR;

const timeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
};

const getCourseStyles = (course: Course, index: number): React.CSSProperties => {
    const startTimeInMinutes = timeToMinutes(course.startTime);
    const endTimeInMinutes = timeToMinutes(course.endTime);
    const durationInMinutes = endTimeInMinutes - startTimeInMinutes;
    
    const totalScheduleMinutes = TOTAL_HOURS * 60;
    
    const top = ((startTimeInMinutes - START_HOUR * 60) / totalScheduleMinutes) * 100;
    const height = (durationInMinutes / totalScheduleMinutes) * 100;

    return {
        top: `${top}%`,
        height: `${height}%`,
        transitionDelay: `${index * 30}ms`,
    };
};

const hasOverlap = (course: Course, coursesOnSameDay: Course[]): boolean => {
    if (course.student === Student.Shared) return false;

    const otherStudent = course.student === Student.Eddie ? Student.Elie : Student.Eddie;
    const courseStart = timeToMinutes(course.startTime);
    const courseEnd = timeToMinutes(course.endTime);

    return coursesOnSameDay.some(otherCourse => 
        (otherCourse.student === otherStudent || otherCourse.student === Student.Shared) &&
        courseStart < timeToMinutes(otherCourse.endTime) &&
        courseEnd > timeToMinutes(otherCourse.startTime)
    );
};

const getCoursePositionClasses = (course: Course, overlaps: boolean): string => {
    if (course.student === Student.Shared) {
        return 'left-0 w-full';
    }
    if (!overlaps) {
        return 'left-0 w-[calc(100%-4px)] mx-0.5';
    }
    switch (course.student) {
        case Student.Eddie:
            return 'left-0 w-1/2 ml-0.5';
        case Student.Elie:
            return 'right-0 w-1/2 mr-0.5';
        default:
            return '';
    }
};

const getCourseColorClasses = (student: Student): string => {
    switch (student) {
        case Student.Eddie:
            return 'bg-blue-900/50 border-blue-500 text-blue-100 hover:bg-blue-900/80 hover:border-blue-400 focus:ring-blue-400';
        case Student.Elie:
            return 'bg-teal-900/50 border-teal-500 text-teal-100 hover:bg-teal-900/80 hover:border-teal-400 focus:ring-teal-400';
        case Student.Shared:
            return 'bg-indigo-900/50 border-indigo-500 text-indigo-100 hover:bg-indigo-900/80 hover:border-indigo-400 focus:ring-indigo-400';
        default:
            return 'bg-slate-700 border-slate-600';
    }
};


const CourseBlock: React.FC<{ course: Course; isVisible: boolean; index: number; overlaps: boolean; onClick: () => void; }> = ({ course, isVisible, index, overlaps, onClick }) => (
    <button
        style={getCourseStyles(course, index)}
        onClick={onClick}
        className={`
            absolute p-1 sm:p-2 rounded-lg shadow-lg border overflow-hidden text-left text-[10px] sm:text-xs cursor-pointer
            transition-all duration-500 ease-in-out backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 z-10
            ${getCoursePositionClasses(course, overlaps)} 
            ${getCourseColorClasses(course.student)}
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}
        aria-label={`${course.code}: ${course.title} for ${course.student}. Click for details.`}
    >
        <p className="font-bold">{course.code}</p>
        <p className="truncate">{course.title}</p>
    </button>
);

const CurrentTimeIndicator: React.FC = () => {
    const [topPercentage, setTopPercentage] = useState<number | null>(null);

    useEffect(() => {
        const updatePosition = () => {
            const now = new Date();
            const currentMinutes = now.getHours() * 60 + now.getMinutes();
            const percentage = ((currentMinutes - START_HOUR * 60) / (TOTAL_HOURS * 60)) * 100;

            if (percentage >= 0 && percentage <= 100) {
                setTopPercentage(percentage);
            } else {
                setTopPercentage(null);
            }
        };

        updatePosition();
        const timer = setInterval(updatePosition, 60000);
        return () => clearInterval(timer);
    }, []);

    if (topPercentage === null) return null;

    return (
        <div className="absolute w-full pointer-events-none z-20" style={{ top: `${topPercentage}%` }}>
            <div className="h-0.5 bg-cyan-400"></div>
            <div className="w-2 h-2 rounded-full bg-cyan-400 absolute -left-1 -top-[3px] shadow shadow-cyan-300/50"></div>
        </div>
    );
};

export const Schedule: React.FC<ScheduleProps> = ({ courses }) => {
    const [isMounted, setIsMounted] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const todayIndex = new Date().getDay() - 1; // Monday is 0, ...

    useEffect(() => {
        const timer = setTimeout(() => setIsMounted(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const handleCourseClick = (course: Course) => {
        setSelectedCourse(course);
    };

    const handleCloseModal = () => {
        setSelectedCourse(null);
    };

    return (
        <>
            <div className="relative grid grid-cols-[auto_repeat(5,1fr)] bg-slate-800" role="grid">
                {/* Time Gutter */}
                <div className="pr-4 py-2 text-right text-xs text-slate-400">
                    {TIME_SLOTS.map(time => (
                        <div key={time} className="h-16 flex items-start justify-end -mt-2">
                            <span>{time}</span>
                        </div>
                    ))}
                </div>

                {/* Day Columns */}
                {DAYS.map((day, dayIndex) => {
                     const coursesForDay = courses.filter(course => course.day === day);
                     return (
                        <div key={day} className="relative border-l border-slate-700" role="gridcell" aria-label={day}>
                             <div className="sticky top-0 bg-slate-800 z-10 p-2 text-center font-semibold text-sm border-b border-slate-700 text-slate-300">
                                {day}
                            </div>

                            <div className="absolute inset-0 top-12">
                                 {/* Grid Lines */}
                                {TIME_SLOTS.slice(1).map(time => (
                                    <div key={`${day}-${time}`} className="h-16 border-t border-slate-700/50 pointer-events-none"></div>
                                ))}
                            </div>

                            <div className="absolute inset-0 top-12">
                                {/* Courses for the day */}
                                {coursesForDay.map((course, courseIndex) => {
                                    const overlaps = hasOverlap(course, coursesForDay);
                                    return <CourseBlock key={course.id} course={course} isVisible={isMounted} index={courseIndex} overlaps={overlaps} onClick={() => handleCourseClick(course)} />
                                })}

                                {/* Current Time Indicator for Today */}
                                {dayIndex === todayIndex && <CurrentTimeIndicator />}
                            </div>
                        </div>
                    )
                })}
            </div>
             {selectedCourse && <CourseModal course={selectedCourse} onClose={handleCloseModal} />}
        </>
    );
};
