import React from 'react';
import { StyleSheet, FlatList } from 'react-native';

import CarListItem from '../../components/CarListItem';
import { vehicleOptions } from '../../config/data.js'
import defaultStyles from '../../config/styles.js'
import Screen from '../../components/Screen';

function RideDestinationScreen() {
    return (
        <Screen>
            <FlatList 
                data={vehicleOptions.slice(0,1)}
                keyExtractor={vehicleOptions => vehicleOptions.id.toString()}
                renderItem={({ item }) => 
                    <CarListItem
                        title={item.title}
                        subTitle={item.description}
                        icon={item.icon}
                        styleTitle={defaultStyles.recentTitle}
                        onPress={() => console.log("Message selected", item)}
                        price={item.price}
                    />    
                }
            />
        </Screen>
    );
}

const styles = StyleSheet.create({

})

export default RideDestinationScreen;