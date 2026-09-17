import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BottomNav({ current, onHome, onLibrary }) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.item} onPress={onHome}>
        <Ionicons
          name={current === 'home' ? 'home' : 'home-outline'}
          size={23}
          color={current === 'home' ? '#c9f368' : '#888'}
        />
        <Text style={current === 'home' ? styles.active : styles.text}>
          Home
        </Text>
      </Pressable>

      <Pressable style={styles.item} onPress={onLibrary}>
        <Ionicons
          name={current === 'library' ? 'heart' : 'heart-outline'}
          size={23}
          color={current === 'library' ? '#c9f368' : '#888'}
        />
        <Text style={current === 'library' ? styles.active : styles.text}>
          My Music
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#181818',
    borderTopWidth: 1,
    borderTopColor: '#292929',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  text: {
    color: '#888',
    fontSize: 10,
  },
  active: {
    color: '#c9f368',
    fontSize: 10,
    fontWeight: '600',
  },
});