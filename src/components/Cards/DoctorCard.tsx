import { doctor } from "../../constants/types";

export default function DoctorCard({ doctor: { id, name, image, speciality, department_id, mobile_number, job_date, address, salary } }: { doctor: doctor }) {

    return (
        <div className="flex flex-col gap-5 p-5 rounded-2xl opacity-0 bg-white transition-all hover:bg-slate-50 hover:!scale-105 relative trans" style={{ width: '500px', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset' }}>

            <div className="absolute -top-12 left-10 bg-white p-2 rounded-md">
                <img src={image} alt={name} className="rounded-md " style={{ width: '100px', height: '100px', }} />
            </div>
            <div className="flex mt-10">
                <div className="flex flex-col gap-5 w-1/2">
                    <div className="text-gray-400">Name: <div className="text-[--primary] font-bold">{name}</div></div>
                    <div className="text-gray-400">Speciality: <div className="text-[--primary] font-bold">{speciality}</div></div>
                    <div className="text-gray-400">Department: <div className="text-[--primary] font-bold">{department_id}</div></div>
                </div>

                <div className="flex flex-col gap-5 w-1/2">
                    <div className="text-gray-400">Mobile Number: <div className="text-[--primary] font-bold">{mobile_number}</div></div>
                    <div className="text-gray-400">Address: <div className="text-[--primary] font-bold">{address}</div></div>
                    <div className="text-gray-400">Salary: <div className="text-[--primary] font-bold">{salary}</div></div>
                </div>
            </div>

        </div>
    )
}
