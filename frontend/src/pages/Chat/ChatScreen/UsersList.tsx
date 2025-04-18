import React, { useState } from "react";
import { useGetAllUser } from "../../../api/auth/auth-hook";
import { FiPenTool, FiSearch } from "react-icons/fi";

const UsersList: React.FC = () => {
    const { data: userData } = useGetAllUser();
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

    return (
        <div className="p-1">
            <div className=" h-16 flex items-center justify-between">
                <div className="text-black font-semibold">Chat</div>
                <div><FiPenTool /></div>
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
                {userData?.map((data: any) => {
                    console.log("🚀 ~ {userData?.map ~ data:", data);
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
    );
};

export default UsersList;
