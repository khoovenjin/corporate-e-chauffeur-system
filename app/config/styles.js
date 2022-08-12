import { Platform } from "react-native";

import colors from "./colors";
import mapStyles from "./mapStyles";

export default {
    colors,
    mapStyles,
    text: {
        color: colors.dark,
        fontSize: 18,
        fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir"
    },
    headerStyle: {
        height: 70
    },
    alternateTitle: {
        fontSize: 20
    },
    searchBarContainer: {
        position: 'absolute',
        top: 165
    },
    recentTitle: {
        fontSize: 16,
        fontWeight: 'bold'
    }
}