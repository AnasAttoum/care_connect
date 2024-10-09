export default function Btn({ click, title }: { click: () => void, title: string }) {
    return (
        <div className="flex justify-center my-5">
            <div className="text-white py-2 px-10 rounded-md cursor-pointer bg-[--primary] hover:bg-[--secondary]" onClick={click}>{title}</div>
        </div>
    )
}
