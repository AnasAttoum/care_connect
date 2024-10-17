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
        "id": 1,
        "name": "Lonie Ritchie",
        "description": "Soluta cumque quia adipisci itaque nihil cumque.",
        "phone_number": 452468,
        "room_count": 4,
        "empty_room": 0,
        "doctor_count": 4
    },
    {
        "id": 2,
        "name": "Mrs. Anya Rau Sr.",
        "description": "Quisquam eveniet qui beatae qui voluptatem fugit molestiae.",
        "phone_number": 7433287,
        "room_count": 0,
        "empty_room": 0,
        "doctor_count": 0
    },
    {
        "id": 3,
        "name": "Antonette Bogan DDS",
        "description": "Illum est facilis quos ut nulla qui reprehenderit.",
        "phone_number": 7064541,
        "room_count": 0,
        "empty_room": 0,
        "doctor_count": 0
    },
    {
        "id": 4,
        "name": "Dr. Jordyn Davis",
        "description": "Laborum quae maiores est odit nobis.",
        "phone_number": 4471648,
        "room_count": 0,
        "empty_room": 0,
        "doctor_count": 0
    },
    {
        "id": 5,
        "name": "Prof. Lambert Pfannerstill DDS",
        "description": "Numquam dolorem delectus sed expedita.",
        "phone_number": 5173662,
        "room_count": 0,
        "empty_room": 0,
        "doctor_count": 0
    },
    {
        "id": 6,
        "name": "Mireille Grimes",
        "description": "Quo incidunt nesciunt culpa culpa.",
        "phone_number": 7861121,
        "room_count": 0,
        "empty_room": 0,
        "doctor_count": 0
    },
    {
        "id": 7,
        "name": "Gilda Kuhlman",
        "description": "Perspiciatis odit omnis aut.",
        "phone_number": 8472667,
        "room_count": 0,
        "empty_room": 0,
        "doctor_count": 0
    },
    {
        "id": 8,
        "name": "Dr. Dexter Parisian V",
        "description": "Voluptatem deserunt pariatur enim eius.",
        "phone_number": 5913190,
        "room_count": 0,
        "empty_room": 0,
        "doctor_count": 0
    },
    {
        "id": 9,
        "name": "Miss Elfrieda Skiles",
        "description": "Vero laudantium ducimus repellendus.",
        "phone_number": 3346442,
        "room_count": 0,
        "empty_room": 0,
        "doctor_count": 0
    },
    {
        "id": 10,
        "name": "Prof. Cornelius Cormier II",
        "description": "Est quam temporibus non quia voluptatem.",
        "phone_number": 1247613,
        "room_count": 0,
        "empty_room": 0,
        "doctor_count": 0
    }
];

export const rooms = [
    {
        "id": 2,
        "room_number": 179,
        "status": "occupied",
        "type": "general",
        "beds_number": 3,
        "department": {
            "id": 12,
            "name": "Daron Leuschke",
        }
    },
    {
        "id": 3,
        "room_number": 158,
        "status": "vacant",
        "type": "ICU",
        "beds_number": 1,
        "department": {
            "id": 13,
            "name": "Vada Stracke",
        }
    },
    {
        "id": 4,
        "room_number": 67,
        "status": "vacant",
        "type": "ICU",
        "beds_number": 4,
        "department": {
            "id": 14,
            "name": "Prof. Elsa Jacobi MD",
        }
    },
    {
        "id": 5,
        "room_number": 172,
        "status": "vacant",
        "type": "ICU",
        "beds_number": 5,
        "department": {
            "id": 15,
            "name": "Paige Mitchell",
        }
    },
    {
        "id": 6,
        "room_number": 134,
        "status": "Under Maintenance",
        "type": "surgical",
        "beds_number": 3,
        "department": {
            "id": 16,
            "name": "Rosina Runolfsdottir",
        }
    },
    {
        "id": 7,
        "room_number": 52,
        "status": "Under Maintenance",
        "type": "surgical",
        "beds_number": 7,
        "department": {
            "id": 17,
            "name": "Cora Schmitt",
        }
    },
    {
        "id": 8,
        "room_number": 122,
        "status": "vacant",
        "type": "general",
        "beds_number": 5,
        "department": {
            "id": 18,
            "name": "Laurie Brekke",
        }
    },
    {
        "id": 9,
        "room_number": 187,
        "status": "Under Maintenance",
        "type": "general",
        "beds_number": 1,
        "department": {
            "id": 19,
            "name": "Price King",
        }
    },
    {
        "id": 10,
        "room_number": 36,
        "status": "vacant",
        "type": "general",
        "beds_number": 5,
        "department": {
            "id": 20,
            "name": "Prof. Ted Price IV",
        }
    },
    {
        "id": 11,
        "room_number": 64,
        "status": "occupied",
        "type": "general",
        "beds_number": 5,
        "department": {
            "id": 1,
            "name": "Lonie Ritchie",
        }
    }
];

export const doctors = [
    {
        id: 1,
        image: '/images/Jillian Warner.jpg',
        name: "Dr. John Smith",
        speciality: "Cardiology",
        mobile_number: "0912345678",
        job_date: "2022-01-15",
        address: "123 Main Street",
        salary: 150000,
        days: ['Sunday', 'Monday'],
        fromTo: [new Date().toString(), new Date().toString()],
        department: {
            id: 1,
            name: "Lonie Ritchie",
        }
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
        days: ['Sunday', 'Monday'],
        fromTo: [new Date().toString(), new Date().toString()],
        department:{
            id:1,
            name:'Lonie Ritchie'
        }
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
        days: ['Sunday', 'Monday'],
        fromTo: [new Date().toString(), new Date().toString()],
        department:{
            id:1,
            name:'Lonie Ritchie'
        }
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
        days: ['Sunday', 'Monday'],
        fromTo: [new Date().toString(), new Date().toString()],
        department:{
            id:1,
            name:'Lonie Ritchie'
        }
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
        days: ['Sunday', 'Monday'],
        fromTo: [new Date().toString(), new Date().toString()],
        department:{
            id:1,
            name:'Lonie Ritchie'
        }
    },
];

export const services = [
    {
        "id": 1,
        "name": "Brenda Steuber",
        "description": null,
        "department": {
            "id": 1,
            "name": "Casimer Zieme",
        }
    },
    {
        "id": 2,
        "name": "Prof. Margarett Nader",
        "description": "Provides immediate medical care for urgent and life-threatening conditions.",
        "department": {
            "id": 2,
            "name": "Gillian Moen",
        }
    },
    {
        "id": 3,
        "name": "Julia Funk",
        "description": "Provides immediate medical care for urgent and life-threatening conditions.",
        "department": {
            "id": 3,
            "name": "Wyatt Shanahan",
        }
    },
    {
        "id": 4,
        "name": "Miss Abbigail Wiza IV",
        "description": "Provides immediate medical care for urgent and life-threatening conditions.",
        "department": {
            "id": 4,
            "name": "Dr. Alvis Muller",
        }
    },
    {
        "id": 5,
        "name": "Marge Nolan",
        "description": "Provides immediate medical care for urgent and life-threatening conditions.",
        "department": {
            "id": 5,
            "name": "Mr. Kamron Cremin",
        }
    },
    {
        "id": 6,
        "name": "Marquise Moore",
        "description": "Provides immediate medical care for urgent and life-threatening conditions.",
        "department": {
            "id": 6,
            "name": "Prof. Geoffrey Hamill Jr.",
        }
    },
    {
        "id": 7,
        "name": "Mr. Jaden Hegmann",
        "description": null,
        "department": {
            "id": 7,
            "name": "Antonia Schinner",
        }
    },
    {
        "id": 8,
        "name": "Prof. Immanuel Harber",
        "description": null,
        "department": {
            "id": 8,
            "name": "Derick Mayert",
        }
    },
    {
        "id": 9,
        "name": "Jaquan Satterfield",
        "description": null,
        "department": {
            "id": 9,
            "name": "Jeffrey Bogisich",
        }
    },
    {
        "id": 10,
        "name": "Yvonne Kuhic",
        "description": null,
        "department": {
            "id": 1,
            "name": "Dr. Kiarra Kerluke",
        }
    }
];

export const patients = [
    {
      "id": 1,
      "name": "Janaaaa",
      "birth_date": "1994-08-27",
      "gender": "male",
      "medical_description": "Voluptatum similique ea quo non accusantium ad quidem incidunt. Sed nam sit rerum voluptatem et eum quo. Eius ducimus qui corporis id quidem. Sed quia sed labore non nulla.",
      "address": "address1",
      "mobile_number": "(567) 421-8146"
    },
    {
      "id": 2,
      "name": "Mohamed Tromp II",
      "birth_date": "2015-09-01",
      "gender": "male",
      "medical_description": "Voluptate vel dolorum non quod. Magni molestiae suscipit adipisci accusamus nostrum dolores quo sit. Dolorem tempore minima id. Quia consequuntur nostrum omnis consequatur autem et rerum dolorum.",
      "address": "77286 Rodriguez Plain Apt. 532\nTheoland, NY 57361-1474",
      "mobile_number": "256.860.0150"
    },
    {
      "id": 3,
      "name": "Ms. Aglae Barton",
      "birth_date": "1980-12-04",
      "gender": "male",
      "medical_description": "Voluptate assumenda voluptates quam tempore fuga explicabo facilis. Accusamus quam explicabo sunt ut. Cumque eos vel repellendus rerum commodi eveniet at.",
      "address": "1983 Gerhold Throughway\nWest Rylan, UT 77657",
      "mobile_number": "1-360-440-1759"
    },
    {
      "id": 4,
      "name": "Kirstin Toy",
      "birth_date": "2008-05-31",
      "gender": "female",
      "medical_description": "Reiciendis et facere numquam. Laudantium natus voluptatibus quia eligendi. Necessitatibus temporibus ut ut at illum quas illo. Nemo non ipsum et.",
      "address": "9154 Feeney Loop\nArnechester, NY 63125",
      "mobile_number": "+1-501-495-5205"
    },
    {
      "id": 5,
      "name": "Shawna Gottlieb",
      "birth_date": "1972-11-22",
      "gender": "male",
      "medical_description": "Atque eligendi est aperiam dicta aut debitis. Aut harum aut ut ratione ad molestiae. Qui laboriosam ad ut omnis. Nam qui culpa laboriosam ipsam aut nostrum vel ab. Et id eum sequi qui facere.",
      "address": "87573 Olson Mountain\nPort Marlenebury, ME 33625-0006",
      "mobile_number": "+1.559.252.4720"
    },
    {
      "id": 6,
      "name": "Ashleigh Beier",
      "birth_date": "1973-09-29",
      "gender": "male",
      "medical_description": "Aut accusamus necessitatibus praesentium illum sint. Quidem laudantium est ut et. Quisquam aut reiciendis eum quia porro commodi. Quos ducimus et et assumenda.",
      "address": "366 Ullrich Vista\nAnabelborough, IA 71802-6568",
      "mobile_number": "+14758614216"
    },
    {
      "id": 7,
      "name": "Alana Mertz",
      "birth_date": "2002-03-24",
      "gender": "female",
      "medical_description": "Atque odit repellat doloremque ex vel. Eum voluptatibus voluptatem quam voluptate tempore ut blanditiis incidunt. Similique quaerat occaecati soluta natus repellendus. Rerum ut doloremque et. Possimus sint et eveniet deleniti consequuntur ipsum unde.",
      "address": "53014 Jacobi Inlet\nEunahaven, AR 64600-9988",
      "mobile_number": "1-720-758-2837"
    },
    {
      "id": 8,
      "name": "Hope Dietrich",
      "birth_date": "2015-06-02",
      "gender": "female",
      "medical_description": "Nemo autem deserunt sint velit ducimus itaque. Ipsam rerum at accusantium illum. Ut odio velit illo. Ducimus aliquid sint et. Sunt eum culpa quo consequatur.",
      "address": "787 Sigmund Forest\nMilliemouth, PA 05210-1337",
      "mobile_number": "+12766456964"
    },
    {
      "id": 9,
      "name": "Prof. Christy Runte IV",
      "birth_date": "2022-12-27",
      "gender": "male",
      "medical_description": "Id odit soluta eveniet cum. Odio repellendus incidunt ratione ut voluptatibus illo. Perferendis dolores tempore deleniti vel alias. Quasi recusandae id saepe eos aspernatur ut enim. Fugiat quod similique est aut sint doloribus.",
      "address": "4857 Anahi Cove\nPort Miguel, NE 47563",
      "mobile_number": "(669) 313-5020"
    },
    {
      "id": 10,
      "name": "Clementina Reilly",
      "birth_date": "1979-12-26",
      "gender": "male",
      "medical_description": "Et est doloremque autem. Iusto itaque eligendi qui est consectetur. Et corrupti accusamus veniam minus ad laborum ut.",
      "address": "6263 Raina Squares\nSouth Amy, MS 85794",
      "mobile_number": "1-458-926-2667"
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