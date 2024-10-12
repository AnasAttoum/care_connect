import { useInView } from "react-intersection-observer";
import Title from "../../components/Title";
import { services } from "../../constants/data";
import { useEffect } from "react";
import ServiceCard from "../../components/Cards/ServiceCard";
import FloatingButton from "../../components/FloatingButton";

export default function Services() {

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
                <Title title="Our Services" />

                <div className="flex flex-wrap justify-center gap-x-4 gap-y-5" ref={ref}>
                    {services.map((service, index) => {
                        return <ServiceCard key={index} service={service} />
                    })}
                </div>
            </div>

            <FloatingButton url='/services/add' tooltip='Add Service' />
        </>
    )
}