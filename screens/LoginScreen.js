import React, { useState } from "react";
import { View, TextInput, Text, Button, Alert, StyleSheet } from "react-native";
import { firestore, db, auth } from "../firebase";
import { ref, set } from "firebase/database";
const LoginScreen = (props) => {
  const [registrationEmail, setRegistrationEmail] = useState("");
  const [registrationPassword, setRegistrationPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [databaseData, setDatabaseData] = useState("");

  const registerWithFirebase = () => {
    if (registrationEmail.length < 4) {
      Alert.alert("Please enter an email address.");
      return;
    }

    if (registrationPassword.length < 4) {
      Alert.alert("Please enter a password.");
      return;
    }

    auth
      .createUserWithEmailAndPassword(registrationEmail, registrationPassword)
      .then(function (_firebaseUser) {
        Alert.alert("user registered!");

        setRegistrationEmail("");
        setRegistrationPassword("");
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode == "auth/weak-password") {
          Alert.alert("The password is too weak.");
        } else {
          Alert.alert(errorMessage);
        }
        console.log(error);
      });
  };

  const loginWithFirebase = () => {
    if (loginEmail.length < 4) {
      Alert.alert("Please enter an email address.");
      return;
    }

    if (loginPassword.length < 4) {
      Alert.alert("Please enter a password.");
      return;
    }

    auth
      .signInWithEmailAndPassword(loginEmail, loginPassword)
      .then(function (_firebaseUser) {
        Alert.alert("user logged in!");
        setLoggedIn(true);
        props.navigation.navigate("FirstScreen");
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode === "auth/wrong-password") {
          Alert.alert("Wrong password.");
        } else {
          Alert.alert(errorMessage);
        }
      });
  };
  const MovetoNextScreen = () => {
    props.navigation.navigate("FirstScreen");
  };

  const signoutWithFirebase = () => {
    auth.signOut().then(function () {
      if (!auth.currentUser) {
        Alert.alert("user was logged out!");
        setLoggedIn(false);
        setLoginEmail("");
        setLoginPassword("");
      }
    });
  };

  return (
    <View style={styles.form}>
      {!loggedIn && (
        <View>
          <View>
            <Text style={styles.label}>Register with Firebase</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(value) => setRegistrationEmail(value)}
              autoCapitalize="none"
              autoCorrect={false}
              autoCompleteType="email"
              keyboardType="email-address"
              placeholder="email"
            />
            <TextInput
              style={styles.textInput}
              onChangeText={(value) => setRegistrationPassword(value)}
              autoCapitalize="none"
              autoCorrect={false}
              autoCompleteType="password"
              keyboardType="visible-password"
              placeholder="password"
            />
          </View>
          <View
            style={[
              styles.button,
              { backgroundColor: "purple", color: "white" },
            ]}
          >
            <Button
              title="Register"
              color="white"
              onPress={registerWithFirebase}
            />
          </View>
          <View>
            <Text style={styles.label}>Sign In with Firebase</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(value) => setLoginEmail(value)}
              autoCapitalize="none"
              autoCorrect={false}
              autoCompleteType="email"
              keyboardType="email-address"
              placeholder="email"
            />
            <TextInput
              style={styles.textInput}
              onChangeText={(value) => setLoginPassword(value)}
              autoCapitalize="none"
              autoCorrect={false}
              autoCompleteType="password"
              keyboardType="visible-password"
              placeholder="password"
            />
          </View>
          <View
            style={[
              styles.button,
              { backgroundColor: "purple", color: "white" },
            ]}
          >
            <Button title="Log In" color="white" onPress={loginWithFirebase} />
          </View>
        </View>
      )}
      {loggedIn && (
        <View>
          <Text style={styles.label}>You are now Logged In!</Text>
          <View
            style={[
              styles.button,
              { backgroundColor: "green", color: "white" },
            ]}
          >
            <Button
              title="Move To Next Screen"
              color="white"
              onPress={MovetoNextScreen}
            />
          </View>
          <View
            style={[styles.button, { backgroundColor: "red", color: "white" }]}
          >
            <Button
              title="Log Out"
              color="white"
              onPress={signoutWithFirebase}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 30,
    marginTop: 60,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  label: {
    fontSize: 24,
    marginBottom: 30,
    textAlign: "center",
    fontWeight: "bold",
  },
  textInput: {
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonContainer: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
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
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  signOutButton: {
    marginTop: 30,
    alignSelf: "center",
  },
  signOutButtonText: {
    color: "#0080ff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default LoginScreen;
