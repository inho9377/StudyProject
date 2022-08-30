import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Pressable,
  TextInput,
  ScrollView,
  Alert,
  Platform,
} from 'react-native'
import { Fontisto } from '@expo/vector-icons'
import { theme } from './colors'
import AsyncStorage from '@react-native-async-storage/async-storage'

const STORAGE_KEY_TODOS = '@toDos'
const STORAGE_KEY_TAB = '@tab'

export default function App() {
  const [working, setWorking] = useState(true)
  const [text, setText] = useState('')
  const [toDos, setToDos] = useState({})
  const [editText, setEditText] = useState('')

  useEffect(() => {
    load(STORAGE_KEY_TODOS)
    load(STORAGE_KEY_TAB)
  }, [])

  const travel = () => saveAndSetWorking(false)
  const work = () => saveAndSetWorking(true)
  const saveAndSetWorking = (working) => {
    setWorking(working)
    save({ working }, STORAGE_KEY_TAB)
  }

  const onChangeText = (payload) => setText(payload)
  const onChangeEditText = (payload) => setEditText(payload)

  const save = async (toSave, key) => {
    const s = JSON.stringify(toSave)
    try {
      await AsyncStorage.setItem(key, s)
    } catch (e) {
      console.error(e)
    }
  }

  const completeToDo = async (key) => {
    const newToDos = { ...toDos }
    newToDos[key].complete = true
    setToDos(newToDos)
    await save(newToDos, STORAGE_KEY_TODOS)
  }

  const editToDo = async (key) => {
    const newToDos = { ...toDos }
    newToDos[key].edit = true
    setToDos(newToDos)
    setEditText(toDos[key].text)
    await save(newToDos, STORAGE_KEY_TODOS)
  }

  const deleteToDo = async (key) => {
    if (Platform.OS === 'web') {
      const ok = confirm('Do you want to delete this To Do?')
      if (ok) {
        const newToDos = { ...toDos }
        delete newToDos[key]
        setToDos(newToDos) // state 는 직접 mutate 되면 안됨
        save(newToDos, STORAGE_KEY_TODOS)
      }
    } else {
      Alert.alert('Delete To Do?', 'Are you sure?', [
        { text: 'Cancel' },
        {
          text: "I'm sure",
          style: 'destructive',
          onPress: () => {
            const newToDos = { ...toDos }
            delete newToDos[key]
            setToDos(newToDos) // state 는 직접 mutate 되면 안됨
            save(newToDos, STORAGE_KEY_TODOS)
          },
        },
      ])
    }
  }

  const editEnd = async (key) => {
    const newToDos = { ...toDos }
    newToDos[key].edit = false
    newToDos[key].text = editText
    setToDos(newToDos)
    await save(newToDos, STORAGE_KEY_TODOS)
  }

  const load = async (key) => {
    let s = null
    try {
      s = await AsyncStorage.getItem(key)
    } catch (e) {
      console.error(e)
    }

    if (!s) {
      return
    }

    if (key === STORAGE_KEY_TAB) {
      setWorking(JSON.parse(s).working)
    } else if (key === STORAGE_KEY_TODOS) {
      setToDos(JSON.parse(s)) // string to Object
    }
  }

  const addToDo = async () => {
    if (text === '') {
      return
    }

    // const newToDos = Object.assign({}, toDos, {
    //   [Date.now()]: { text, work: working },
    // })

    const newToDos = {
      ...toDos,
      [Date.now()]: { text, working, complete: false, edit: false },
    }

    setToDos(newToDos)
    await save(newToDos, STORAGE_KEY_TODOS)
    setText('')
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work} /*activeOpacity={0}*/>
          <Text
            style={{ ...styles.btnText, color: working ? 'white' : theme.grey }}
          >
            Work
          </Text>
        </TouchableOpacity>
        <Pressable
          onPress={() => {
            travel()
          }}
        >
          <Text
            style={{
              ...styles.btnText,
              color: !working ? 'white' : theme.grey,
            }}
          >
            Travel
          </Text>
        </Pressable>
      </View>
      <TextInput
        // keyboardType="phone-pad"
        returnKeyType="done"
        // returnKeyLabel='send'
        // secureTextEntry // 비밀번호 비표시
        // multiline // 여러 줄 사용
        // autoCapitalize={'words'} // 자동 대문자 설정
        onSubmitEditing={addToDo}
        onChangeText={onChangeText}
        value={text}
        placeHolder={working ? 'Add a To Do' : 'Where do you want to go?'}
        style={styles.input}
      />
      <ScrollView>
        {Object.keys(toDos).map((key) =>
          toDos[key].edit === true ? (
            <View style={styles.toDo} key={key}>
              <TextInput
                returnKeyType="done"
                onChangeText={onChangeEditText}
                value={editText}
                style={styles.input}
              />
              <TouchableOpacity
                style={styles.toDoIcon}
                onPress={() => editEnd(key)}
              >
                <Fontisto name="check" size={18} color="white" />
              </TouchableOpacity>
            </View>
          ) : toDos[key].working === working ? (
            <View style={styles.toDo} key={key}>
              <Text
                style={
                  toDos[key].complete === true
                    ? styles.toDoTextComplete
                    : styles.toDoText
                }
              >
                {toDos[key].text}
              </Text>
              {toDos[key].complete === true ? null : (
                <View
                  style={{
                    display: 'flex',
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <TouchableOpacity
                    style={styles.toDoIcon}
                    onPress={() => editToDo(key)}
                  >
                    <Fontisto name="eraser" size={18} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.toDoIcon}
                    onPress={() => completeToDo(key)}
                  >
                    <Fontisto name="check" size={18} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.toDoIcon}
                    onPress={() => deleteToDo(key)}
                  >
                    <Fontisto name="trash" size={18} color="black" />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ) : null,
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 100,
  },
  btnText: {
    fontSize: 38,
    fontWeight: '600',
  },
  input: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 20,
    fontSize: 18,
  },
  toDo: {
    backgroundColor: theme.grey,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toDoText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    flex: 2,
  },
  toDoTextComplete: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  toDoIcon: {
    flex: 1,
  },
})
