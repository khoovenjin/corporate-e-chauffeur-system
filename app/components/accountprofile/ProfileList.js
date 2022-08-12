import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import useAuth from '../../auth/useAuth';
import ProfileListItem from './ProfileListItem';
import ProfileNotificationItem from './ProfileNotificationItem';

function ProfileList({ notificationItem, notificationStatus, profileList, notificationroute }) {
    const navigation = useNavigation();
    const { user, logOut } = useAuth();

    return (
        <View style={styles.container}>
            <ProfileNotificationItem
                item={notificationItem}
                status={notificationStatus}
                onPress={()=>navigation.navigate(notificationroute)}
            />
            <FlatList 
                data={profileList}
                keyExtractor={listItem => listItem.title.toString()}
                renderItem={({ item }) => 
                    <ProfileListItem
                        item={item}
                        onPress={()=>{
                            {item.targetScreen !== "" && navigation.navigate(item.targetScreen)}
                            {item.targetScreen === "" && logOut()}
                        }}
                    />
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    }
})

export default ProfileList;