import React from 'react'
import { FiCalendar } from 'react-icons/fi'
import { RootState } from '../../../../../redux/store';
import { useSelector } from 'react-redux';

const Topbar: React.FC = () => {
    const loggedUsersData = useSelector((state: RootState) => state.auth.user);
    return (
        <div className='border-b px-4 mb-4 mt-2 pb-4 border-stone-200'>
            <div className='flex item-center justify-between p-0.5'>
                <div>
                    <span className="text-sm font-bold block">Good Morning, {loggedUsersData?.name}!</span>
                    <span className='text-xs block text-stone-500'>Tuesday, Aug 8th 2023</span>
                </div>
                <button className='flex text-sm items-center gap-2 bg-stone-100 transition-colors hover:bg-violet-100 hover:text-violet-700 px-3 py-1.5 rounded'><FiCalendar /> <span>Prev 6 Months</span></button>
            </div>
        </div>
    )
}

export default Topbar