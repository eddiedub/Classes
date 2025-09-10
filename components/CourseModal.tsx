import React, { useEffect, useState } from 'react';
import { Course } from '../types';

interface CourseModalProps {
  course: Course;
  onClose: () => void;
}

const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const h = parseInt(hours, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const displayHour = h % 12 === 0 ? 12 : h % 12;
    return `${displayHour}:${minutes} ${ampm}`;
};

export const CourseModal: React.FC<CourseModalProps> = ({ course, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger animation
        const timer = setTimeout(() => setIsVisible(true), 10);

        // Handle escape key
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 200); // Wait for animation to finish
    };
    
    const timeString = `${formatTime(course.startTime)} - ${formatTime(course.endTime)} ${course.daysStr}`;

    return (
        <div 
            className={`fixed inset-0 bg-black/70 flex items-center justify-center z-50 transition-opacity duration-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            onClick={handleClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="course-title"
        >
            <div 
                className={`bg-slate-800 border border-slate-700 rounded-lg shadow-2xl p-6 w-full max-w-md m-4 transition-all duration-200 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-start">
                    <div>
                        <h2 id="course-title" className="text-2xl font-bold text-cyan-400">{course.code}: {course.title}</h2>
                        <div className="mt-2 px-2 py-0.5 inline-block bg-green-800/50 border border-green-600 rounded-md text-green-300 text-xs font-semibold">
                            REGISTERED
                        </div>
                    </div>
                    <button onClick={handleClose} className="text-slate-400 hover:text-slate-100 transition-colors" aria-label="Close dialog">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                
                <div className="mt-4 border-t border-slate-700 pt-4 text-sm space-y-2 text-slate-300">
                    <p><span className="font-semibold text-slate-400 w-28 inline-block">Section:</span> {course.section} | <span className="font-semibold">Session:</span> {course.session} | <span className="font-semibold">Subtype:</span> {course.subtype}</p>
                    <p><span className="font-semibold text-slate-400 w-28 inline-block">Type:</span> {course.courseType} | <span className="font-semibold">Duration:</span> {course.dateDuration}</p>
                    <p><span className="font-semibold text-slate-400 w-28 inline-block">Credits:</span> {course.credits.toFixed(2)} | <span className="font-semibold">Credit Type:</span> {course.creditType}</p>
                    <p className="font-bold text-base mt-3 pt-3 border-t border-slate-700/50">{timeString}</p>
                    <p><span className="font-semibold text-slate-400 w-28 inline-block">Location:</span> {course.location}</p>
                    <p><span className="font-semibold text-slate-400 w-28 inline-block">Instructor:</span> {course.instructor}</p>
                </div>
            </div>
        </div>
    );
};
