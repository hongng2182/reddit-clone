import React, { useState } from 'react';
import { DropdownIcon } from './icons';

interface ExpandCollapseProps {
    title: string;
    children: React.ReactNode;
}

function ExpandCollapse({ title, children }: ExpandCollapseProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div>
            <div
                className="flex items-center justify-between cursor-pointer p-3"
                onClick={handleToggle}
            >
                <h2 className="label-md">{title}</h2>
                <span className={`flex-center transition-transform duration-300  ${isExpanded ? 'rotate-180' : ''}`}><DropdownIcon className='flex-center' width={24} height={12} /></span>
            </div>
            <div
                className={`overflow-hidden transition-all ${isExpanded ? 'max-h-[1000px] py-2' : 'max-h-0 py-0'
                    }`}
            >
                <div className="transition-all px-3">{isExpanded && children}</div>
            </div>
        </div>
    );
};

export default ExpandCollapse;