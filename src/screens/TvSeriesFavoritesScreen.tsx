import React, { useCallback, useEffect, useState } from 'react';
import { Button, FlatList, View, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../constants/Colors';
import { TvSeries } from '../components';
import { TvSeries as TvSeriesModel } from '../models/tvSeries';

export const TvSeriesFavoritesScreen = ({
  navigation,
}: {
  navigation: any;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>();
  const [tvSeries, setTvSeries] = useState<TvSeriesModel[]>([]);
  const dispatch = useDispatch();

  const selectTvSeriesHandler = (id: number) => {
    navigation.navigate('TvSeriesDetails', {
      tvSeriesId: id,
    });
  };

  const loadFavorites = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      let value = await AsyncStorage.getItem('FAVORITES');

      if (value) {
        setTvSeries(JSON.parse(value));
      }
    } catch (err: any) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    setIsLoading(true);
    loadFavorites().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadFavorites]);

  if (!isLoading && tvSeries.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No Favorite TV Series found</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        onRefresh={loadFavorites}
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
              color="red"
              title="Remove"
              onPress={async () => {
                try {
                  const value = await AsyncStorage.getItem('FAVORITES');
                  if (value !== null) {
                    let favorites = JSON.parse(value);

                    favorites = favorites.filter(
                      (item: TvSeriesModel) => item.id !== itemData.item.id,
                    );

                    setTvSeries(favorites);

                    AsyncStorage.setItem(
                      'FAVORITES',
                      JSON.stringify(favorites),
                    );
                  }
                } catch (error) {
                  setError('Something went wrong!');
                }
              }}
            />
          </TvSeries>
        )}
      />
    </View>
  );
};
