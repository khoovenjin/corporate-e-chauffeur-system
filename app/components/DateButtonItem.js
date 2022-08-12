import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import AppText from './AppText';
import defaultStyles from '../config/styles';

function DateButtonItem({ title, date, setDate }) {
    const [open, setOpen] = useState(false);

    const dateFormatter = (date) => {
        return date.toDateString().split(' ').slice(1).join(' ');
    }

    return (
        <>
            <TouchableWithoutFeedback onPress={()=>setOpen(true)}>
                <View style={styles.subContainer}>
                    <MaterialCommunityIcons name="calendar-month" size={40} color={defaultStyles.colors.primary} />
                    <View style={styles.detailsContainer}>
                        <AppText style={styles.title}>{title}</AppText>
                        <AppText style={styles.date}>{date}</AppText>
                    </View>
                </View>
            </TouchableWithoutFeedback>
            <DateTimePickerModal
                isVisible={open}
                mode="date"
                onConfirm={(dateSelected)=>{
                    const dateString = dateFormatter(dateSelected);
                    setDate(dateString);
                    setOpen(false);
                }}
                onCancel={()=>setOpen(false)}
            />
        </>
    );
}

const styles = StyleSheet.create({
    subContainer: {
        backgroundColor: defaultStyles.colors.white,
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailsContainer: {
        justifyContent: 'center',
        marginLeft: 5
    },
    title: {
        fontSize: 12,
        color: defaultStyles.colors.medium
    },
    date: {
        fontSize: 16,
        color: defaultStyles.colors.primary,
        fontWeight: 'bold'
    },
})

export default DateButtonItem;