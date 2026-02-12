"use client";

import Link from "next/link";
import Logo from "./Logo";
import Image from "next/image";
import { logout } from "@/actions/logout-action";
import { useEffect, useState } from "react";
import {
    Bars3Icon,
    ChevronDownIcon,
    MagnifyingGlassIcon,
    UserCircleIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import SlideCart from "../cart/SlideCart";
import { useStore } from "@/src/store/store";
import { CartIcon } from "../cart/CartIcon";
import SearchBar from "./SearchBar";
import { useRouter } from "next/navigation";

interface MainNavProps {
    isAuth: boolean;
    userTag: string;
    isAdmin: boolean;
}

export default function MainNav({ isAuth, userTag, isAdmin }: MainNavProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const setCartOpen = useStore((state) => state.setCartOpen);
    const storeAuth = useStore((state) => state.isAuth);
    const setAuth = useStore((state) => state.setAuth);
    const storeUserTag = useStore((state) => state.userTag);
    const logoutStore = useStore((state) => state.logout);
    const router = useRouter();

    useEffect(() => {
        setIsMounted(true);
        if (isAuth && userTag) {
            setAuth(isAuth, userTag);
        }
    }, [isAuth, userTag, setAuth]);

    const activeAuth = isAuth || storeAuth;
    const activeUserTag = isAuth && userTag ? userTag : storeUserTag || "Guest";

    //^Dropdown Consoles
    const consoles = [
        { name: "PlayStation", href: "/catalog?platform=PS5" },
        { name: "Xbox", href: "/catalog?platform=Xbox" },
        { name: "Nintendo", href: "/catalog?platform=Nintendo" },
    ];

    if (!isMounted) {
        return (
            <div className="h-14 bg-[#2D2A2E] w-full border-b border-[#3E2723]/50 md:h-16" />
        );
    }

    //&Handle logout
    const handleLogout = async () => {
        await logout();
        logoutStore();
        router.push("/");
        router.refresh();
    };

    return (
        <header>
            <nav className="bg-[#2D2A2E] fixed top-0 start-0 w-full h-14 z-50 border-b border-[#3E2723]/50 md:h-16">
                <div className="h-full max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8">
                    {/*Identity*/}
                    <Link
                        href="/"
                        className="flex items-center space-x-2 group text-[#F8F9FA] shrink-0"
                    >
                        <Image
                            src="/boxIcon.png"
                            alt="Logo"
                            width={40}
                            height={40}
                            className="aspect-square rounded-md group-hover:scale-110 transition-transform md:w-12 md:h-12"
                        />
                        <div className="hidden sm:block">
                            <Logo />
                        </div>
                    </Link>
                    {/*Options*/}
                    <div
                        className={`${isMenuOpen ? "flex" : "hidden"} absolute top-14 left-0 w-full bg-[#2D2A2E] border-b border-[#3E2723] flex-col md:static md:flex md:flex-row md:w-auto md:border-none`}
                    >
                        <ul className="flex flex-col p-6 space-y-4 font-bold font-(family-name:--font-bangers) uppercase text-[12px] tracking-[0.2em] md:space-y-0 md:p-0 md:flex-row md:space-x-8 md:items-center">
                            <li>
                                <Link
                                    href="/"
                                    className="block py-2 hover:text-[#F47321] transition-colors"
                                >
                                    Home
                                </Link>
                            </li>
                            {/*Games for console*/}
                            <li className="relative">
                                <button
                                    onClick={() =>
                                        setIsDropdownOpen(!isDropdownOpen)
                                    }
                                    className="flex items-center justify-between w-full py-2 hover:text-[#F47321]"
                                >
                                    Games{" "}
                                    <ChevronDownIcon
                                        className={`w-4 h-4 ms-1 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                                    />
                                </button>
                                <ul
                                    className={`${isDropdownOpen ? "block" : "hidden"} mt-2 space-y-2 bg-[#1A181B] rounded-lg p-3 md:absolute md:w-44`}
                                >
                                    {consoles.map((c) => (
                                        <li key={c.name}>
                                            <Link
                                                href={c.href}
                                                prefetch={false}
                                                className="block py-2 text-xs hover:text-[#F47321]"
                                            >
                                                {c.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            <li>
                                <Link
                                    href="/2"
                                    className="hover:text-[#F47321] block py-2"
                                >
                                    Consoles
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/3"
                                    className="hover:text-[#F47321] block py-2"
                                >
                                    Accesories
                                </Link>
                            </li>
                            {/*Login/Profile (Mobile View)*/}
                            <li className="pt-6 border-t border-[#3E2723] md:hidden">
                                {!isMounted ? (
                                    <div className="w-16 h-8 bg-zinc-700/50 animate-pulse rounded-md" />
                                ) : !activeAuth ? (
                                    <Link
                                        href="/users/login"
                                        className="flex items-center justify-center bg-[#F47321] text-[#2D2A2E] py-4 rounded-xl font-black w-full tracking-widest"
                                    >
                                        Login
                                    </Link>
                                ) : (
                                    <div className="space-y-4 italic">
                                        <div className="flex items-center space-x-2 text-white">
                                            <UserCircleIcon className="w-6 h-6" />{" "}
                                            <span>{activeUserTag}</span>
                                        </div>
                                        <Link
                                            href="/profile"
                                            className="block text-zinc-400"
                                        >
                                            Profile
                                        </Link>
                                        <Link
                                            href="/transactions/my-orders"
                                            className="block text-zinc-400"
                                        >
                                            My Orders
                                        </Link>
                                        {isAdmin && (
                                            <Link
                                                href="/admin"
                                                className="block text-orange-400"
                                            >
                                                Admin Panel
                                            </Link>
                                        )}
                                        <button
                                            onClick={handleLogout}
                                            className="text-red-500 font-black uppercase text-[11px]"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </li>
                        </ul>
                    </div>
                    {/*Hamburguer menu, Cart & Search button*/}
                    <div className="flex items-center space-x-1 md:space-x-4">
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="p-2 text-white hover:text-[#F47321] transition-colors"
                        >
                            <MagnifyingGlassIcon className="w-6 h-6" />
                        </button>
                        <button
                            onClick={() => setCartOpen(true)}
                            className="p-2 outline-none"
                        >
                            <CartIcon />
                        </button>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 text-[#F8F9FA] rounded-md hover:bg-[#3E2723] md:hidden transition-colors outline-none"
                        >
                            {isMenuOpen ? (
                                <XMarkIcon className="w-7 h-7" />
                            ) : (
                                <Bars3Icon className="w-7 h-7" />
                            )}
                        </button>
                        {/*Login/Profile (Desktop View)*/}
                        <div className="hidden md:flex items-center">
                            {!isMounted ? (
                                <div className="w-16 h-8 bg-zinc-700/50 animate-pulse rounded-md" />
                            ) : !activeAuth ? (
                                <Link
                                    href="/users/login"
                                    className="bg-[#F47321] text-[#2D2A2E] px-4 py-2 rounded-md font-black uppercase text-[10px] hover:bg-[#ff8534] transition-colors"
                                >
                                    Login
                                </Link>
                            ) : (
                                <div className="relative">
                                    <button
                                        onClick={() =>
                                            setIsUserMenuOpen(!isUserMenuOpen)
                                        }
                                        className="flex items-center text-[#F8F9FA] hover:text-[#F47321] outline-none"
                                    >
                                        <UserCircleIcon className="w-8 h-8" />
                                        <ChevronDownIcon
                                            className={`w-4 h-4 ms-1 transition-transform ${isUserMenuOpen ? "rotate-180" : ""}`}
                                        />
                                    </button>
                                    {isUserMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-[#2D2A2E] border border-[#3E2723] rounded-lg shadow-2xl z-50 overflow-hidden">
                                            <ul className="py-1 text-[10px] uppercase font-bold italic">
                                                <li className="px-4 py-3 border-b border-[#3E2723] text-zinc-400">
                                                    {activeUserTag}
                                                </li>
                                                <li>
                                                    <Link
                                                        href="/profile"
                                                        className="block px-4 py-3 hover:bg-[#3E2723]"
                                                    >
                                                        Profile
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href="/transactions/my-orders"
                                                        className="block px-4 py-3 hover:bg-[#3E2723]"
                                                    >
                                                        My Orders
                                                    </Link>
                                                </li>
                                                {isAdmin && (
                                                    <li>
                                                        <Link
                                                            href="/admin"
                                                            className="block px-4 py-3 text-orange-400"
                                                        >
                                                            Admin Panel
                                                        </Link>
                                                    </li>
                                                )}
                                                <li>
                                                    <button
                                                        onClick={handleLogout}
                                                        className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-500/10"
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
                    </div>
                </div>
            </nav>
            <SearchBar
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
            />
            <SlideCart />
        </header>
    );
}
