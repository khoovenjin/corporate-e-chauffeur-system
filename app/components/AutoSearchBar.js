import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { GOOGLE_MAPS_APIKEY } from "@env";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Ionicons } from '@expo/vector-icons';

import defaultStyles from '../config/styles.js';
import SearchListItem from './SearchListItem.js';

function AutoSearchBar({ style, savedPlaces, placeholder, onPress }) {
    return (
        <View style={[styles.container, style]}>
            <GooglePlacesAutocomplete 
                placeholder={placeholder}
                styles={mapInputStyles}
                onPress={(data, details = null)=>{
                    onPress({
                        title: data.description.split(',')[0],
                        latitude: details.geometry.location.lat.toString(),
                        longitude: details.geometry.location.lng.toString(),
                        address: data.description
                    });
                }}
                fetchDetails
                returnKeyType={"search"}
                renderLeftButton={() => <Ionicons name="location-sharp" size={22} color={defaultStyles.colors.red} style={styles.icon}/>}
                enablePoweredByContainer={false}
                minLength={2}
                query={{
                    key: GOOGLE_MAPS_APIKEY,
                    language: "en",
                    components: 'country:my'
                }}
                nearbyPlacesAPI="GooglePlacesSearch"
                debounce={400}
                // listEmptyComponent={}
                predefinedPlaces={savedPlaces}
                predefinedPlacesAlwaysVisible={true}
                renderRow={(rowData) => {
                    const title = rowData.structured_formatting.main_text;
                    const subTitle = rowData.structured_formatting.secondary_text;
                    return (
                        <SearchListItem
                            title={title}
                            subTitle={subTitle}
                        />
                    );
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

const mapInputStyles = StyleSheet.create({
    container: {
        flex: 0
    },
    textInputContainer: { // Container
        backgroundColor: defaultStyles.colors.white,
        borderRadius: 8,
        flexDirection: "row",
        marginVertical: 10,
        padding: 5,
        paddingLeft: 15,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: defaultStyles.colors.black,
        elevation: 10
    },
    textInput: { // Input Box
        backgroundColor: defaultStyles.colors.white,
        height: 38,
        fontWeight: 'bold',
        ...defaultStyles.text,
    },
    row: {  // Results
        
    }
})

export default AutoSearchBar;