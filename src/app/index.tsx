import { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
} from 'react-native';
import { router } from 'expo-router';
import { songs } from '../data/songs';

export default function Home() {
  const [search, setSearch] = useState('');
  const [showWelcome, setShowWelcome] = useState(true);

  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(search.toLowerCase()) ||
    song.artist.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good evening</Text>
            <Text style={styles.logo}>Soothe</Text>
          </View>

          <TouchableOpacity style={styles.profile}>
            <Text style={styles.profileText}>C</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>⌕</Text>

          <TextInput
            placeholder="What do you want to listen to?"
            placeholderTextColor="#777"
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />

          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Text style={styles.clear}>×</Text>
            </TouchableOpacity>
          )}
        </View>

        {search.length === 0 ? (
          <>
            <Text style={styles.heading}>Recommended for you</Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.recommended}
            >
              {songs.map((song) => (
                <TouchableOpacity
                  key={song.id}
                  style={styles.recommendedCard}
                  onPress={() =>
                    router.push({
                      pathname: '/player',
                      params: { id: song.id },
                    })
                  }
                >
                  <Image
                    source={{ uri: song.albumArt }}
                    style={styles.recommendedImage}
                  />

                  <Text style={styles.recommendedTitle} numberOfLines={1}>
                    {song.title}
                  </Text>

                  <Text style={styles.recommendedArtist} numberOfLines={1}>
                    {song.artist}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={styles.heading}>Top Songs</Text>
          </>
        ) : (
          <Text style={styles.searchResult}>
            Search results for "{search}"
          </Text>
        )}

        {filteredSongs.length > 0 ? (
          filteredSongs.map((song, index) => (
            <TouchableOpacity
              key={song.id}
              style={styles.song}
              onPress={() =>
                router.push({
                  pathname: '/player',
                  params: { id: song.id },
                })
              }
            >
              <Text style={styles.number}>{index + 1}</Text>

              <Image
                source={{ uri: song.albumArt }}
                style={styles.songImage}
              />

              <View style={styles.info}>
                <Text style={styles.title}>{song.title}</Text>
                <Text style={styles.artist}>{song.artist}</Text>
              </View>

              <Text style={styles.moreText}>•••</Text>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>No songs found</Text>
            <Text style={styles.emptyText}>
              Try another song or artist.
            </Text>
          </View>
        )}

        <View style={styles.bottomSpace} />
      </ScrollView>

      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIconActive}>⌂</Text>
          <Text style={styles.navTextActive}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push('/library')}
        >
          <Text style={styles.navIcon}>♫</Text>
          <Text style={styles.navText}>My Music</Text>
        </TouchableOpacity>
      </View>

      {showWelcome && (
        <View style={styles.overlay}>
          <View style={styles.popup}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoIcon}>♫</Text>
            </View>

            <Text style={styles.popupTitle}>Welcome to Soothe</Text>

            <Text style={styles.popupText}>
              Your little space to relax, listen, and enjoy your favorite music.
            </Text>

            <Pressable
              style={styles.startButton}
              onPress={() => setShowWelcome(false)}
            >
              <Text style={styles.startText}>Get Started</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 22,
  },
  greeting: {
    color: '#999',
    fontSize: 14,
    marginBottom: 3,
  },
  logo: {
    color: '#c9f368',
    fontSize: 34,
    fontWeight: '800',
  },
  profile: {
    width: 42,
    height: 42,
    borderRadius: 22,
    backgroundColor: '#c9f368',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    color: '#121212',
    fontSize: 17,
    fontWeight: '800',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#242424',
    height: 48,
    borderRadius: 12,
    marginHorizontal: 22,
    marginTop: 25,
    paddingHorizontal: 15,
  },
  searchIcon: {
    color: '#aaa',
    fontSize: 27,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: 'white',
    fontSize: 14,
  },
  clear: {
    color: '#aaa',
    fontSize: 25,
    paddingLeft: 10,
  },
  heading: {
    color: 'white',
    fontSize: 22,
    fontWeight: '800',
    marginTop: 30,
    marginBottom: 17,
    paddingHorizontal: 22,
  },
  searchResult: {
    color: 'white',
    fontSize: 20,
    fontWeight: '800',
    marginTop: 30,
    marginBottom: 20,
    paddingHorizontal: 22,
  },
  recommended: {
    paddingLeft: 22,
  },
  recommendedCard: {
    width: 150,
    marginRight: 15,
  },
  recommendedImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  recommendedTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 10,
  },
  recommendedArtist: {
    color: '#888',
    fontSize: 13,
    marginTop: 4,
  },
  song: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 22,
    marginBottom: 16,
  },
  number: {
    width: 25,
    color: '#777',
    fontSize: 15,
    textAlign: 'center',
  },
  songImage: {
    width: 58,
    height: 58,
    borderRadius: 7,
    marginLeft: 8,
  },
  info: {
    flex: 1,
    marginLeft: 15,
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  artist: {
    color: '#888',
    fontSize: 13,
    marginTop: 5,
  },
  moreText: {
    color: '#aaa',
    fontSize: 16,
    padding: 10,
  },
  empty: {
    alignItems: 'center',
    marginTop: 50,
  },
  emptyTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  emptyText: {
    color: '#777',
    marginTop: 8,
  },
  bottomSpace: {
    height: 100,
  },
  navbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 75,
    backgroundColor: '#181818',
    borderTopWidth: 1,
    borderTopColor: '#292929',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: {
    alignItems: 'center',
  },
  navIconActive: {
    color: '#c9f368',
    fontSize: 24,
  },
  navIcon: {
    color: '#777',
    fontSize: 24,
  },
  navTextActive: {
    color: '#c9f368',
    fontSize: 11,
    marginTop: 3,
  },
  navText: {
    color: '#777',
    fontSize: 11,
    marginTop: 3,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.78)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    zIndex: 10,
  },
  popup: {
    width: '100%',
    backgroundColor: '#1e1e1e',
    borderRadius: 24,
    paddingHorizontal: 25,
    paddingVertical: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#303030',
  },
  logoCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#c9f368',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoIcon: {
    color: '#121212',
    fontSize: 35,
    fontWeight: '800',
  },
  popupTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
  },
  popupText: {
    color: '#999',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 25,
  },
  startButton: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    backgroundColor: '#c9f368',
    justifyContent: 'center',
    alignItems: 'center',
  },
  startText: {
    color: '#121212',
    fontSize: 15,
    fontWeight: '800',
  },
});