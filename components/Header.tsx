
import React from 'react';
import { LogoIcon } from './Icons';

export const Header: React.FC = () => {
    return (
        <header className="py-4 px-6 border-b border-slate-700 bg-secondary/30 backdrop-blur-sm sticky top-0 z-10">
            <div className="container mx-auto flex items-center space-x-3">
                <LogoIcon className="w-8 h-8 text-accent"/>
                <h1 className="text-xl font-bold text-text-primary">VTU Syllabus AI Assistant</h1>
            </div>
        </header>
    );
};
