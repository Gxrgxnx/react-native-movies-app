import React, { useState, useCallback, useEffect } from 'react';
import {
  StyleSheet,
  Button,
  View,
  Text,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNetInfo } from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as tvSeriesActions from '../store/actions/tvSeries';
import Colors from '../constants/Colors';
import { SearchBar, TvSeries } from '../components';
import { TvSeries as TvSeriesModel } from '../models/tvSeries';

export const TvSeriesOverviewScreen = ({ navigation }: { navigation: any }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>('test');
  const [clicked, setClicked] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState('');
  const [page, setPage] = useState(1);
  const tvSeries: TvSeriesModel[] = useSelector(
    (state: any) => state.tvSeries?.tvSeries,
  );
  const dispatch = useDispatch();
  const netInfo = useNetInfo();

  const loadTvSeries = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      if (netInfo !== null) {
        if (searchPhrase) {
          await dispatch(
            tvSeriesActions.fetchTvSeries({ searchPhrase, page }) as any,
          );
        } else {
          if (netInfo?.isConnected) {
            await dispatch(tvSeriesActions.fetchTvSeries({ page }) as any);
          } else {
            await dispatch(
              tvSeriesActions.fetchTvSeries({ offline: true }) as any,
            );
            setError('Bad Internet Connection');
          }
        }
      }
    } catch (err: any) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError, netInfo, clicked, page]);

  useEffect(() => {
    setIsLoading(true);
    loadTvSeries().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadTvSeries]);

  const selectTvSeriesHandler = (id: number) => {
    navigation.navigate('TvSeriesDetails', {
      tvSeriesId: id,
    });
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Oops, Something went wrong!</Text>
        <Button
          title="Try again"
          onPress={loadTvSeries}
          color={Colors.primary}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View>
      {error && (
        <View style={styles.error}>
          <Text style={styles.message}>{error}</Text>
        </View>
      )}
      <SearchBar
        clicked={clicked}
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        setClicked={setClicked}
      />
      <FlatList
        onRefresh={loadTvSeries}
        refreshing={isRefreshing}
        data={tvSeries}
        keyExtractor={item => item.id as any}
        renderItem={itemData => (
          <TvSeries
            image={itemData.item.image}
            title={itemData.item.title}
            onSelect={() => {
              selectTvSeriesHandler(itemData.item.id);
            }}>
            <Button
              color={Colors.primary}
              title="View Details"
              onPress={() => {
                selectTvSeriesHandler(itemData.item.id);
              }}
            />
            <Button
              color={Colors.accent}
              title="Add to Favorites"
              onPress={async () => {
                try {
                  const value = await AsyncStorage.getItem('FAVORITES');

                  if (value === null) {
                    const favorites = [itemData.item];

                    AsyncStorage.setItem(
                      'FAVORITES',
                      JSON.stringify(favorites),
                    );
                  } else {
                    let favorites = JSON.parse(value);

                    if (
                      !favorites.find(
                        (item: TvSeriesModel) => item.id === itemData.item.id,
                      )
                    ) {
                      favorites.push(itemData.item);

                      AsyncStorage.setItem(
                        'FAVORITES',
                        JSON.stringify(favorites),
                      );
                    }
                  }
                } catch (error) {
                  setError('Something went wrong!');
                }
              }}
            />
          </TvSeries>
        )}
        onEndReachedThreshold={0.2}
        onEndReached={() => {
          setPage(page + 1);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    margin: 15,
    alignItems: 'center',
  },
  error: {
    padding: 10,
    width: '100%',
    height: '5%',
    backgroundColor: '#636261',
    alignItems: 'center',
    opacity: 0.5,
    bottom: 0,
  },
  message: {
    alignItems: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
});
