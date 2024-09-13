/* eslint-disable react-hooks/exhaustive-deps */
import { useLayoutEffect, useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import {
  containerStyles,
  colors,
  headerIconStyle,
  moviesDiscoverStyles
} from '../lib/styles'
import Icon from 'react-native-vector-icons/Ionicons'
import {
  TouchableOpacity,
  Spinner,
  MovieList,
  MovieItem,
  EmptyState
} from '../components'
import { getTodayDate } from '../lib/dates'
import request from '../services/api'
import { useRoute } from '@react-navigation/native'

export default function Discover({ navigation }) {
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [isRefresh, setIsRefresh] = useState(false)
  const [error,setIsError] = useState(false)
  const [view] = useState({ numColumns: 1, keyGrid: 1 })
  const [results, setResults] = useState([])
  const [configType, setConfigType] = useState('default')
  const [totalPages, setTotalPages] = useState(0)
  const [page, setPage] = useState(0)

  const { params } = useRoute()

  useEffect(() => {
    ;(async () => {
      try {
        requestMoviesList()
      } catch (error) {
        requestMoviesList()
      }
    })()
  }, [])

  useEffect(() => {
    const getDiscoverSettingsConfig = () => {
      if (params?.settingsOptions) {
        setConfigType('settings')
        requestMoviesList(true)
      } else {
        setConfigType('default')
      }
    }

    getDiscoverSettingsConfig()
  }, [params, navigation])

  const getDiscoverSettingsConfig = () => {
    let configObject = {}
    const dateRelease = getTodayDate()
    if (configType === 'default') {
      console.log('Lets go with default')
      configObject = {
        'release_date.lte': dateRelease
      }
    } else {
      console.log('Lets go with settingsOptions')
      const { genreIds, sortByNames, yearMinData } = params?.settingsOptions
      configObject = {
        with_genres: genreIds,
        sort_by: sortByNames?.length > 0 ? sortByNames[0] : '',
        year: parseInt(yearMinData?.year, 10) || '',
        'with_runtime.gte': yearMinData?.to || '',
        'with_runtime.lte': yearMinData?.from || ''
      }
    }
    return configObject
  }

  const requestMoviesList = async (resetPage, filterPage) => {
    try {
      setIsLoading(true)
      const data = await request(`discover/movie`, {
        page: resetPage ? 1 : page + 1,
        ...getDiscoverSettingsConfig()
      })

      console.log('[movie data]', data)

      setIsLoading(false)
      setIsLoadingMore(false)
      setIsRefresh(false)
      setIsError(false)
      setTotalPages(data.total_pages)
      setPage(data.page)
      setResults(resetPage ? data.results : [...results, ...data.results])
    } catch (err) {
      setIsLoading(false)
      setIsLoadingMore(false)
      setIsRefresh(false)
      setIsError(true)
    }
  }

  const handleRefresh = async () => {
    setConfigType('default')
    setIsRefresh(true)
    await requestMoviesList(true)
  }

  const handleLoadMore = async () => {
    setIsLoadingMore(true)
    await requestMoviesList()
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon
          name={'settings'}
          size={20}
          color={colors.primary}
          style={headerIconStyle}
          onPress={() => navigation.navigate('Settings')}
        />
      )
    })
  }, [navigation])

  const renderItem = (item, type, isSearch, numColumns, navigate, index) => {
    return (
      <MovieItem
        itemKey={index}
        item={item}
        type={type}
        isSearch={isSearch}
        numColumns={numColumns}
        navigate={navigate}
      />
    )
  }

  const renderFooter = () => {
    if (isLoadingMore) return <Spinner size="small" />

    if (totalPages !== page && results.length > 0) {
      return (
        <View style={moviesDiscoverStyles.loadingMore}>
          <TouchableOpacity
            style={moviesDiscoverStyles.loadingButton}
            onPress={handleLoadMore}
          >
            <Text style={moviesDiscoverStyles.loadingText}>Load more</Text>
          </TouchableOpacity>
        </View>
      )
    }

    if (results.length > 0)
      return <View style={moviesDiscoverStyles.loadingMore} />

    return null
  }

  const renderEmptyComponent = () => {
    return (
      <EmptyState
        image={require('../assets/empty-discover.jpg')}
        title="No results found"
        message="Try adjusting the settings"
        actionLabel="Go to Settings"
        onAction={() => navigation.navigate('Settings')}
      />
    )
  }

  const { navigate } = navigation
  const { numColumns, keyGrid } = view

  return (
    <View style={containerStyles}>
      {isLoading && !isRefresh && !isLoadingMore ? (
        <Spinner style={moviesDiscoverStyles.loadingContainer} size="large" />
      ) : (
        <MovieList
          data={results}
          type="normal"
          isSearch={false}
          refreshing={isRefresh}
          keyGrid={keyGrid}
          numColumns={numColumns}
          onRefresh={handleRefresh}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={
            results.length === 0 ? renderEmptyComponent : null
          }
          navigate={navigate}
          renderItem={renderItem}
        />
      )}
    </View>
  )
}
