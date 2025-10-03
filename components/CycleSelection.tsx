
import React from 'react';
import { Cycle } from '../types';
import { AtomIcon, BeakerIcon, FileTextIcon } from './Icons';

interface CycleSelectionProps {
  onSelectCycle: (cycle: Cycle) => void;
  fileNames: string[];
}

const CycleSelection: React.FC<CycleSelectionProps> = ({ onSelectCycle, fileNames }) => {
  return (
    <div className="flex-grow flex flex-col justify-center items-center p-4 animate-fade-in">
      <div className="w-full max-w-2xl bg-secondary shadow-2xl rounded-2xl p-8 space-y-6 text-center border border-slate-600">
        <h2 className="text-3xl font-bold text-text-primary">Select Your Academic Cycle</h2>
        <p className="text-text-secondary">
          Please specify which academic cycle's syllabus you'd like to ask about.
        </p>

        <div className="text-left space-y-2">
            <h3 className="font-semibold text-text-primary">Analyzed Files:</h3>
            <ul className="max-h-24 overflow-y-auto bg-slate-800 p-3 rounded-md border border-slate-700">
              {fileNames.map((name, index) => (
                <li key={index} className="flex items-center space-x-2 text-sm text-text-secondary truncate" title={name}>
                  <FileTextIcon className="w-4 h-4 text-accent flex-shrink-0" />
                  <span>{name}</span>
                </li>
              ))}
            </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => onSelectCycle(Cycle.PHYSICS)}
            className="group flex flex-col items-center justify-center p-6 bg-slate-800/50 rounded-lg border border-slate-600 hover:border-accent hover:bg-slate-700/50 transition-all duration-300 transform hover:-translate-y-1"
            aria-label="Select Physics Cycle"
          >
            <AtomIcon className="w-12 h-12 mb-3 text-slate-400 group-hover:text-accent transition-colors" />
            <span className="text-lg font-semibold text-text-primary">Physics Cycle</span>
          </button>
          <button
            onClick={() => onSelectCycle(Cycle.CHEMISTRY)}
            className="group flex flex-col items-center justify-center p-6 bg-slate-800/50 rounded-lg border border-slate-600 hover:border-accent hover:bg-slate-700/50 transition-all duration-300 transform hover:-translate-y-1"
            aria-label="Select Chemistry Cycle"
          >
            <BeakerIcon className="w-12 h-12 mb-3 text-slate-400 group-hover:text-accent transition-colors" />
            <span className="text-lg font-semibold text-text-primary">Chemistry Cycle</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CycleSelection;
