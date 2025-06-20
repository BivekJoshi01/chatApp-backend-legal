import React from 'react';
import { FiCalendar } from 'react-icons/fi';
import { RootState } from '../../../../../redux/store';
import { useSelector } from 'react-redux';

const Topbar: React.FC = () => {
  const loggedUsersData = useSelector((state: RootState) => state.auth.user);

  const currentHour = new Date().getHours();

  let greeting = "Time to Unwind 😵,";
  if (currentHour >= 5 && currentHour < 12) {
    greeting = 'Good Morning';
  } else if (currentHour >= 12 && currentHour < 17) {
    greeting = 'Good Afternoon ';
  } else if (currentHour >= 17 && currentHour < 21) {
    greeting = 'Good Evening';
  }

  const today = new Date();
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('en-US', options);

  return (
    <div className='border-b px-4 mb-4 mt-2 pb-4 border-stone-200'>
      <div className='flex item-center justify-between p-0.5'>
        <div>
          <span className="text-sm font-bold block">
            {greeting}, {loggedUsersData?.name}!
          </span>
          <span className='text-xs block text-stone-500'>{formattedDate}</span>
        </div>
        <button className='flex text-sm items-center gap-2 bg-background transition-colors hover:bg-violet-100 hover:text-violet-700 px-3 py-1.5 rounded'>
          <FiCalendar /> <span>Prev 6 Months</span>
        </button>
      </div>
    </div>
  );
}

export default Topbar;
