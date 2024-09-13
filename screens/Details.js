/* eslint-disable react-hooks/exhaustive-deps */
import { useLayoutEffect, useState, useEffect } from 'react'
import { Dimensions, StyleSheet, ScrollView, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRoute } from '@react-navigation/native'
import {
  Image,
  RatingComponent,
  CastList,
  CastItem,
  EmptyState
} from '../components'
import { POSTER_ASPECT_RATIO } from '../lib/constants'
import {
  textStyles,
  containerStyles,
  colors,
  headerIconStyle,
  ratingContainer
} from '../lib/styles'
import Icon from 'react-native-vector-icons/Ionicons'
import { sliceArrayLength } from '../lib/array'
import request from '../services/api'
import { getImageApi } from '../lib/images'
import { convertToGenres } from '../lib/genre'
import { convertToDate, convertToYear } from '../lib/dates'
import { convertMinsToHrsMins } from '../lib/time'
import {
  addToFavorite,
  removeFromFavorite
} from '../redux/slices/favoritesSlice'
import { useDispatch, useSelector } from 'react-redux'

const UNINFORMED = 'Uninformed'
const INITIAL_INFO = {
  id: '',
  poster_path: '',
  title: '',
  voteAverage: 0,
  video: [],
  overview: UNINFORMED,
  cast: [],
  crew: [],
  productionCompanies: [],
  images: [],
  infosDetail: {
    Duration: UNINFORMED,
    Genre: UNINFORMED,
    Language: UNINFORMED,
    Release: UNINFORMED,
    Budget: UNINFORMED,
    Revenue: UNINFORMED,
    Adult: UNINFORMED
  }
}

const screenDimensions = Dimensions.get('screen')
const horizontalPadding = 30

const imageHorizontalMargin = 20
const imageWidth =
  screenDimensions.width - horizontalPadding * 2 - imageHorizontalMargin * 2

export default function Details({ navigation }) {
  const dispatch = useDispatch()
  const insets = useSafeAreaInsets()
  const { params } = useRoute()

  const [isLoading,setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const [info, setInfo] = useState(INITIAL_INFO)

  const [isMarkedAsFavorite, setIsMarkedAsFavorite] = useState(false)

  const { favorites } = useSelector((state) => state.favorites)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: params.title,
      headerRight: () => (
        <Icon
          name={isMarkedAsFavorite ? 'heart' : 'heart-outline'}
          size={20}
          color={isMarkedAsFavorite ? colors.primary : colors.black}
          style={headerIconStyle}
          onPress={() => {
            if (isMarkedAsFavorite) {
              dispatch(removeFromFavorite({ ...params?.item }))
              setIsMarkedAsFavorite(false)
              return
            }
            dispatch(addToFavorite({ ...params?.item }))
          }}
        />
      )
    })
  }, [navigation, params, info, dispatch, isMarkedAsFavorite])

  useEffect(() => {
    if (favorites?.length === 0) {
      setIsMarkedAsFavorite(false)
      return
    }
    if (favorites?.filter((elem) => elem.id === info.id).length > 0) {
      setIsMarkedAsFavorite(true)
    }
  }, [favorites, isMarkedAsFavorite, info])

  const formatImageUrl = (images) =>
    sliceArrayLength(images, 15).map((item) =>
      getImageApi(item.file_path, 'uri', 'original')
    )

  const getInfosDetail = ({ runtime = 0, genres = '', release_date = '' }) => ({
    Duration: convertMinsToHrsMins(runtime),
    Genre: convertToGenres(genres),
    Release: convertToDate(release_date)
  })

  useEffect(() => {
    requestMoviesInfo()
  }, [])

  const requestMoviesInfo = async () => {
    try {
      setIsLoading(true)

      const { id } = params
      console.log('[id]', id)
      const data = await request(`movie/${id}`, {
        //  include_image_language: 'en,null',
        append_to_response: 'credits,videos,images'
      })
      setIsLoading(false)
      setIsError(false)
      setInfo({
        id,
        poster_path: data.poster_path || INITIAL_INFO.poster_path,
        title: data.title || INITIAL_INFO.title,
        voteAverage: data.vote_average || INITIAL_INFO.voteAverage,
        overview: data.overview || INITIAL_INFO.overview,
        cast: sliceArrayLength(data.credits.cast, 15),
        crew: sliceArrayLength(data.credits.crew, 15),
        productionCompanies: sliceArrayLength(data.production_companies, 10),
        images: formatImageUrl(data.images.backdrops),
        infosDetail: getInfosDetail(data)
      })
    } catch (err) {
      setIsLoading(false)
      setIsError(true)
    }
  }

  const renderItem = (item) => {
    return <CastItem item={item} />
  }

  const { poster_path, voteAverage, title, infosDetail, overview, cast } = info

  if (isError) {
    return (
      <EmptyState
        image={require('../assets/empty-discover.jpg')}
        title="No movie found"
        message="Try selecting any other movie"
        actionLabel="Go to Discover"
        onAction={() => navigation.navigate('Discover')}
      />
    )
  }

  console.log('[infosDetail]', infosDetail)

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
          <Image
            accessibilityRole="imagebutton"
            accessibilityLabel={`${title} image`}
            uri={getImageApi(poster_path)}
            height={imageWidth / POSTER_ASPECT_RATIO}
            width={imageWidth}
            style={styles.image}
          />
          <View style={ratingContainer}>
            <RatingComponent value={Math.round(voteAverage / 2)} />
          </View>
          <Text style={[textStyles.small, styles.info]}>
            {` ${convertToYear(infosDetail?.Release)} • ${
              infosDetail?.Genre
            } • ${info?.infosDetail?.Duration}`}
          </Text>
        </View>
        <View>
          <Text style={textStyles.h2}>Overview</Text>
          <Text style={textStyles.paragraph}>{overview}</Text>
        </View>
        <View>
          <Text style={textStyles.h2}>Cast</Text>
          <CastList data={cast} renderItem={renderItem} />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 30,
    paddingHorizontal: horizontalPadding,
    gap: 30
  },
  image: {
    height: imageWidth / POSTER_ASPECT_RATIO,
    width: imageWidth,
    backgroundColor: 'lightgray',
    borderRadius: 350 / 10,
    marginHorizontal: imageHorizontalMargin,
    marginBottom: 20
  },
  info: {
    textAlign: 'center',
    paddingVertical: 5
  }
})
