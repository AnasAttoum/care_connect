export interface department {
    id: number,
    name: string,
    phone_number: number,
    room_count: number,
    empty_room: number,
    doctor_count: number,
    description: string
}

export interface room {
    id: number,
    room_number: number,
    status: string,
    type: string,
    beds_number: number,
    department: {
        id: number,
        name: string
    }
}

export interface doctor {
    id?: number,
    name: string,
    image: string,
    speciality: string,
    mobile_number: string,
    job_date: string,
    address: string,
    salary: number,
    days: string[],
    fromTo: string[],
    department: {
        id: number,
        name: string
    }
}

export interface service {
    id: number,
    name: string,
    description: string | null,
    department: {
        id: number,
        name: string
    }
}