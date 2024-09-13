import { useEffect, useState } from 'react'
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons'
import { useSelector, useDispatch } from 'react-redux'
import {
  updateSortbyOptions,
  updateGenreOptions,
  fillGenreData
} from '../redux/slices/favoritesSlice'

import {
  colors,
  containerStyles,
  fontWeights,
  sizes,
  textStyles
} from '../lib/styles'
import request from '../services/api'

export default function Settings({ navigation }) {
  const dispatch = useDispatch()
  const { sortByOptions, genreOptions } = useSelector(
    (state) => state.favorites
  )

  const [isLoading, setIsLoading] = useState(true)
  const [inputOptions, setInputOptions] = useState({
    year: '',
    from: '',
    to: ''
  })

  const insets = useSafeAreaInsets()

  useEffect(() => {
    requestGenreInfo()
  }, [])

  const requestGenreInfo = async () => {
    try {
      setIsLoading(true)
      const { genres } = await request(`/genre/movie/list`)
      const modifiedGenre = genres?.map((item) => {
        return {
          ...item,
          selected: false
        }
      })
      dispatch(fillGenreData(modifiedGenre))
      setIsLoading(false)
    } catch (err) {
      setIsLoading(false)
    }
  }

  const validateMinutesInput = () => {
    let isValid = false
    if (inputOptions.to < inputOptions.from) {
      Alert.alert('Please enter higher "TO" amount than "FROM"')
      setInputOptions({
        ...inputOptions,
        to: ''
      })
      isValid = false
    } else {
      isValid = true
    }
    return isValid
  }

  const getSelectedGenre = () => {
    let selectedGenreIds = genreOptions?.filter((item) => item.selected)
    return selectedGenreIds.length > 0
      ? selectedGenreIds?.map((obj) => obj.id)
      : []
  }

  const getSelectedSortBy = () => {
    let selectedSortByIds = sortByOptions?.filter((item) => item.selected)
    return selectedSortByIds.length > 0
      ? selectedSortByIds?.map((obj) => obj.value)
      : []
  }

  const getYearsMinutesData = () => {
    let obj = {}
    let isValid = validateMinutesInput()
    if (isValid && inputOptions.year !== '') {
      obj = {
        ...inputOptions
      }
    } else if (!isValid && inputOptions.year !== '') {
      obj = {
        year: inputOptions.year
      }
    }

    return obj
  }

  const onSubmit = () => {
    const genreIds = getSelectedGenre()
    const sortByNames = getSelectedSortBy()
    const yearMinData = getYearsMinutesData()

    navigation.navigate('Discover', {
      settingsOptions: {
        genreIds,
        sortByNames,
        yearMinData
      }
    })
  }

  return (
    <View
      style={[
        containerStyles,
        {
          paddingBottom: insets.bottom
        }
      ]}
    >
      <ScrollView contentContainerStyle={styles.wrapper}>
        <View>
          <Text style={textStyles.h2}>Sort by</Text>
          <View>
            {sortByOptions.map((item, index) => {
              return (
                <SortOption
                  key={index}
                  name={item.name}
                  selected={item.selected}
                  onSelect={() => {
                    dispatch(updateSortbyOptions(item.id))
                  }}
                />
              )
            })}
          </View>
        </View>
        <View>
          <Text style={textStyles.h2}>Genres</Text>
          <View style={styles.genreList}>
            {genreOptions.map((item, index) => {
              return (
                <Genre
                  key={index}
                  name={item.name}
                  selected={item.selected}
                  onSelect={() => {
                    dispatch(updateGenreOptions(item.id))
                  }}
                />
              )
            })}
          </View>
        </View>
        <View>
          <Text style={textStyles.h2}>Year</Text>
          <TextInput
            keyboardType="number-pad"
            style={styles.input}
            value={inputOptions.year}
            onChangeText={(text) => {
              setInputOptions({
                ...inputOptions,
                year: text
              })
            }}
            maxLength={4}
          />
        </View>
        <View>
          <Text style={textStyles.h2}>Runtime</Text>
          <View style={styles.runtime}>
            <TextInput
              keyboardType="number-pad"
              style={styles.input}
              placeholder="From"
              value={inputOptions.from}
              onChangeText={(text) => {
                setInputOptions({
                  ...inputOptions,
                  from: text
                })
              }}
              placeholderTextColor={colors.neutral}
              maxLength={3}
            />
            <Text style={textStyles.small}>-</Text>
            <TextInput
              keyboardType="number-pad"
              style={styles.input}
              value={inputOptions.to}
              onChangeText={(text) => {
                setInputOptions({
                  ...inputOptions,
                  to: text
                })
              }}
              onSubmitEditing={validateMinutesInput}
              placeholder="To"
              placeholderTextColor={colors.neutral}
              maxLength={3}
            />
            <Text style={textStyles.small}>minutes</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          underlayColor={colors.neutral}
          style={styles.button}
          onPress={() => {
            onSubmit()
          }}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

function Genre({ name, selected, onSelect }) {
  return (
    <TouchableOpacity
      style={[styles.genre, selected ? styles.selectedGenre : undefined]}
      activeOpacity={0.7}
      onPress={onSelect}
    >
      <Text style={[selected ? styles.selectedGenreText : undefined]}>
        {name}
      </Text>
      {selected && (
        <Icon name="close-outline" size={sizes.lg} color={colors.white} />
      )}
    </TouchableOpacity>
  )
}

const SortOption = ({ name, selected, onSelect }) => {
  useEffect(() => {}, [selected])
  return (
    <TouchableOpacity
      style={styles.sortOption}
      activeOpacity={0.7}
      onPress={onSelect}
    >
      <Text>{name}</Text>
      <Icon
        name={selected ? 'checkmark-circle' : 'ellipse-outline'}
        size={sizes.xxl}
        color={selected ? colors.primary : colors.black}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 30,
    paddingVertical: 30,
    gap: 30
  },
  input: {
    backgroundColor: colors.light,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 14,
    width: 80
  },
  genreList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10
  },
  genre: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    borderColor: colors.black,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: 'center'
  },
  selectedGenre: {
    backgroundColor: colors.primary,
    borderColor: colors.primary
  },
  selectedGenreText: {
    color: colors.white
  },
  runtime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16
  },
  sortOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomColor: colors.light,
    borderBottomWidth: 1
  },
  buttonContainer: {
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.light,
    paddingVertical: 16,
    paddingHorizontal: 30
  },
  button: {
    backgroundColor: colors.black,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center'
  },
  buttonText: {
    color: colors.white,
    fontWeight: fontWeights.bold,
    fontSize: sizes.md
  }
})
