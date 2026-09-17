import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function MiniPlayer({ song, isPlaying, onPress, onPlay }) {
  if (!song) return null;

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Image source={{ uri: song.albumArt }} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.title}>{song.title}</Text>
        <Text style={styles.artist}>{song.artist}</Text>
      </View>

      <Pressable onPress={onPlay} style={styles.button}>
        <Ionicons name={isPlaying ? "pause" : "play"} size={21} color="#000" />
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 72,
    left: 12,
    right: 12,
    height: 64,
    borderRadius: 16,
    backgroundColor: "#242424",
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    zIndex: 10,
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 10,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
  },
  artist: {
    color: "#999",
    fontSize: 11,
    marginTop: 3,
  },
  button: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});
