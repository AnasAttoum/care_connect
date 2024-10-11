import { useInView } from "react-intersection-observer";
import Title from "../../components/Title";
import { doctors } from "../../constants/data";
import { useEffect } from "react";
import FloatingButton from "../../components/FloatingButton";
import DoctorCard from "../../components/Cards/DoctorCard";

export default function Doctors() {

    const { ref, inView, entry } = useInView()

    useEffect(() => {
        if (inView)
            entry?.target.childNodes.forEach((el, index) => {
                (el as HTMLElement).style.animation = `animationBasic .7s ${index / 2}s forwards`
            })
    }, [inView, entry])

    return (
        <>
            <div className="px-5">
                <Title title="Our Doctors" />

                <div className="flex flex-wrap justify-center gap-x-7 gap-y-16 mt-16" ref={ref}>
                    {doctors.map((doctor, index) => {
                        return <DoctorCard key={index} doctor={doctor} />
                    })}
                </div>
            </div>

            <FloatingButton url='/doctors/add' tooltip='Add Doctor' />
        </>
    )
}