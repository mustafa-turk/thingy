import {
  View,
  Modal as RNModal,
} from 'react-native'

function Modal({visible, onDismiss, children}) {
  return (
    <RNModal
      visible={visible}
      animationType="slide"
      onDismiss={onDismiss}
      onRequestClose={onDismiss}
      presentationStyle={'formSheet'}
    >
      <View style={{flex: 1, backgroundColor: '#1C1C1E'}}>
        <View style={{ margin: 14, marginTop: 18}}>{children}</View>
      </View>
    </RNModal>
  )
}

export default Modal
