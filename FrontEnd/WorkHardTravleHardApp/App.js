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
  const save = async (toSave, key) => {
    const s = JSON.stringify(toSave)
    try {
      await AsyncStorage.setItem(key, s)
    } catch (e) {
      console.log(e)
    }
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
  const load = async (key) => {
    const s = await AsyncStorage.getItem(key)
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

    const newToDos = { ...toDos, [Date.now()]: { text, working } }

    setToDos(newToDos)
    await save(newToDos, STORAGE_KEY_TODOS)
    setText('')
  }
  console.log(toDos)

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
          toDos[key].working === working ? (
            <View style={styles.toDo} key={key}>
              <Text style={styles.toDoText}>{toDos[key].text}</Text>
              <TouchableOpacity onPress={() => deleteToDo(key)}>
                <Fontisto name="trash" size={18} color="black" />
              </TouchableOpacity>
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
  toDoTest: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
})
