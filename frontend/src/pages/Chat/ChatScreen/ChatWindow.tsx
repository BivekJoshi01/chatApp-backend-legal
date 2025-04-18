import React from 'react';

const ChatWindow :React.FC= () => {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="h-16 bg-violet-100 flex items-center justify-between">
        <div className='flex items-center'>
        <img className="w-10 h-10 m-2 rounded-full" src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" alt="Rounded avatar" />
        Bivek Prasad Joshi
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 bg-white overflow-y-auto p-4">
        Body
      </div>

      {/* Footer */}
      <div className="h-16 bg-gray-200 flex items-center justify-between">
        <div><input type="text" placeholder='Aa'/></div>
      </div>
    </div>
  );
};

export default ChatWindow;
