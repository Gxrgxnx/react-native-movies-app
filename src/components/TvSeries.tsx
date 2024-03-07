import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import { Card } from './';

interface TvSeriesProps {
  onSelect: () => void;
  title: string;
  image: ImageSourcePropType;
  children: React.ReactNode;
}

export const TvSeries: React.FC<TvSeriesProps> = ({
  onSelect,
  title,
  image,
  children,
}) => {
  return (
    <Card style={styles.series}>
      <View style={styles.touchable}>
        <TouchableOpacity onPress={onSelect}>
          <View>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: image }} />
            </View>
            <View style={styles.details}>
              <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.actions}>{children}</View>
          </View>
        </TouchableOpacity>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  series: {
    height: 610,
    margin: 20,
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageContainer: {
    height: '87%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  details: {
    alignItems: 'center',
    padding: 5,
  },
  title: {
    fontSize: 18,
    marginVertical: 2,
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 4,
  },
});
