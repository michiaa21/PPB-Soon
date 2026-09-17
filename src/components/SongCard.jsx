import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SongCard({ song, onPress, liked, onLike }) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.left}>
        <Image source={{ uri: song.albumArt }} style={styles.image} />

        <View style={styles.info}>
          <Text style={styles.title}>{song.title}</Text>
          <Text style={styles.artist}>{song.artist}</Text>
        </View>
      </View>

      <Pressable onPress={onLike} style={styles.like}>
        <Ionicons
          name={liked ? 'heart' : 'heart-outline'}
          size={21}
          color={liked ? '#c9f368' : '#999'}
        />
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    width: 58,
    height: 58,
    borderRadius: 12,
  },
  info: {
    marginLeft: 14,
    flex: 1,
  },
  title: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  artist: {
    color: '#999',
    fontSize: 12,
    marginTop: 4,
  },
  like: {
    padding: 8,
  },
});