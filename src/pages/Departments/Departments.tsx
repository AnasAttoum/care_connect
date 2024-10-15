import { useInView } from "react-intersection-observer";
import DepartmentCard from "../../components/Cards/DepartmentCard";
import Title from "../../components/Title";
import { departments } from "../../constants/data";
import { useEffect, useState } from "react";
import FloatingButton from "../../components/FloatingButton";
import { useDispatch, useSelector } from "react-redux";
import { getDepartments } from "../../lib/slices/departmentSlice";
import { AppDispatch, RootState } from "../../lib/store";
import Loading from "../Loading";
import { department } from "../../constants/types";

export default function Departments() {

    const { ref, inView, entry } = useInView()
    const dispatch = useDispatch<AppDispatch>()
    const { loading } = useSelector((state: RootState) => state.department)
    const [totalDepartments,setTotalDepartments]=useState<department[]>([])

    useEffect(() => {
        if (inView)
            entry?.target.childNodes.forEach((el, index) => {
                (el as HTMLElement).style.animation = `animationBasic .7s ${index / 2}s forwards`
            })
    }, [inView, entry])


    useEffect(() => {
        dispatch(getDepartments()).unwrap().then(result => {
            console.log("🚀 ~ useEffect ~ result:", result)
        }).catch((error) => {
            console.log("🚀 ~ dispatch ~ error:", error.message)
            setTotalDepartments(departments)
        })
    }, [dispatch])

    return (
        <>
            {loading === 'pending' ?
                <Loading />
                :
                <>
                    <div className="px-5">
                        <Title title="Our Departments" />

                        <div className="flex flex-wrap justify-center gap-x-4 gap-y-5" ref={ref}>
                            {totalDepartments.map((department, index) => {
                                return <DepartmentCard key={index} department={department} />
                            })}
                        </div>
                    </div>

                    <FloatingButton url='/departments/add' tooltip='Add Department' />
                </>
            }
        </>
    )
}