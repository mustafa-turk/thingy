import {StyleSheet, FlatList} from 'react-native'
import BoardItem from './BoardItem'

function sort(items = []) {
  return items.slice().sort((a, b) => a.createdAt - b.createdAt)
}

export default function List({items, onChange}) {
  function _renderListItem({item}) {
    return <BoardItem id={item.id} isCompleted={item.isCompleted} onChange={({id, isChecked}) => onChange({id, isChecked})}>{item.label}</BoardItem>
  }

  return (
    <FlatList
      style={styles.container}
      data={sort(Object.keys(items).map((key) => items[key]))}
      renderItem={_renderListItem}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: 150}}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    // marginTop: 30,
    padding: 16
  },
})
