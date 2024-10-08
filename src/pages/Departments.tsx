import { useInView } from "react-intersection-observer";
import DepartmentCard from "../components/DepartmentCard";
import Title from "../components/Title";
import { departments } from "../constants/data";
import { useEffect } from "react";

export default function Departments() {

    const { ref, inView, entry } = useInView()

    useEffect(() => {
        if (inView)
            entry?.target.childNodes.forEach((el, index) => {
                (el as HTMLElement).style.animation = `animationTitle .7s ${index / 2}s forwards`
            })
    }, [inView, entry])

    return (
        <div>
            <Title title="Our Departments" />

            <div className="flex flex-wrap justify-center gap-5 p-5" ref={ref}>
                {departments.map((department, index) => {
                    return <DepartmentCard key={index} department={department} />
                })}
            </div>
        </div>
    )
}