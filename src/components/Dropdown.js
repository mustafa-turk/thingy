import { useState, useEffect } from "react"
import {
  Text,
  View,
  Pressable,
} from 'react-native'

function MultiSelect({ items, onChange }) {
  const [selected, setSelected] = useState(items.map(item => item.id)[0])

  useEffect(() => {
    onChange(selected)
  }, [selected])

  function handleSelected(selectedId) {
    if (selectedId === selected) setSelected(null)
    setSelected(selectedId)
  }

  return (
    <View style={{ marginTop: 20 }}>
      <View style={{ flexDirection: "row" }}>
        {items.map(item => (
          <Pressable key={item.id} onPress={() => handleSelected(item.id)} style={{
            padding: 14,
            borderRadius: 10,
            backgroundColor: selected === item.id ? "#0099FF" : "#3E3E42",
            alignSelf: "flex-start",
            marginRight: 10,
          }}>
            <Text style={{ color: "#fff", fontSize: 16 }}>{item.name}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  )
}

export default MultiSelect;