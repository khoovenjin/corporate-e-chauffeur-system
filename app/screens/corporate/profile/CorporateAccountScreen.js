import React from "react";
import {
    StyleSheet,
    View,
    Dimensions
} from 'react-native';

import { passengerList } from "../../../config/data";
import Screen from "../../../components/Screen";
import ProfileHeaderItem from "../../../components/accountprofile/ProfileHeaderItem";
import ProfileList from "../../../components/accountprofile/ProfileList";
import routes from "../../../navigation/routes";

const window = {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
}

const passenger = {
    ...passengerList[0]
}

const profilelist = [
    {
        title: "Security",
        icon: "security",
        targetScreen: routes.CORPORATE_SECURITY
    },
    {
        title: "Settings",
        icon: "cog",
        targetScreen: routes.CORPORATE_SETTING
    },
    {
        title: "Sign Out",
        icon: "account-arrow-right",
        targetScreen: "",
    }
]

const notificationObject = {
    icon: "bell",
    title: "Notifications",
    status: "Nice, you're all caught up on your notifications"
}

function CorporateAccountScreen() {
    const { user } = useAuth();
    
    return (
        <Screen>
            <ProfileHeaderItem title={user.name} />
            <View style={styles.detailsContainer}>
                <ProfileList
                    notificationItem={notificationObject}
                    notificationStatus={notificationObject.status}
                    profileList={profilelist}
                    notificationroute={routes.CORPORATE_NOTIFICATION}
                />
            </View>
        </Screen>
    )
}

const styles = StyleSheet.create({
    detailsContainer: {
        position: "absolute",
        top: window.height * 0.28,
        width: '100%'
    }
})

export default CorporateAccountScreen;