export const carsCoordinates = {
    simulateCars: [
        {latitude:3.057069,longitude:101.700476},
        {latitude:3.056589,longitude:101.700426},
        {latitude:3.056902,longitude:101.700436},
        {latitude:3.055069,longitude:101.700446},
        {latitude:3.057469,longitude:101.700486},
    ],
    originLocation: {
        latitude:3.056069,
        longitude:101.700466,
        description:"Asia Pacific University"
    }
}

export const mapInitial = {
    latitude: 4.0080,
    longitude: 102.1811,
    latitudeDelta:3.700,
    longitudeDelta:3.700
};

export const recentPlaces = [
    {
        id:1,
        title: "Mid Valley Megamall",
        address: "Mid Valley Megamall, Mid Valley City, Kuala Lumpur, Federal Territory of Kuala Lumpur, Malaysia",
        latitude: 3.1176991,
        longitude: 101.6774777
    },
    {
        id:2,
        title: "Sunway Pyramid",
        address: "Sunway Pyramid, Jalan PJS 11/15, Bandar Sunway, Petaling Jaya, Selangor, Malaysia",
        latitude: 3.0720837, 
        longitude: 101.6063455
    },
    {
        id:3,
        title: "Pavilion Kuala Lumpur",
        address: "Pavilion Kuala Lumpur, Bukit Bintang Street, Bukit Bintang, Kuala Lumpur, Federal Territory of Kuala Lumpur, Malaysia",
        latitude: 3.148855799999999, 
        longitude: 101.7132547
    },
]

export const vehicleOptions = [
    {
        id:1,
        icon: "car-hatchback",
        title: "Luxury Sedan",
        description: "Mercedes-Benz S600 Maybach, Bentley Mulsanne, Maserati Quattroporte",
        price: 10
    },
    {
        id:2,
        icon: "car-estate",
        title: "Luxury SUV",
        description: "Rolls-Royce Phantom, Range Rover Hybrid, Cadillac Escalade",
        price: 20
    },
    {
        id:3,
        icon: "car-convertible",
        title: "Luxury Sports",
        description: "Porsche Panamera Executive, McLaren 720s Coupe, Lamborghini Huracan",
        price: 30
    }
]

export let openPaymentList = [
    {
        id:1,
        icon: "account-group",
        title: "Corporate",
        pinCode: "Aoc92$",
        description: "Sunway Berhad"
    },
    {
        id:2,
        icon: "account-group",
        title: "Corporate",
        pinCode: "o)2sdW",
        description: "IOI Corporation Berhad"
    },
    {
        id:3,
        icon: "account-group",
        title: "Corporate",
        pinCode: "pW0@da",
        description: "Gamuda Berhad"
    }
]

export let paymentOptions = [
    {
        id:1,
        icon: "account-group",
        title: "Corporate",
        pinCode: "Aoc92$",
        description: "Sunway Berhad"
    }
]

export const currentLocation = [
    {
        description: 'Current Location',
        geometry: { location: { lat: 3.056069, lng: 101.700466 } },
        structured_formatting: {
            main_text: "Current Location",
            secondary_text: "Asia Pacific University"
        }
    }
]
//1)	Driver_Id (String)
// 2)	Name (String)
// 3)	Phone (String)
// 4)	Email (String)
// 5)	Image (String)
// 6)	Vehicle (Array : String)
// 7)	Trips (Array : String)
// 8)	Withdrawal (Array : Object)
// a.	Withdrawal_Id (String)
// b.	Withdrawal_Time (DateTime)
// c.	Withdrawal_Amount (Decimal)


export const chauffeurList = [
    {
        driver_Id: 1,
        name: "Johnson K. Colby",
        phone: "0168372974",
        email: "johnson@gmail.com",
        image: "driver.png",
        vehicle: [
            {
                vehicle_model: "Bentley Mulsanne",
                vehicle_no_plate: "VDF 2084"
            }
        ],
        trips: [
            2
        ]
    },
]

export const onDutyList = [
    {
        _id: '62d3759efc5b706e9c171be7',
        name: "Bryson McJoe",
        phone: "0194729437",
        email: "brysonjoe@gmail.com",
        image: "driver.png",
        vehicle: {
            vehicle_model: "Bentley Mulsanne",
            vehicle_no_plate: "VDF 2084"
        },
    },
]

export const passengerList = [
    {
        passenger_Id: '62d619b6030b96c0fe4507f3',
        corporate_Id: "62d382659a5f0759b98f476f",
        name: "Rebecca Mac",
        phone: "0168372974",
        email: "rebecca@hotmail.com",
        image: "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FChauffeseur-712bde92-e552-4a26-9780-5ba2155b0933/ImagePicker/c0644114-8115-4bba-bb2a-b8db459e04cd.jpg",
        security: {
            password: "chloexx"
        }
    },
    {
        passenger_Id: 2,
        corporate_Id: "5",
        name: "Baby Johnson",
        phone: "0168192974",
        email: "johnson@gmail.com",
        image: "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FChauffeseur-712bde92-e552-4a26-9780-5ba2155b0933/ImagePicker/c0644114-8115-4bba-bb2a-b8db459e04cd.jpg",
        security: {
            password: "johnsonxx"
        }
    },
]

export const sampleTrips = [
    {
        id: 1,
        name: "Earnest Green",
        description: "You have completed a ride with one of our chauffeur. Thank you.",
        price: 24.50,
        vehicle_option: 'Luxury Sedan', 
        date: "24/1/2022"
    },
    {
        id: 2,
        name: "Winston Orn",
        description: "You have completed a ride with one of our chauffeur. Thank you.",
        price: 60.50,
        vehicle_option: 'Luxury Sports', 
        date: "29/1/2022"
    },
    {
        id: 3,
        name: "Carlton Collins",
        description: "You have completed a ride with one of our chauffeur. Thank you.",
        price: 52.20,
        vehicle_option: 'Luxury Sedan', 
        date: "18/2/2022"
    },
    {
        id: 4,
        name: "Malcolm Labadie",
        description: "You have completed a ride with one of our chauffeur. Thank you.",
        price: 12.90,
        vehicle_option: 'Luxury Sedan', 
        date: "20/2/2022"
    },
    {
        id: 5,
        name: "Michelle Dare",
        description: "You have completed a ride with one of our chauffeur. Thank you.",
        price: 34.00,
        vehicle_option: 'Luxury SUV', 
        date: "24/2/2022"
    },
    {
        id: 6,
        name: "Carlton Zieme",
        description: "You have completed a ride with one of our chauffeur. Thank you.",
        price: 41.70,
        vehicle_option: 'Luxury SUV', 
        date: "19/3/2022"
    },
    {
        id: 7,
        name: "Jessie Dickinson",
        description: "You have completed a ride with one of our chauffeur. Thank you.",
        price: 34.50,
        vehicle_option: 'Luxury Sports', 
        date: "23/3/2022"
    },
    {
        id: 8,
        name: "Julian Gulgowski",
        description: "You have completed a ride with one of our chauffeur. Thank you.",
        price: 42.70,
        vehicle_option: 'Luxury SUV', 
        date: "29/3/2022"
    },
];

export const sampleCareerWithdrawals = [
    {
        Withdrawal_Id: 1,
        Withdrawal_Amount: 30.00
    },
	{
        Withdrawal_Id: 2,
        Withdrawal_Amount: 13.50
    },
    {
        Withdrawal_Id: 3,
        Withdrawal_Amount: 10.20
    },
    {
        Withdrawal_Id: 4,
        Withdrawal_Amount: 26.45
    },
    {
        Withdrawal_Id: 5,
        Withdrawal_Amount: 30.00
    },
];

export const sampleMonthWithdrawals = [
    {
        Withdrawal_Id: 1,
        Withdrawal_Amount: 30.20
    },
	{
        Withdrawal_Id: 2,
        Withdrawal_Amount: 1.50
    },
];

export const sampleEarnings = [
    {
        value: 50,
        label: 'Jan',
    },
    {
        value: 10,
        label: 'Feb',
    },
    {
        value: 40,
        label: 'Mar',
    },
    {
        value: 95,
        label: 'Apr',
    },
    {
        value: 85,
        label: 'May',
    },
    {
        value: 14,
        label: 'Jun',
    },
    {
        value: 51,
        label: 'Jul',
    },
    {
        value: 32,
        label: 'Aug',
    },
    {
        value: 35,
        label: 'Sep',
    },
    {
        value: 28,
        label: 'Oct',
    },
    {
        value: 79,
        label: 'Nov',
    },
    {
        value: 85,
        label: 'Dec',
    }
]

export const sampleRide = [
    {
        value: 50,
        label: 'Jan',
    },
    {
        value: 10,
        label: 'Feb',
    },
    {
        value: 40,
        label: 'Mar',
    },
    {
        value: 95,
        label: 'Apr',
    },
    {
        value: 85,
        label: 'May',
    },
    {
        value: 14,
        label: 'Jun',
    },
    {
        value: 51,
        label: 'Jul',
    },
    {
        value: 32,
        label: 'Aug',
    },
    {
        value: 35,
        label: 'Sep',
    },
    {
        value: 28,
        label: 'Oct',
    },
    {
        value: 79,
        label: 'Nov',
    },
    {
        value: 85,
        label: 'Dec',
    }
]

export const sampleOverallTransaction = [
    {
        Transaction_Id: 1,
        Transaction_Amount: 30.00
    },
	{
        Transaction_Id: 2,
        Transaction_Amount: 13.50
    },
    {
        Transaction_Id: 3,
        Transaction_Amount: 10.20
    },
    {
        Transaction_Id: 4,
        Transaction_Amount: 26.45
    },
    {
        Transaction_Id: 5,
        Transaction_Amount: 30.00
    },
];

export const passengerRequestList = [
    {
        passengerDetails: {
            _id: '62d619b6030b96c0fe4507f3',
            image: "driver.png",
            name: "Rebecca Mac",
            phone: "0186927618",
        },
        destination: {
            address: "Pavilion Kuala Lumpur, Bukit Bintang Street, Bukit Bintang, Kuala Lumpur, Federal Territory of Kuala Lumpur, Malaysia",
            latitude: 3.148855799999999,
            longitude: 101.7132547,
            title: "Pavilion Kuala Lumpur",
        },
        origin: {
            address: "Mid Valley Megamall, Mid Valley City, Kuala Lumpur, Federal Territory of Kuala Lumpur, Malaysia",
            latitude: 3.1176991,
            longitude: 101.6774777,
            title: "Mid Valley Megamall",
        },
        paymentSelection: 0,
        rideInfo: {
            rideFare: 43.48,
            rideOption: 1,
        },
    }
]