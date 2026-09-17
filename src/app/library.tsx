import { useState } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { songs } from '../data/songs';
import SongCard from '../components/SongCard';
import BottomNav from '../components/BottomNav';

export default function Library() {
  const [tab, setTab] = useState('All');
  const [likedSongs, setLikedSongs] = useState(['1', '3']);

  const displayedSongs =
    tab === 'Liked songs'
      ? songs.filter(song => likedSongs.includes(song.id))
      : songs;

  const toggleLike = (id) => {
    if (likedSongs.includes(id)) {
      setLikedSongs(likedSongs.filter(songId => songId !== id));
    } else {
      setLikedSongs([...likedSongs, id]);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <Pressable
            style={styles.circle}
            onPress={() => router.push('/')}
          >
            <Ionicons name="arrow-back" size={21} color="#fff" />
          </Pressable>

          <Text style={styles.headerTitle}>My Music</Text>

          <Pressable style={styles.circle}>
            <Ionicons name="ellipsis-horizontal" size={21} color="#fff" />
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabs}
        >
          {['All', 'Liked songs', 'Playlist', 'Downloads'].map(item => (
            <Pressable
              key={item}
              style={[
                styles.tab,
                tab === item && styles.activeTab,
              ]}
              onPress={() => setTab(item)}
            >
              <Text
                style={[
                  styles.tabText,
                  tab === item && styles.activeTabText,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {displayedSongs.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons
              name="musical-notes-outline"
              size={50}
              color="#555"
            />
            <Text style={styles.emptyText}>
              No songs found
            </Text>
          </View>
        ) : (
          displayedSongs.map(song => (
            <SongCard
              key={song.id}
              song={song}
              liked={likedSongs.includes(song.id)}
              onLike={() => toggleLike(song.id)}
              onPress={() =>
                router.push({
                  pathname: '/player',
                  params: { id: song.id },
                })
              }
            />
          ))
        )}
      </ScrollView>

      <BottomNav
        current="library"
        onHome={() => router.push('/')}
        onLibrary={() => router.push('/library')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  content: {
    paddingTop: 55,
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#242424',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabs: {
    marginBottom: 25,
  },
  tab: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#242424',
    marginRight: 8,
  },
  activeTab: {
    backgroundColor: '#c9f368',
  },
  tabText: {
    color: '#aaa',
    fontSize: 12,
  },
  activeTabText: {
    color: '#000',
    fontWeight: '700',
  },
  empty: {
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    color: '#777',
    marginTop: 10,
  },
});