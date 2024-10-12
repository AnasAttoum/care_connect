export interface department {
    id: number,
    name: string,
    phone_number: string,
    total_rooms: number,
    available_rooms: number,
    total_doctors: number,
    description: string
}

export interface doctor {
    id: number,
    name: string,
    image: string,
    speciality: string,
    department_id: number,
    mobile_number: string,
    job_date: string,
    address: string,
    salary: number,
}

export interface service {
    id: number,
    name: string,
    description: string,
    department_id: number,
}