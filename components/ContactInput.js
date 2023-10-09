import React, { useState } from "react";
import { View, StyleSheet, TextInput, Button, Modal, Text } from "react-native";
import { db } from "../firebase";
import { ref, set } from "firebase/database";

const ContactInput = (props) => {
  const [enteredContactItemFirstName, setContactFirstName] = useState("");
  const [enteredContactItemLastName, setContactLastName] = useState("");
  const [enteredContactItemEmail, setContactNumEmail] = useState("");

  const ContactInputFirstNameHandler = (value) => {
    setContactFirstName(value);
  };
  const ContactInputLastNameHandler = (value) => {
    setContactLastName(value);
  };

  const ContactInputNumEmailHandler = (value) => {
    setContactNumEmail(value);
  };

  const addItemHandler = () => {
    var info =
      enteredContactItemFirstName +
      " " +
      enteredContactItemLastName +
      "  -  " +
      enteredContactItemEmail;

    props.onAddItem(info);
    setContactFirstName("");
    setContactLastName("");
    setContactNumEmail("");
    set(
      ref(
        db,
        "contacts/" + enteredContactItemFirstName + enteredContactItemLastName
      ),
      {
        FirstName: enteredContactItemFirstName,
        LastName: enteredContactItemLastName,
        Email: enteredContactItemEmail,
      }
    );
    alert("Contact Susccefully Added!");
  };

  return (
    <Modal visible={props.visible} animationType="fade" style={{}}>
      <View visible={props.visible} style={styles.inputContainer}>
        <Text style={styles.heading}>Expo Project</Text>
        <Text style={styles.label}>Saurabh Darji</Text>
        <Text style={styles.addContact}>Add Contact</Text>

        <TextInput
          placeholder="Contact First Name"
          style={styles.input}
          onChangeText={ContactInputFirstNameHandler}
          value={enteredContactItemFirstName}
        />
        <TextInput
          placeholder="Contact Last Name"
          style={styles.input}
          onChangeText={ContactInputLastNameHandler}
          value={enteredContactItemLastName}
        />
        <TextInput
          placeholder="Phone Number/Email"
          style={styles.input}
          onChangeText={ContactInputNumEmailHandler}
          value={enteredContactItemEmail}
        />

        <View style={styles.buttonContainer}>
          <View style={[styles.button, { backgroundColor: "#CC7351" }]}>
            <Button title="CANCEL" color="white" onPress={props.onCancel} />
          </View>
          <View style={[styles.button, { backgroundColor: "#5AA469" }]}>
            <Button title="ADD" color="white" onPress={addItemHandler} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D3DEDC",
  },
  input: {
    width: "80%",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "black",
    color: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
    marginTop: 20,
  },
  button: {
    width: "45%",
    borderRadius: 10,
    padding: 10,
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  addContact: {
    fontSize: 30,
    fontWeight: "bold",
    paddingTop: 75,
    paddingBottom: 20,
  },
  heading: {
    fontSize: 50,
    marginBottom: 20,
    marginTop: -150,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default ContactInput;
