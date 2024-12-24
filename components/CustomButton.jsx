import { View, Text, TouchableOpacity } from 'react-native'

const CustomButton = (props) => {
    return (
        <View>
            <TouchableOpacity onPress={props.handlePress} className={props.containerStyle}><Text className={props.titleStyle}>{props.title}</Text></TouchableOpacity>
        </View>
    )
}
export default CustomButton