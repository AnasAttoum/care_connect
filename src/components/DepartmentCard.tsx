import { department } from "../constants/types";


export default function DepartmentCard({ department: { name, phone_number, total_rooms, available_rooms, total_doctors, description } }: { department: department }) {
    return (
        <div className="flex flex-col gap-5 p-5 rounded-2xl cursor-pointer opacity-0 bg-white transition-all hover:bg-slate-50 hover:!scale-105 trans" style={{ width: '350px', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset' }}>

            <div style={{ color: 'var(--primary)' }}>
                <div className="text-lg font-bold">{name}</div>
                <div className="text-gray-400">( {phone_number} )</div>
            </div>

            <div className="flex justify-between">
                <div className="flex flex-col">
                    <div className="text-gray-400">Rooms</div>
                    <div style={{ color: 'var(--primary)' }}>{total_rooms}</div>
                </div>
                <div className="flex flex-col">
                    <div className="text-gray-400">available Rooms</div>
                    <div style={{ color: 'var(--primary)' }}>{available_rooms}</div>
                </div>
                <div className="flex flex-col">
                    <div className="text-gray-400">Doctors</div>
                    <div style={{ color: 'var(--primary)' }}>{total_doctors}</div>
                </div>
            </div>

            <div className="flex flex-col">
                <div style={{ color: 'var(--primary)', fontWeight: '600' }}>About:</div>
                <div style={{ color: 'var(--primary)' }}>{description}</div>
            </div>

        </div >
    )
}
