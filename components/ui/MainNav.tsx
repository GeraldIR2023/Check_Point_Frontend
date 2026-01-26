"use client";

import Link from "next/link";
import Logo from "./Logo";
import Image from "next/image";
import { logout } from "@/actions/logout-action";
import { useState } from "react";
import {
    Bars3Icon,
    ChevronDownIcon,
    ShoppingCartIcon,
    UserCircleIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import { CartIcon } from "../cart/CartIcon";
import SlideCart from "../cart/SlideCart";

interface MainNavProps {
    isAuth: boolean;
    userTag: string;
    isAdmin: boolean;
}

export default function MainNav({ isAuth, userTag, isAdmin }: MainNavProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);

    //^Dropdown Consoles
    const consoles = [
        { name: "PlayStation", href: "/catalog?platform=PS5" },
        { name: "Xbox", href: "/catalog?platform=Xbox" },
        { name: "Nintendo", href: "/catalog?platform=Nintendo" },
    ];

    return (
        <header>
            <nav className="bg-[#2D2A2E] fixed top-0 start-0 w-full h-14 z-50 border-b border-[#3E2723]/50 md:h-16">
                <div className="h-full max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8">
                    <Link
                        href="/"
                        className="flex items-center space-x-3 group text-[#F8F9FA] shrink-0"
                    >
                        <Image
                            src="/boxIcon.png"
                            alt="Check Point Logo"
                            width={50}
                            height={50}
                            className="rounded-md group-hover:scale-110 transition-transform"
                        />
                        <Logo />
                    </Link>

                    {/*Hamburguer/X with heroIcons for movile devices*/}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-[#F8F9FA] rounded-md hover:bg-[#3E2723] md:hidden transition-colors"
                    >
                        <span className="sr-only">Open Menu</span>
                        {isMenuOpen ? (
                            <XMarkIcon className="w-7 h-7" />
                        ) : (
                            <Bars3Icon className="w-7 h-7" />
                        )}
                    </button>

                    <div
                        className={`${
                            isMenuOpen ? "block" : "hidden"
                        } absolute top-full left-0 w-full bg-[#2D2A2E] md:static md:block md:w-auto`}
                    >
                        <ul className="flex flex-col p-4 mt-4 font-bold uppercase text-[12px] tracking-[0.2em] text-[#F8F9FA]/90 font-(family-name:--font-bangers) md:items-center md:p-0 md:flex-row md:space-x-8 md:mt-0 md:border-0 ">
                            <li>
                                <Link
                                    href={"/"}
                                    className="block py-2 px-3 hover:text-[#F47321] transition-colors"
                                >
                                    Home
                                </Link>
                            </li>
                            {/*Dropdown Games for console*/}
                            <li className="relative">
                                <button
                                    onClick={() =>
                                        setIsDropdownOpen(!isDropdownOpen)
                                    }
                                    onMouseEnter={() => setIsDropdownOpen(true)}
                                    className="flex items-center justify-between w-full py-2 px-3 hover:text-[#F47321] transition-colors uppercase md:p-0"
                                >
                                    Games
                                    <ChevronDownIcon
                                        className={`w-5 h-5 ms-1 transition-transform duration-200 ${
                                            isDropdownOpen ? "rotate-180" : ""
                                        }`}
                                    />
                                </button>
                                <div
                                    onMouseLeave={() =>
                                        setIsDropdownOpen(false)
                                    }
                                    className={`${
                                        isDropdownOpen ? "block" : "hidden"
                                    } z-10 font-normal bg-[#2D2A2E] divide-y divide-[#3E2723] rounded-lg shadow-xl w-44 mt-2 border border-[#3E2723] md:absolute`}
                                >
                                    <ul className="py-2 text-xs text-[#F8F9FA]/80">
                                        {consoles.map((console) => (
                                            <li key={console.name}>
                                                <Link
                                                    href={console.href}
                                                    className="block px-4 py-3 hover:bg-[#3E2723] hover:text-[#F47321] transition-all"
                                                    onClick={() => {
                                                        setIsDropdownOpen(
                                                            false,
                                                        );
                                                        setIsMenuOpen(false);
                                                    }}
                                                >
                                                    {console.name}
                                                </Link>
                                            </li>
                                        ))}
                                        <li>
                                            <Link
                                                href="/1"
                                                className="block px-4 py-3 hover:bg-[#3E2723] hover:text-[#F47321] transition-all"
                                            >
                                                All Games
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li>
                                <Link
                                    href={`/2`}
                                    className="block py-2 px-3 hover:text-[#F47321] transition-colors"
                                >
                                    Consoles
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={"/3"}
                                    className="block py-2 px-3 hover:text-[#F47321] transition-colors"
                                >
                                    Accesories
                                </Link>
                            </li>
                        </ul>
                    </div>
                    {/*Login/Profile area*/}
                    {/*TODO: Mobile login button  */}
                    <div className="flex items-center space-x-4">
                        {!isAuth ? (
                            <Link
                                href={"/users/login"}
                                className=" bg-[#F47321] text-[#2D2A2E] px-4 py-2 rounded-md font-black uppercase text-[10px] tracking-tighter hover:scale-105 transition-all"
                            >
                                Login
                            </Link>
                        ) : (
                            <div className="relative">
                                <button
                                    onClick={() =>
                                        setIsUserMenuOpen(!isUserMenuOpen)
                                    }
                                    className="flex items-center text-[#F8F9FA] hover:text-[#F47321] transition-colors"
                                >
                                    <UserCircleIcon className="w-8 h-8" />
                                    <ChevronDownIcon
                                        className={`w-4 h-4 ms-1 transition-transform ${
                                            isUserMenuOpen ? "rotate-180" : ""
                                        }`}
                                    />
                                </button>
                                {/*User DropDown*/}
                                {isUserMenuOpen && (
                                    <div
                                        onMouseLeave={() =>
                                            setIsUserMenuOpen(false)
                                        }
                                        className="absolute right-0 mt-2 w-48 bg-[#2D2A2E] border border-[#3E2723] rounded-lg shadow-2xl z-50 overflow-hidden"
                                    >
                                        <ul className="py-1 text-[10px] uppercase font-bold tracking-widest">
                                            <li>
                                                <Link
                                                    href="/users/profile"
                                                    className="block px-4 py-3 hover:bg-[#3E2723] text-[#F8F9FA]"
                                                >
                                                    {userTag}
                                                </Link>
                                            </li>
                                            {/*Admin Botton*/}
                                            {isAdmin && (
                                                <li>
                                                    <Link
                                                        href={"/admin"}
                                                        className="block px-4 py-3 text-orange-400 border-b border-[#3E2723]/50  hover:bg-[#3E2723]"
                                                    >
                                                        Admin Panel
                                                    </Link>
                                                </li>
                                            )}
                                            <li>
                                                <button
                                                    onClick={async () => {
                                                        await logout();
                                                        setIsUserMenuOpen(
                                                            false,
                                                        );
                                                    }}
                                                    className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-900/10 transition-colors"
                                                >
                                                    Logout
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    {/*Cart Button*/}
                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="relative group"
                    >
                        <ShoppingCartIcon className="h-6 w-6 text-white group-hover:text-[#F47321]" />
                    </button>
                </div>
            </nav>
            <SlideCart
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
            />
        </header>
    );
}
