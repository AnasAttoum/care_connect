import React, { DetailedReactHTMLElement, HTMLAttributes, useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"

export default function Title({ title }: { title: string }) {

    const { ref: titleRef, inView: titleInView, entry: titleEntry } = useInView()
    const [newTitle, setNewTitle] = useState<DetailedReactHTMLElement<HTMLAttributes<HTMLElement>, HTMLElement>[]>([]);

    useEffect(() => {
        if (titleInView) {
            const arr = title.split('').map((char, index) => {
                return React.createElement("div", { key: index, style: { opacity: 0, display: 'inline-block', animation: `animationTitle .3s ${index / 5}s forwards` } }, char === ' ' ? <span>&nbsp;</span> : char);
            })
            setNewTitle(arr)
        }
    }, [titleInView, titleEntry, title])

    return (
        <div className="flex justify-center my-5">
            <div className="comfortaa text-xl sm:text-4xl" style={{ color: 'var(--primary)' }} ref={titleRef}>
                {newTitle}
            </div>
        </div>
    )
}
