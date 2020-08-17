import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import { FaBars, FaTimes } from "react-icons/fa"

export default function Navbar() {
    const [expanded, setExpanded] = useState<boolean>(false)
    const [scrolled, setScrolled] = useState<boolean>(false)
    const items: { text: string, to: string }[] = [
        { text: "Home", to: "/" },
        { text: "About", to: "/about" }
    ]

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        function handleScroll(): void {
            setScrolled(window.scrollY >= 50);
        }

        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, [])

    return (
        <div
            style={{
                position: "sticky",
                top: 0
            }}
            className="container flex h-16 mt-16 mb-16 items-center bg-white"
        >
            <Link to="/" className="hover-light">
                {scrolled ? (
                    <span className="font-display name-sm relative">s.zhang</span>
                ) : (
                    <span className="font-display name-lg relative">
                        samson<br/>zhang
                    </span>
                )}
            </Link>
            <div className="flex ml-auto hidden flex-sm">
                {items.map(({ text, to }) => (
                    <div className="ml-6">
                        <Link
                            className="hover-light font-bold"
                            to={to}
                        >{text}</Link>
                    </div>
                ))}
            </div>
            <button
                className="ml-auto hidden-sm hover-light font-bold"
                onClick={() => setExpanded(true)}
            >
                <div className="flex items-center">
                    <FaBars className="mr-2"/> Menu
                </div>
            </button>
            <div
                className={`fixed bg-white w-48 flex flex-col justify-center px-8 ${expanded ? "mr-0 shadow-2xl" : "-mr-48"}`}
                style={{
                    top: 0,
                    right: 0,
                    height: "100%",
                    transition: "all 0.2s ease"
                }}
            >
                <button
                    className="absolute mr-8"
                    style={{
                        right: 0,
                        top: "6rem",
                    }}
                    onClick={() => setExpanded(false)}
                ><FaTimes/></button>
                {items.map(({ text, to }) => (
                    <div className="ml-auto my-2">
                        <Link
                            className="hover-light font-bold"
                            to={to}
                        >{text}</Link>
                    </div>
                ))}
            </div>
        </div>
    )
}