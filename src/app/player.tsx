import { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { songs } from '../data/songs';

export default function Player() {
  const { id } = useLocalSearchParams();

  const currentIndex = songs.findIndex((item) => item.id === id);
  const index = currentIndex === -1 ? 0 : currentIndex;
  const song = songs[index];

  const player = useAudioPlayer(song.audio);
  const status = useAudioPlayerStatus(player);

  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    setPlaying(status.playing);
  }, [status.playing]);

  const togglePlay = () => {
    if (status.playing) {
      player.pause();
    } else {
      player.play();
    }
  };

  const previousSong = () => {
    const previousIndex = index === 0 ? songs.length - 1 : index - 1;
    router.replace({
      pathname: '/player',
      params: { id: songs[previousIndex].id },
    });
  };

  const nextSong = () => {
    const nextIndex = index === songs.length - 1 ? 0 : index + 1;
    router.replace({
      pathname: '/player',
      params: { id: songs[nextIndex].id },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Now Playing</Text>

        <View style={styles.headerSpace} />
      </View>

      <View style={styles.content}>
        <Image source={{ uri: song.albumArt }} style={styles.image} />

        <Text style={styles.title}>{song.title}</Text>
        <Text style={styles.artist}>{song.artist}</Text>

        <View style={styles.progress}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${
                  status.duration
                    ? (status.currentTime / status.duration) * 100
                    : 0
                }%`,
              },
            ]}
          />
        </View>

        <View style={styles.time}>
          <Text style={styles.timeText}>
            {Math.floor(status.currentTime / 60)}:
            {String(Math.floor(status.currentTime % 60)).padStart(2, '0')}
          </Text>

          <Text style={styles.timeText}>
            {Math.floor(status.duration / 60)}:
            {String(Math.floor(status.duration % 60)).padStart(2, '0')}
          </Text>
        </View>

        <View style={styles.controls}>
          <TouchableOpacity onPress={previousSong}>
            <Text style={styles.control}>⏮</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.playButton} onPress={togglePlay}>
            <Text style={styles.playText}>{playing ? '❚❚' : '▶'}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={nextSong}>
            <Text style={styles.control}>⏭</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    height: 90,
    paddingTop: 45,
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  back: {
    color: 'white',
    fontSize: 40,
    lineHeight: 40,
  },
  headerTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  headerSpace: {
    width: 30,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingTop: 35,
  },
  image: {
    width: 320,
    height: 320,
    borderRadius: 15,
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: '800',
    marginTop: 28,
  },
  artist: {
    color: '#999',
    fontSize: 16,
    marginTop: 8,
  },
  progress: {
    width: '100%',
    height: 5,
    backgroundColor: '#444',
    borderRadius: 10,
    marginTop: 35,
  },
  progressFill: {
    height: 5,
    backgroundColor: '#c9f368',
    borderRadius: 10,
  },
  time: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  timeText: {
    color: '#888',
    fontSize: 12,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 35,
    marginTop: 35,
  },
  control: {
    color: 'white',
    fontSize: 30,
  },
  playButton: {
    width: 70,
    height: 70,
    borderRadius: 40,
    backgroundColor: '#c9f368',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playText: {
    color: '#121212',
    fontSize: 25,
    fontWeight: '800',
  },
});