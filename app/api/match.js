import { onDutyList } from '../config/data.js';

export const getDriver = ( ) => {
    let driverDetails;
    const driver = onDutyList.shift();
    
    console.log(driver);
    if(driver){
        driverDetails = {
            name: driver.name,
            phone: driver.phone,
            image: driver.image,
            numberPlate: driver.vehicle.vehicle_no_plate,
            carModel: driver.vehicle.vehicle_model,
        }
    }
    
    console.log(driverDetails)
    return driverDetails;
}