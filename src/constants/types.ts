export interface department {
    id: number,
    name: string,
    phone_number: number,
    room_count: number,
    // empty_room: number,
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
    },
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

export interface patient {
    id: number,
    name: string,
    birth_date: string,
    gender: string,
    medical_description: string,
    address: string,
    mobile_number: string,
}

export interface surgery {
    id: number,
    operation_name: string,
    patient_id: {
        id: number,
        name: string
    },
    doctor_id: {
        id: number,
        name: string
    },
    room_id: {
        id: number,
        room_number: number
    },
    duration: number,
    schedule_date: string,
}

export interface medicalRecord {
    id: number,
    patient_id: {
        id: number,
        name: string,
        birth_date: string,
        gender: string,
        medical_description: string,
        address: string,
        mobile_number: string
    },
    blood_type: string,
    admission_date: string,
    discharge_date: string,
    medicines: string[],
    details: string,
    doctor_id: {
        name: string,
        speciality: string,
        image: string,
        mobile_number: string,
        job_date: string,
        address: string,
        salary: string,
        department: {
            id: number,
            name: string,
        }
    },
    room_id: {
        id: number,
        room_number: number,
    }
}