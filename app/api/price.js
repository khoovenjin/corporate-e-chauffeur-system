export const calculateRideFare = ( option, distance, time ) => {
    let rideOption;
    const base_fare = 2.20;
    const booking_fee = 3.00;
    const distance_fee = {
        luxury_sedan: 1.40,
        luxury_suv: 2.10,
        luxury_sport: 2.50,
    };
    const minute_fee = {
        luxury_sedan: 1.10,
        luxury_suv: 1.70,
        luxury_sport: 1.90,
    };
    
    if(option === 'Luxury Sedan') rideOption = "luxury_sedan";
    else if(option === 'Luxury SUV') rideOption = "luxury_suv";
    else rideOption = "luxury_sport";

    const price = (base_fare + booking_fee + distance_fee[rideOption]*distance + minute_fee[rideOption]*time).toFixed(2);
    return price;
}