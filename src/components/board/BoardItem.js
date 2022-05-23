import {View, Text, StyleSheet} from 'react-native'
import Checkbox from 'react-native-bouncy-checkbox'

export default function ListItem({id, children, onChange, isCompleted}) {
  return (
    <View style={styles.container}>
      <Checkbox
        isChecked={isCompleted}
        size={25}
        fillColor="#0099FF"
        unfillColor="#555555"
        text={children}
        iconStyle={styles.checkbox}
        textStyle={styles.text}
        onPress={(isChecked) => onChange({ id, isChecked })}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    color: '#fff',
    padding: 16,
    borderRadius: 12,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#222222',
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
  checkbox: {
    borderRadius: 8,
    borderColor: 'transparent',
  },
})
