export const links = [
    { name: 'Departments', url: '/' },
    { name: 'Rooms', url: '/rooms' },
    { name: 'Doctors', url: '/doctors' },
    { name: 'Services', url: '/services' },
    { name: 'Patients', url: '/patients' },
    { name: 'Surgeries', url: '/surgeries' },
]

export const departments = [
    {
        id: 1,
        name: "Emergency Room",
        phone_number: "555-123-4567",
        total_rooms: 10,
        available_rooms: 4,
        total_doctors: 25,
        description: "Provides immediate medical care for urgent and life-threatening conditions.",
    },
    {
        id: 2,
        name: "Cardiology",
        phone_number: "555-234-5678",
        total_rooms: 10,
        available_rooms: 5,
        total_doctors: 25,
        description: "Specializes in the diagnosis and treatment of heart conditions.",
    },
    {
        id: 3,
        name: "Oncology",
        phone_number: "555-345-6789",
        total_rooms: 10,
        available_rooms: 5,
        total_doctors: 25,
        description: "Treats cancer and related disorders.",
    },
    {
        id: 4,
        name: "Pediatrics",
        phone_number: "555-456-7890",
        total_rooms: 10,
        available_rooms: 5,
        total_doctors: 25,
        description: "Provides healthcare for children and adolescents.",
    },
    {
        id: 5,
        name: "Neurology",
        phone_number: "555-567-8901",
        total_rooms: 10,
        available_rooms: 5,
        total_doctors: 25,
        description: "Deals with disorders of the nervous system.",
    },
    {
        id: 6,
        name: "Psychiatry",
        phone_number: "555-678-9012",
        total_rooms: 10,
        available_rooms: 5,
        total_doctors: 25,
        description: "Provides mental health care.",
    },
    {
        id: 7,
        name: "Surgery",
        phone_number: "555-789-0123",
        total_rooms: 10,
        available_rooms: 5,
        total_doctors: 25,
        description: "Performs surgical procedures.",
    },
    {
        id: 8,
        name: "Obstetrics & Gynecology",
        phone_number: "555-890-1234",
        total_rooms: 10,
        available_rooms: 5,
        total_doctors: 25,
        description: "Provides care for women's reproductive health.",
    },
    {
        id: 9,
        name: "Radiology",
        phone_number: "555-901-2345",
        total_rooms: 10,
        available_rooms: 5,
        total_doctors: 25,
        description: "Uses imaging techniques to diagnose and treat diseases.",
    },
    {
        id: 10,
        name: "Pathology",
        phone_number: "555-012-3456",
        total_rooms: 10,
        available_rooms: 5,
        total_doctors: 25,
        description: "Analyzes tissue samples to diagnose diseases.",
    },
];

export const rooms = [
    {
        id: 1,
        room_number: "101",
        status: "occupied",
        department_name: "Cardiology",
        type: "surgical",
        beds_number: 1,
    },
    {
        id: 2,
        room_number: "102",
        status: "vacant",
        department_name: "General Surgery",
        type: "ICU",
        beds_number: 2,
    },
    {
        id: 3,
        room_number: "103",
        status: "occupied",
        department_name: "Pediatrics",
        type: "surgical",
        beds_number: 1,
    },
    {
        id: 4,
        room_number: "201",
        status: "Under Maintenance",
        department_name: "Emergency",
        type: "ICU",
        beds_number: 4,
    },
    {
        id: 5,
        room_number: "202",
        status: "occupied",
        department_name: "Obstetrics",
        type: "surgical",
        beds_number: 1,
    },
    {
        id: 6,
        room_number: "203",
        status: "vacant",
        department_name: "Neurology",
        type: "ICU",
        beds_number: 2,
    },
    {
        id: 7,
        room_number: "301",
        status: "occupied",
        department_name: "Oncology",
        type: "surgical",
        beds_number: 1,
    },
    {
        id: 8,
        room_number: "302",
        status: "vacant",
        department_name: "Orthopedics",
        type: "ICU",
        beds_number: 2,
    },
    {
        id: 9,
        room_number: "303",
        status: "occupied",
        department_name: "Psychiatry",
        type: "surgical",
        beds_number: 1,
    },
];

export const doctors = [
    {
        id: 1,
        image: '/images/Jillian Warner.jpg',
        name: "Dr. John Smith",
        speciality: "Cardiology",
        department_id: 1,
        mobile_number: "123-456-7890",
        job_date: "2022-01-15",
        address: "123 Main Street",
        salary: 150000,
        days:['Sunday','Monday'],
        fromTo:[new Date().toString(),new Date().toString()]
    },
    {
        id: 2,
        image: '/images/Elina McBride.jpg',
        name: "Dr. Jane Doe",
        speciality: "Pediatrics",
        department_id: 2,
        mobile_number: "987-654-3210",
        job_date: "2021-08-20",
        address: "456 Oak Avenue",
        salary: 120000,
        days:['Sunday','Monday'],
        fromTo:[new Date().toString(),new Date().toString()]
    },
    {
        id: 3,
        image: '/images/Tyler Dorsey.jpg',
        name: "Dr. David Lee",
        speciality: "Oncology",
        department_id: 3,
        mobile_number: "555-123-4567",
        job_date: "2023-03-01",
        address: "789 Pine Street",
        salary: 180000,
        days:['Sunday','Monday'],
        fromTo:[new Date().toString(),new Date().toString()]
    },
    {
        id: 4,
        image: '/images/Jolie Tanner.jpg',
        name: "Dr. Emily Wilson",
        speciality: "Neurology",
        department_id: 4,
        mobile_number: "111-222-3333",
        job_date: "2022-05-10",
        address: "1011 Elm Street",
        salary: 160000,
        days:['Sunday','Monday'],
        fromTo:[new Date().toString(),new Date().toString()]
    },
    {
        id: 5,
        image: '/images/Evelyn Vo.jpg',
        name: "Dr. Michael Brown",
        speciality: "Orthopedics",
        department_id: 5,
        mobile_number: "444-555-6666",
        job_date: "2021-12-01",
        address: "1213 Maple Street",
        salary: 140000,
        days:['Sunday','Monday'],
        fromTo:[new Date().toString(),new Date().toString()]
    },
];

export const services = [
    {
        id: 1,
        name: "Emergency Room",
        description: "Provides immediate medical care for urgent and life-threatening conditions.",
        department_id: 3
    },
    {
        id: 2,
        name: "Cardiology",
        description: "Specializes in the diagnosis and treatment of heart and blood vessel diseases.",
        department_id: 3
    },
    {
        id: 3,
        name: "Oncology",
        description: "Focuses on the prevention, diagnosis, and treatment of cancer.",
        department_id: 3
    },
    {
        id: 4,
        name: "Neurology",
        description: "Deals with disorders of the nervous system, including the brain, spinal cord, and nerves.",
        department_id: 3
    },
    {
        id: 5,
        name: "Orthopedics",
        description: "Specializes in the musculoskeletal system, including bones, joints, and muscles.",
        department_id: 3
    },
    {
        id: 6,
        name: "Pediatrics",
        description: "Provides medical care for children and adolescents.",
        department_id: 3
    },
    {
        id: 7,
        name: "Obstetrics and Gynecology",
        description: "Specializes in women's health, including pregnancy, childbirth, and gynecological conditions.",
        department_id: 3
    },
    {
        id: 8,
        name: "Psychiatry",
        description: "Deals with mental health disorders and provides psychological care.",
        department_id: 3
    },
    {
        id: 9,
        name: "Surgery",
        description: "Performs surgical procedures to diagnose and treat various medical conditions.",
        department_id: 3
    },
    {
        id: 10,
        name: "Radiology",
        description: "Uses imaging techniques, such as X-rays, CT scans, and MRI, to diagnose and treat medical conditions.",
        department_id: 3
    },
    {
        id: 11,
        name: "Laboratory",
        description: "Performs medical tests and analyzes samples to assist in diagnosis and treatment.",
        department_id: 3
    },
    {
        id: 12,
        name: "Pharmacy",
        description: "Dispenses medications and provides medication counseling.",
        department_id: 3
    },
];

export const patients = [
    {
        id: 1,
        name: "John Doe",
        birth_date: "1980-01-15",
        gender: "Male",
        medical_description: "High blood pressure",
        address: "123 Main Street, Anytown, USA",
        mobile_number: "555-123-4567"
    },
    {
        id: 2,
        name: "Jane Smith",
        birth_date: "1975-08-22",
        gender: "Female",
        medical_description: "Broken leg",
        address: "456 Oak Avenue, Someville, USA",
        mobile_number: "555-987-6543"
    },
    {
        id: 3,
        name: "Robert Johnson",
        birth_date: "1992-03-07",
        gender: "Male",
        medical_description: "Flu",
        address: "789 Pine Lane, Springfield, USA",
        mobile_number: "555-555-1212"
    },
    {
        id: 4,
        name: "Mary Brown",
        birth_date: "1988-11-10",
        gender: "Female",
        medical_description: "Allergy",
        address: "1011 Cedar Road, Anytown, USA",
        mobile_number: "555-222-3333"
    },
    {
        id: 5,
        name: "David Wilson",
        birth_date: "1995-05-21",
        gender: "Male",
        medical_description: "Sprained ankle",
        address: "1213 Maple Drive, Someville, USA",
        mobile_number: "555-444-5555"
    }
];

export const surgeries = [
    {
      id: 1,
      operation_name: "Appendectomy",
      patient_id: 101,
      doctor_id: 201,
      room_number: 10,
      duration: "2 hours",
      schedule_date: "2023-10-27",
    },
    {
      id: 2,
      operation_name: "Knee Replacement",
      patient_id: 102,
      doctor_id: 202,
      room_number: 12,
      duration: "3 hours",
      schedule_date: "2023-10-28",
    },
    {
      id: 3,
      operation_name: "Tonsillectomy",
      patient_id: 103,
      doctor_id: 203,
      room_number: 14,
      duration: "1 hour",
      schedule_date: "2023-10-29",
    },
    {
      id: 4,
      operation_name: "Hysterectomy",
      patient_id: 104,
      doctor_id: 204,
      room_number: 16,
      duration: "2.5 hours",
      schedule_date: "2023-10-30",
    },
    {
      id: 5,
      operation_name: "Cataract Surgery",
      patient_id: 105,
      doctor_id: 205,
      room_number: 18,
      duration: "1 hour",
      schedule_date: "2023-10-31",
    },
    {
      id: 6,
      operation_name: "Cholecystectomy",
      patient_id: 106,
      doctor_id: 206,
      room_number: 20,
      duration: "2 hours",
      schedule_date: "2023-11-01",
    },
    {
      id: 7,
      operation_name: "Hernia Repair",
      patient_id: 107,
      doctor_id: 207,
      room_number: 22,
      duration: "1.5 hours",
      schedule_date: "2023-11-02",
    },
    {
      id: 8,
      operation_name: "Heart Bypass Surgery",
      patient_id: 108,
      doctor_id: 208,
      room_number: 24,
      duration: "4 hours",
      schedule_date: "2023-11-03",
    },
    {
      id: 9,
      operation_name: "Colon Resection",
      patient_id: 109,
      doctor_id: 209,
      room_number: 26,
      duration: "3 hours",
      schedule_date: "2023-11-04",
    },
    {
      id: 10,
      operation_name: "Spinal Fusion",
      patient_id: 110,
      doctor_id: 210,
      room_number: 28,
      duration: "5 hours",
      schedule_date: "2023-11-05",
    },
  ];