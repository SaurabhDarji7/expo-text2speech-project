import React, { useState } from "react";
import {
  View,
  Button,
  TextInput,
  Alert,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import * as Speech from "expo-speech";

const SecondScreen = () => {
  const [thingToSay, setThingToSay] = useState("");

  const thingToSayHandler = (value) => {
    setThingToSay(value);
  };

  const showAlert = async () =>
    await Alert.alert(
      "",
      "Clear Text?",
      [
        {
          text: "No",
          onPress: () => {},
        },
        {
          text: "Yes",
          onPress: () => {
            setThingToSay("");
          },
        },
      ],
      { cancelable: true } // Allows to be tapped off of
    ); // END showAlert

  const speak = () => {
    Speech.isSpeakingAsync().then(function (result) {
      if (!result) {
        Speech.speak(thingToSay);
      }
    });
  };

  const stopSpeaking = () => {
    Speech.isSpeakingAsync().then(function (result) {
      if (result) {
        Speech.stop();
      }
    });
  };

  const restartSpeaking = () => {
    Speech.isSpeakingAsync().then(function (result) {
      if (result) {
        Speech.stop();
        Speech.speak(thingToSay);
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.textInputContainer}>
        <TextInput
          placeholder="Write something to say..."
          style={styles.textInput}
          onChangeText={thingToSayHandler}
          value={thingToSay}
          multiline={true}
          numberOfLines={5}
        />
      </View>
      <View style={styles.playBackOptions}>
        <TouchableOpacity onPress={speak}>
          <Image
            style={styles.playbackIcon}
            source={require("../assets/play_cropped_transparent.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={stopSpeaking}>
          <Image
            style={styles.playbackIcon}
            source={require("../assets/stop_cropped_transparent.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={restartSpeaking}>
          <Image
            style={styles.playbackIcon}
            source={require("../assets/repeat_cropped_transparent.png")}
          />
        </TouchableOpacity>
      </View>

      <View
        style={[styles.button, { backgroundColor: "#FFBCD1", color: "white" }]}
      >
        <Button title="Clear" color="white" onPress={showAlert} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  button: {
    width: "60%",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    alignContent: "center",
    alignSelf: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333333",
  },
  textInputContainer: {
    marginVertical: 10,
  },
  textInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    padding: 12,
    fontSize: 18,
    color: "#333333",
  },
  playbackIcon: {
    width: 50,
    height: 50,
    marginRight: 15,
    tintColor: "#5F5F5F",
  },
  playBackOptions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  optionButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 5,
    alignItems: "center",
  },
  optionButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  clearButtonContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  clearButton: {
    backgroundColor: "#F44336",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  clearButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  feedbackContainer: {
    marginTop: 30,
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#CCCCCC",
  },
  feedbackText: {
    fontSize: 18,
    color: "#333333",
  },
  errorText: {
    fontSize: 16,
    color: "#F44336",
    marginTop: 10,
  },
});

export default SecondScreen;
