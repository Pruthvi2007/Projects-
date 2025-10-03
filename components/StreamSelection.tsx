
import React from 'react';
import { Stream } from '../types';
import { BoltIcon, CodeIcon, GearIcon, BuildingIcon } from './Icons';

interface StreamSelectionProps {
  onSelectStream: (stream: Stream) => void;
}

const StreamCard: React.FC<{
    stream: Stream;
    icon: React.ReactNode;
    onSelect: () => void;
    disabled?: boolean;
}> = ({ stream, icon, onSelect, disabled = false }) => {
    return (
        <button
            onClick={onSelect}
            disabled={disabled}
            className={`
                group flex flex-col items-center justify-center p-6 bg-slate-800/50 rounded-lg 
                border border-slate-600 transition-all duration-300 transform 
                ${disabled 
                    ? 'cursor-not-allowed opacity-50' 
                    : 'hover:border-accent hover:bg-slate-700/50 hover:-translate-y-1'}
            `}
            aria-label={`Select ${stream} Stream`}
        >
            {icon}
            <span className="mt-3 text-lg font-semibold text-text-primary">{stream}</span>
            {disabled && <span className="text-xs text-slate-400 mt-1">(Coming Soon)</span>}
        </button>
    );
};


const StreamSelection: React.FC<StreamSelectionProps> = ({ onSelectStream }) => {
  return (
    <div className="flex-grow flex flex-col justify-center items-center p-4 animate-fade-in">
      <div className="w-full max-w-2xl bg-secondary shadow-2xl rounded-2xl p-8 space-y-6 text-center border border-slate-600">
        <h2 className="text-3xl font-bold text-text-primary">Select Your Engineering Stream</h2>
        <p className="text-text-secondary">
          Choose your branch to get started. Syllabus data is currently available for the EEE stream.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <StreamCard 
                stream={Stream.EEE}
                icon={<BoltIcon className="w-12 h-12 text-slate-400 group-hover:text-accent transition-colors" />}
                onSelect={() => onSelectStream(Stream.EEE)}
            />
            <StreamCard 
                stream={Stream.CSE}
                icon={<CodeIcon className="w-12 h-12 text-slate-400 group-hover:text-accent transition-colors" />}
                onSelect={() => {}}
                disabled
            />
            <StreamCard 
                stream={Stream.MECH}
                icon={<GearIcon className="w-12 h-12 text-slate-400 group-hover:text-accent transition-colors" />}
                onSelect={() => {}}
                disabled
            />
            <StreamCard 
                stream={Stream.CIVIL}
                icon={<BuildingIcon className="w-12 h-12 text-slate-400 group-hover:text-accent transition-colors" />}
                onSelect={() => {}}
                disabled
            />
        </div>
      </div>
    </div>
  );
};

export default StreamSelection;
