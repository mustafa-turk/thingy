import {useState, useEffect, useRef} from 'react'
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput
} from 'react-native'
import {TabView, SceneMap} from 'react-native-tab-view'

import Board from 'components/board/Board'
import Modal from 'components/Modal'
import Dots from 'components/Dots'
import Icon from 'components/Icon'
import MultiSelect from '../components/Dropdown'

import { getBoards, updateBoardItem, createBoardItem } from '../lib/api'

export default function HomeScreen() {
  const [index, setIndex] = useState(0)
  const [isModalVisible, setModalVisible] = useState(false)
  const [todos, setTodos] = useState(null)
  const [labelValue, setLabelValue] = useState(null)
  const [selectedBoardId, setSelectedBoardId] = useState(null)

  useEffect(() => {
    (async () => {
      let response = await getBoards()
      setTodos(response)
    })();
  }, [])

  function getBoardsList() {
    return Object.keys(todos).map((key) => ({ id: key, name: todos[key].name }))
  }

  function getRoutes(todos) {
    const boardRoutes = Object.keys(todos).map((key) => ({key, title: key}))
    return [...boardRoutes, {key: 'add', title: 'Add'}]
  }

  function getSceneMap(todos) {
    const scenes = {}

    Object.keys(todos).map(key => {
      scenes[key] = () => (
        <View style={styles.container}>
          <Text style={styles.text}>{todos[key].name}</Text>
          <Board items={todos[key].items} onChange={({ id, isChecked }) => {
            updateBoardItem({ todos, itemId: id, boardId: key, isChecked })
              .then(todos => setTodos(todos))
          }} />
        </View>
      )
    })

    scenes.add = () => (
      <View style={styles.addContainer}>
        <Icon name="plus" size={62} />
      </View>
    )

    return scenes
  }

  if (!todos) {
    return <Text>Loading...</Text>
  }

  return (
    <View style={{flex: 1}}>
      <Dots length={getRoutes(todos).length} index={index} />

      <TabView
        navigationState={{index, routes: getRoutes(todos)}}
        renderTabBar={() => null}
        renderScene={SceneMap(getSceneMap(todos))}
        onIndexChange={setIndex}
      />

      <Pressable onPress={() => setModalVisible(true)} style={styles.button}>
        <Icon name="plus" />
      </Pressable>

      <Modal visible={isModalVisible} onDismiss={() => setModalVisible(false)}>
        <View style={styles.modalHeader}>
          <Pressable onPress={() => setModalVisible(false)}>
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>
          <Text style={styles.modalHeaderText}>New Todo</Text>
          <Pressable disabled={!selectedBoardId} onPress={() => {
            createBoardItem({
              todos,
              boardId: selectedBoardId,
              label: labelValue
            }).then(() => {
              setModalVisible(false)
              setLabelValue('')
            })
          }}>
            <Text style={styles.doneText}>Done</Text>
          </Pressable>
        </View>

        <TextInput
          style={styles.input}
          onChangeText={setLabelValue}
          value={labelValue}
          placeholder="Call mom"
        />

        <MultiSelect
          items={getBoardsList()}
          onChange={setSelectedBoardId}
        />
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // marginHorizontal: 20,
    marginTop: 30
  },
  addContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '900',
  },
  button: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0099FF',
    padding: 14,
    borderRadius: 20,
  },
  input: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#2C2C2E",
    color: "#fff",
    fontSize: 17,
  },
  doneText: {
    color: '#0099FF',
    textAlign: "center",
    fontWeight: "700",
    fontSize: 17,
  },
  cancelText: {
    color: '#0099FF',
    textAlign: "center",
    fontSize: 17,
  },
  modalHeader: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 36,
    paddingHorizontal: 10,
  },
  modalHeaderText: {
    color: '#fff',
    fontWeight: "700",
    fontSize: 17,
  }
})
