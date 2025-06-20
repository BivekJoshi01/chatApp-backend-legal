import React, { useEffect } from "react";
import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar/Sidebar";
import Plan from "../components/Sidebar/SideContent/Plan";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/reducer/authSlice";
import { useGetLoggedUserData } from "../api/auth/auth-hook";
import "./layout.css";

const AdminPageLayout: React.FC = () => {
    const dispatch = useDispatch();

    const { data: loggedUserData } = useGetLoggedUserData();

    useEffect(() => {
        if (loggedUserData) {
            dispatch(setUser(loggedUserData?.user));
        }
    }, [loggedUserData, dispatch]);

    return (
        <main className="text-text bg-background min-h-screen ">
            <main className="grid gap-4 p-4 grid-cols-[280px_1fr]">
                <div>
                    <div className="overflow-y-scroll sticky top-4 h-[calc(100vh-32px-48px)] scrollbar-custom">
                        <Sidebar />
                    </div>
                    <Plan />
                </div>
                <div className="bg-foreground rounded-lg shadow h-full overflow-y-auto relative">
                    <div className="h-[calc(100vh-32px)] overflow-y-auto">
                        <Outlet />
                        <div className="absolute bottom-0 right-1 text-sm text-stone-400">
                            Powered By: Bivek Prasad Joshi
                        </div>
                    </div>
                </div>

            </main>
        </main>
    );
};

export default AdminPageLayout;
