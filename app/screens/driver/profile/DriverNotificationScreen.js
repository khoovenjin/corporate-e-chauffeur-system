import React, {useEffect, useState} from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import HeaderItem from '../../../components/HeaderItem';
import Screen from '../../../components/Screen';
import defaultStyles from '../../../config/styles';
import Icon from '../../../components/Icon';
import NotificationListItem from '../../../components/accountprofile/NotificationListItem';
import routes from "../../../navigation/routes";
import NoDataAnimation from '../../../components/NoDataAnimation';
import { sampleTrips } from '../../../config/data';

function DriverNotificationScreen({ navigation }) {
    const [dataPresent, setDataPresent] = useState(false);

    useEffect(()=>{
        console.log('Executed')
        if(sampleTrips.length !== 0) setDataPresent(true);
        else setDataPresent(false);
    },[sampleTrips])

    return (
        <Screen>
            <HeaderItem
                title="Notifications"
                IconComponent={
                    <Icon
                        name="keyboard-backspace"
                        backgroundColor={defaultStyles.colors.primary}
                        iconColor={defaultStyles.colors.white}
                    />
                }
                styleObject={defaultStyles.headerStyle}
                onPress={()=>navigation.goBack()}
            />
            <View style={styles.container}>
                {dataPresent && 
                    <FlatList 
                        data={sampleTrips}
                        keyExtractor={notification=>notification.id.toString()}
                        renderItem={({item}) =>
                            <NotificationListItem 
                                title={item.name}
                                subTitle={item.description}
                                icon="bell"
                                styleTitle={defaultStyles.recentTitle}
                                onPress={() => console.log("Notification selected", item)}
                                date={item.date}
                            />
                        }
                    />
                }
                {!dataPresent && <NoDataAnimation visible={!dataPresent}/>}
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 10
    }
})

export default DriverNotificationScreen;