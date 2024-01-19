import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const MainLayout = (props) => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const logoutHandler = (e) => {
        e.stopPropagation();
        auth.logout();
        navigate("/");
    };

    return (
        <div className="dark:bg-blue-900 flex min-h-screen">
            <header className="fixed inset-y-0 overflow-y-scroll w-20 sm:w-24 xl:w-80">
                <ul className="flex flex-col xl:w-64 xl:ml-16 p-4 px-4 h-full border-r border-gray-200 dark:border-gray-600">
                    <li className="md:mb-3 flex justify-center xl:justify-start">
                        <a
                            className="cursor-pointer text-black dark:text-white relative hover:bg-gray-200 dark:hover:bg-gray-700 transition h-12 w-12 lg:w-auto lg:px-3 rounded-full inline-flex items-center justify-center lg:justify-start space-x-3"
                            onClick={() => navigate("/")}
                        >
                            {location.pathname === '/' ?
                                <svg
                                    className="w-6 h-6 text-gray-800 dark:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                </svg>
                                : <svg
                                    className="w-6 h-6 text-gray-800 dark:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 8v10a1 1 0 0 0 1 1h4v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5h4a1 1 0 0 0 1-1V8M1 10l9-9 9 9"
                                    />
                                </svg>
                            }
                            <p className={`hidden xl:inline text-xl ${location.pathname === '/' ? 'font-bold' : ''} pr-3 `}>Home</p>
                        </a>
                    </li>
                    <li className="hidden lg:flex md:mb-3 justify-center xl:justify-start">
                        <a
                            className="cursor-pointer text-black dark:text-white relative hover:bg-gray-200 dark:hover:bg-gray-700 transition h-12 w-12 lg:w-auto lg:px-3 rounded-full inline-flex items-center justify-center lg:justify-start space-x-3"
                            onClick={() => navigate("/profile")}
                        >
                            {location.pathname === '/profile' ?
                                <svg
                                    className="w-6 h-6 text-gray-800 dark:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 14 18"
                                >
                                    <path d="M7 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm2 1H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                                </svg>

                                : <svg
                                    className="w-6 h-6 text-gray-800 dark:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 18"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M7 8a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-2 3h4a4 4 0 0 1 4 4v2H1v-2a4 4 0 0 1 4-4Z"
                                    />
                                </svg>

                            }
                            <p className={`hidden xl:inline text-xl ${location.pathname === '/profile' ? 'font-bold' : ''} pr-3 `}>Profile</p>
                        </a>
                    </li>
                    <li className="md:mb-3 flex justify-center xl:justify-start">
                        <a
                            className="cursor-pointer relative bg-blue-500 w-12 xl:w-full h-12 rounded-full flex items-center justify-center hover:bg-blue-600 text-white"
                            onClick={() => navigate("/post/new")}
                        >
                            <svg viewBox="0 0 24 24" className="xl:hidden w-7 h-7 fill-current">
                                <g>
                                    <path d="M8.8 7.2H5.6V3.9c0-.4-.3-.8-.8-.8s-.7.4-.7.8v3.3H.8c-.4 0-.8.3-.8.8s.3.8.8.8h3.3v3.3c0 .4.3.8.8.8s.8-.3.8-.8V8.7H9c.4 0 .8-.3.8-.8s-.5-.7-1-.7zm15-4.9v-.1h-.1c-.1 0-9.2 1.2-14.4 11.7-3.8 7.6-3.6 9.9-3.3 9.9.3.1 3.4-6.5 6.7-9.2 5.2-1.1 6.6-3.6 6.6-3.6s-1.5.2-2.1.2c-.8 0-1.4-.2-1.7-.3 1.3-1.2 2.4-1.5 3.5-1.7.9-.2 1.8-.4 3-1.2 2.2-1.6 1.9-5.5 1.8-5.7z"></path>
                                </g>
                            </svg>
                            <p className="hidden xl:inline text-lg font-semibold">New Post</p>
                        </a>
                    </li>
                    <li className="mt-auto mb-3">
                        <a
                            className="cursor-pointer text-black relative hover:bg-gray-200 dark:hover:bg-gray-700 h-12 w-12 md:h-16 md:w-16 xl:w-full xl:px-3 rounded-full flex items-center justify-center xl:justify-start"
                            onClick={() => navigate("/profile")}
                        >
                            <div className="text-sm xl:ml-3 xl:block">
                                <p className="font-bold dark:text-white">{auth.fullName}</p>
                                <p className="text-gray-500 dark:text-gray-400">@{auth.userName}</p>
                            </div>
                            <svg
                                onClick={logoutHandler}
                                className="inline-block w-6 h-6 text-gray-800 dark:text-white ml-auto mr-1"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 15"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M1 7.5h11m0 0L8 3.786M12 7.5l-4 3.714M12 1h3c.53 0 1.04.196 1.414.544.375.348.586.82.586 1.313v9.286c0 .492-.21.965-.586 1.313A2.081 2.081 0 0 1 15 14h-3"
                                />
                            </svg>

                        </a>
                    </li>
                </ul>
            </header>
            <div className="pl-20 sm:pl-24 xl:pl-80 w-full border-r border-gray-200 dark:border-gray-600 w-full lg:max-w-[984px]">
                {props.children}
            </div>
            <div className="hidden lg:block lg:px-6 lg:w-96 shrink-0">
                <div className="mt-8 bg-gray-100 dark:bg-white/5 rounded-xl">
                    <p className="p-4 font-bold text-xl dark:text-white">My Comments</p>
                            ...
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
