import React, { useState } from "react";
import { useGetAllUser } from "../../../api/auth/auth-hook";
import { FiPenTool, FiSearch } from "react-icons/fi";
import GroupChatPop from "./GroupChat/GroupChatPop";

const UsersList: React.FC = () => {
    const { data: userData } = useGetAllUser();
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [groupClick, setgroupClick] = useState(false);

    return (
        <>
            <div className="p-1">
                <div className=" h-16 flex items-center justify-between">
                    <div className="text-black font-semibold">Chat</div>
                    <div className="relative" onClick={() => setgroupClick(true)}><FiPenTool />
                        {groupClick && (
                            <div className="absolute bg-white p-3 z-50 rounded w-100 h-100 shadow-sm">
                                <div className="flex flex-col gap-1">
                                    {userData?.users?.map((data: any) => {
                                        const isSelected = selectedUserId === data?._id;

                                        return (
                                            <div
                                                key={data?._id}
                                                onClick={() => setSelectedUserId(data?._id)}
                                                className={`flex gap-1.5 items-center p-1.5 rounded cursor-pointer transition-colors ${isSelected
                                                    ? "bg-violet-500 text-white"
                                                    : "bg-violet-100 hover:bg-violet-300"
                                                    }`}
                                            >
                                                <img
                                                    className="w-10 h-10 rounded-full"
                                                    src={data?.pic}
                                                    alt="Rounded avatar"
                                                />
                                                <div>{data?.name} </div>
                                            </div>
                                        );
                                    })}
                                    <GroupChatPop />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mb-2">

                    <div className="bg-stone-200  relative rounded flex items-center px-2 py-1.5 text-sm">
                        <FiSearch className="mr-2" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full bg-transparent placeholder:text-stone-400 focus:outline-none"
                        />
                    </div>

                </div>

                <div className="flex gap-1 flex-col">
                    {userData?.users?.map((data: any) => {
                        const isSelected = selectedUserId === data?._id;

                        return (
                            <div
                                key={data?._id}
                                onClick={() => setSelectedUserId(data?._id)}
                                className={`flex gap-1.5 items-center p-1.5 rounded cursor-pointer transition-colors ${isSelected
                                    ? "bg-violet-500 text-white"
                                    : "bg-violet-100 hover:bg-violet-300"
                                    }`}
                            >
                                <img
                                    className="w-10 h-10 rounded-full"
                                    src={data?.pic}
                                    alt="Rounded avatar"
                                />
                                <div>{data?.name} </div>
                            </div>
                        );
                    })}
                </div>
            </div>

        </>
    );
};

export default UsersList;
