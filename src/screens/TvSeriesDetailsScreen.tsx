import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { TvSeries } from '../models/tvSeries';

export const TvSeriesDetailsScreen: React.FC<any> = ({ route }) => {
  const tvSeries = useSelector((state: any) => state.tvSeries?.tvSeries);
  const [selectedTvSeries, setSelectedTvSeries] = useState<TvSeries | null>(
    null,
  );

  useEffect(() => {
    setSelectedTvSeries(
      tvSeries.find((show: TvSeries) => show.id === route.params?.tvSeriesId) ||
        null,
    );
  }, [tvSeries]);

  return (
    <ScrollView>
      {selectedTvSeries && (
        <>
          <View style={styles.detailsView}>
            <Text style={styles.title}>{selectedTvSeries.title}</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{ uri: selectedTvSeries.image }}
            />
          </View>
          <View style={styles.outerContainer}>
            {selectedTvSeries.rating && (
              <View style={styles.detailsInfo}>
                <Text>Rating: {selectedTvSeries.rating}</Text>
              </View>
            )}
            {selectedTvSeries.averageRuntime && (
              <View style={styles.detailsInfo}>
                <Text>
                  Average Runtime: {selectedTvSeries.averageRuntime} minutes
                </Text>
              </View>
            )}
            {selectedTvSeries.language && (
              <View style={styles.detailsInfo}>
                <Text>Language: {selectedTvSeries.language}</Text>
              </View>
            )}
            {selectedTvSeries.genres && (
              <View style={styles.detailsInfo}>
                <Text>Genre: {selectedTvSeries.genres.join(', ')}</Text>
              </View>
            )}
            {selectedTvSeries.officialSite && (
              <View style={styles.detailsInfo}>
                <Text>Official website: {selectedTvSeries.officialSite}</Text>
              </View>
            )}
            {selectedTvSeries.premiered && (
              <View style={styles.detailsInfo}>
                <Text>
                  Premiere:{' '}
                  {new Date(selectedTvSeries.premiered).toLocaleDateString()}
                </Text>
              </View>
            )}
            {selectedTvSeries.summary && (
              <View style={styles.detailsInfo}>
                <Text>
                  Summary:{' '}
                  {selectedTvSeries.summary.replace(/<\/?[^>]+(>|$)/g, '')}
                </Text>
              </View>
            )}
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
    height: 350,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    marginBottom: 10,
  },
  detailsView: {
    alignItems: 'center',
    padding: 15,
  },
  outerContainer: {
    alignItems: 'center',
  },
  detailsInfo: {
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginVertical: 4,
    marginHorizontal: 12,
    backgroundColor: '#dcdedd',
    borderRadius: 6,
    width: '65%',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});
