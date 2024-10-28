import { useInView } from "react-intersection-observer";
import Title from "../../components/Title";
import { useEffect, useState } from "react";
import FloatingButton from "../../components/FloatingButton";
import DoctorCard from "../../components/Cards/DoctorCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../lib/store";
import { doctor } from "../../constants/types";
import { getDoctors } from "../../lib/slices/doctorSlice";
import Loading from "../Loading";

export default function Doctors() {

    const { ref, inView, entry } = useInView()
    const dispatch = useDispatch<AppDispatch>()
    const { loading } = useSelector((state: RootState) => state.department)
    const [totalDoctors, setTotalDoctors] = useState<doctor[]>([])
    const [del, setDelete] = useState<number>()

    useEffect(() => {
        if (inView)
            entry?.target.childNodes.forEach((el, index) => {
                (el as HTMLElement).style.animation = `animationBasic .7s ${index / 2}s forwards`
            })
    }, [inView, entry,totalDoctors])

    useEffect(() => {
        dispatch(getDoctors()).unwrap().then(result => {
            setTotalDoctors(result.data)
        }).catch((error) => {
            console.log("🚀 ~ dispatch ~ error:", error.message)
        })
    }, [dispatch])

    useEffect(() => {
        if (del)
            setTotalDoctors(prev => prev.filter((el) => {
                return el.id !== del
            }))
    }, [del])

    return (
        <>
            {loading === 'pending' ?
                <Loading />
                :
                <>
                    <div className="px-5">
                        <Title title="Our Doctors" />

                        <div className="flex flex-wrap justify-center gap-x-7 gap-y-16 mt-16" ref={ref}>
                            {totalDoctors.map((doctor, index) => {
                                return <DoctorCard key={index} doctor={doctor} setDelete={setDelete}/>
                            })}
                        </div>
                    </div>

                    <FloatingButton url='/doctors/add' tooltip='Add Doctor' />
                </>
            }
        </>
    )
}