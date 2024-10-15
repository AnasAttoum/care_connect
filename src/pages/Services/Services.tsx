import { useInView } from "react-intersection-observer";
import Title from "../../components/Title";
import { services } from "../../constants/data";
import { useEffect, useState } from "react";
import ServiceCard from "../../components/Cards/ServiceCard";
import FloatingButton from "../../components/FloatingButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../lib/store";
import { service } from "../../constants/types";
import { getServices } from "../../lib/slices/serviceSlice";
import Loading from "../Loading";

export default function Services() {

    const { ref, inView, entry } = useInView()
    const dispatch = useDispatch<AppDispatch>()
    const { loading } = useSelector((state: RootState) => state.service)
    const [totalServices, setTotalServices] = useState<service[]>([])

    useEffect(() => {
        if (inView)
            entry?.target.childNodes.forEach((el, index) => {
                (el as HTMLElement).style.animation = `animationBasic .7s ${index / 2}s forwards`
            })
    }, [inView, entry])

    useEffect(() => {
        dispatch(getServices()).unwrap().then(result => {
            console.log("🚀 ~ useEffect ~ result:", result)
        }).catch((error) => {
            console.log("🚀 ~ dispatch ~ error:", error.message)
            setTotalServices(services)
        })
    }, [dispatch])

    return (
        <>
            {loading === 'pending' ?
                <Loading />
                :
                <>
                    <div className="px-5">
                        <Title title="Our Services" />

                        <div className="flex flex-wrap justify-center gap-x-4 gap-y-5" ref={ref}>
                            {totalServices.map((service, index) => {
                                return <ServiceCard key={index} service={service} />
                            })}
                        </div>
                    </div>

                    <FloatingButton url='/services/add' tooltip='Add Service' />
                </>
            }
        </>
    )
}