import React, { useState } from "react"
import { Link } from "gatsby"

export default function Navbar() {
    const [expanded, setExpanded] = useState<boolean>(false)
    const items: { text: string, to: string }[] = [
        { text: "Home", to: "/" },
        { text: "About", to: "/about" }
    ];

    return (
        <div style={{
            position: "sticky",
            top: "3rem"
        }} className="container flex justify-end h-60">
            {items.map(({ text, to }) => (
                <div className="ml-4">
                    <Link to={to}>{text}</Link>
                </div>
            ))}
        </div>
    )
}