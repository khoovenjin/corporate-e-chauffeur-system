import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, FlatList } from 'react-native';

import defaultStyles from '../config/styles.js';
import { vehicleOptions } from '../config/data.js'
import CarListItem from './CarListItem.js';
import ListItemSeperator from './ListItemSeperator.js';
import AppText from './AppText.js';
import { calculateRideFare } from '../api/price.js';

function PickerScreen({ handlePress, rideOption, handleSelect }) {
    const index = rideOption.rideOption-1;
    const { duration, distance } = rideOption;
    
    return (
        <View style={styles.screen}>
            <TouchableWithoutFeedback onPressOut={handlePress}>
                <View style={styles.outerContainer} />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
                <View style={styles.innerContainer}>
                    <View style={styles.close}/>
                    <AppText style={styles.text}>Vehicle Options</AppText>
                    <View style={styles.subContainer}>
                        <CarListItem
                            title={vehicleOptions[index].title}
                            subTitle={vehicleOptions[index].description}
                            icon={vehicleOptions[index].icon}
                            styleTitle={defaultStyles.recentTitle}
                            onPress={handlePress}
                            price={calculateRideFare(vehicleOptions[index].title, distance, duration)}
                        />
                        <FlatList 
                            data={vehicleOptions.filter(elem => elem.id !== rideOption.rideOption)}
                            keyExtractor={vehicleOptions => vehicleOptions.id.toString()}
                            renderItem={({ item }) => 
                                <CarListItem
                                    title={item.title}
                                    subTitle={item.description}
                                    icon={item.icon}
                                    styleTitle={defaultStyles.recentTitle}
                                    onPress={() => {
                                        handleSelect(item.id)
                                        handlePress()
                                    }}
                                    price={calculateRideFare(item.title, distance, duration)}
                                    lining={{borderColor: defaultStyles.colors.white}}
                                />
                            }
                            ItemSeparatorComponent={() =>
                                <ListItemSeperator style={styles.detailsLining} />
                            }
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    outerContainer: {
        flex: 1,
        opacity: 0,
        backgroundColor: defaultStyles.colors.black
    },
    innerContainer: {
        position: 'absolute',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        backgroundColor: defaultStyles.colors.white,
        paddingHorizontal: 25,
        paddingTop: 10,
        bottom: 0,
        width: '100%'
    },
    close: {
        backgroundColor: defaultStyles.colors.medium,
        height: 7,
        width: "20%",
        borderRadius: 5,
        alignSelf: 'center',
        marginBottom: 20
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: defaultStyles.colors.dark
    },
    subContainer: {
        marginVertical: 10,
    },
    detailsLining: {
        marginTop: 1,
        height: 2,
        opacity: 0.7
    }
})

export default PickerScreen;