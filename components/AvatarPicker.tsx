import { usePlayer } from "@/contexts/playerContext";
import { supabase } from "@/utils/supabase";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { ActivityIndicator, Alert, Image, Pressable, StyleSheet, View } from "react-native";

export default function AvatarPicker() {
  const { player, updatePlayerImage } = usePlayer();
  const [loading, setLoading] = useState(false);

  async function pickImage() {
    // Request both camera + library permissions
    const cameraPerm = await ImagePicker.requestCameraPermissionsAsync();
    const libraryPerm = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (cameraPerm.status !== "granted" || libraryPerm.status !== "granted") {
      alert("Camera and photo library permissions are required.");
      return;
    }

    // Ask user to choose between camera or library
    Alert.alert(
      "Choose Image",
      "How would you like to select your image?",
      [
        { text: "Choose from Library", onPress: pickFromLibrary },
        { text: "Take Photo", onPress: takePhoto },
        { text: "Cancel", style: "cancel" },
      ]
    );
  }

  async function pickFromLibrary() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      uploadToSupabase(result.assets[0].uri);
    }
  }

  async function takePhoto() {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      uploadToSupabase(result.assets[0].uri);
    }
  }

  async function uploadToSupabase(uri) {
    try {
        setLoading(true);

        const fileExt = uri.split(".").pop() || "jpg";
        const fileName = `${player.id}-${Date.now()}.${fileExt}`;

        // Fetch the file as arrayBuffer
        const response = await fetch(uri);
        const arrayBuffer = await response.arrayBuffer();

        // Upload the arrayBuffer
        const { data: uploadData, error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, arrayBuffer, {
            cacheControl: "3600",
            upsert: true,
            contentType: "image/jpeg",
        });

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: urlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(uploadData.path);

        const publicUrl = urlData.publicUrl;

        // Update player row
        const { error: dbError } = await supabase
        .from("players")
        .update({ image_url: publicUrl })
        .eq("id", player.id);

        if (dbError) throw dbError;

        // Update context
        updatePlayerImage(publicUrl);
        console.log("Updated context with:", publicUrl);
    } catch (err) {
        console.error("Image upload error:", err);
        alert("Failed to upload image.");
    }

    setLoading(false);
  }

  return (
    <Pressable onPress={pickImage} style={styles.wrapper}>
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      ) : (
        <Image
          source={{
            uri: player.imageUrl || "https://via.placeholder.com/150",
          }}
          style={styles.avatar}
        />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: 140,
    height: 140,
    borderRadius: 70,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ccc",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  loader: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
});
