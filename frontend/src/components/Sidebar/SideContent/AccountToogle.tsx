import React, { useState, useEffect, useRef } from 'react';
import { BsChevronExpand } from "react-icons/bs";
import PopoverCustom from './AccountToogle/PopoverCustom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

const AccountToogle: React.FC = () => {
    const loggedUsersData = useSelector((state: RootState) => state.auth.user);

    const [isPopoverVisible, setPopoverVisible] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const togglePopover = () => {
        setPopoverVisible((prevState) => !prevState);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
            setPopoverVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='relative' ref={wrapperRef}>
            <div className="border-b mt-2 pb-4 border-stone-300">
                <button
                    onClick={togglePopover}
                    className="flex p-0.5 hover:bg-backgroundAlt rounded transition-colors relative gap-2 w-full items-center"
                >
                    <img
                        src="https://api.dicebear.com/9.x/notionists/svg"
                        alt="avatar"
                        className='size-8 rounded shrink-0 bg-violet-500 shadow'
                    />
                    <div className='text-start'>
                        <span className="text-sm font-semibold block truncate">{loggedUsersData?.name}</span>

                        <span className='text-xs block text-stone-500'>{loggedUsersData?.email}</span>
                    </div>
                    <BsChevronExpand className='text-xs ml-auto mr-2' />
                </button>
                <PopoverCustom isPopoverVisible={isPopoverVisible} onClose={() => setPopoverVisible(false)} />
            </div>
        </div>
    );
};

export default AccountToogle;
