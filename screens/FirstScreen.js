import React, { useState } from "react";

import {
  View,
  Text,
  Platform,
  FlatList,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import * as MailComposer from "expo-mail-composer";
import * as ImagePicker from "expo-image-picker";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import * as Clipboard from "expo-clipboard";

import ContactInput from "../components/ContactInput";
import CustomHeaderButton from "../components/CustomHeaderButton";

import { styles } from "../styles/styles.js";
import { createWorklet } from "react-native-reanimated";

const cancelDialog = {
  text: "Close",
  style: "cancel",
};

const promptForEmailResponse = (input) => {
  Alert.alert(
    "Email Send Confirmation",
    input,
    //array of buttons
    [cancelDialog],
    { cancelable: true } //tap outside the screen - false: wont close, true: will close
  );
};

const ContactListItem = (props) => {
  const showAlert = async (data) =>
    await Alert.alert(
      "Add a file",
      "Do you want to attach a file?",
      [
        {
          text: "No",
          onPress: () => {
            sendMessageWithEmail(data);
          },
        },
        {
          text: "Yes",
          onPress: () => {
            sendEmailWithAttachment(data);
          },
        },
        {
          text: "Take Photo",
          onPress: () => {
            sendEmailWithCameraAttachment(data);
          },
        },
      ],
      { cancelable: true }
    );

  const sendEmailWithAttachment = async (data) => {
    //get the image to attach.
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    let arr = data.split("-");

    const isAvailable = await MailComposer.isAvailableAsync();
    if (isAvailable) {
      var options = {
        recipients: [arr[1]],
        subject: "Mobile Project",
        body: "Dear " + arr[0] + "I hope this receives a 100% grade",
        attachments: [result.uri],
      };

      MailComposer.composeAsync(options).then((result) => {
        promptForEmailResponse(result.status);
      });
    } else {
      console.log("Email is not available on this device");
    }
  }; //END sendEmailWithAttachment

  const sendEmailWithCameraAttachment = async (data) => {
    //get the image to attach.
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1.0,
    });

    let arr = data.split("-");

    const isAvailable = await MailComposer.isAvailableAsync();
    if (isAvailable) {
      var options = {
        recipients: [arr[1]],
        subject: "Mobile Project",
        body: "Dear " + arr[0] + "I hope this receives a 100% grade",
        attachments: [result.uri],
      };

      MailComposer.composeAsync(options).then((result) => {
        promptForEmailResponse(result.status);
      });
    } else {
      console.log("Email is not available on this device");
    }
  }; //END sendEmailWithAttachment

  const sendMessageWithEmail = async (data) => {
    let arr = data.split("-");

    const isAvailable = await MailComposer.isAvailableAsync();
    if (isAvailable) {
      var options = {
        recipients: [arr[1]],
        subject: "MAIL COMPOSER",
        body: "Dear " + arr[0] + "I hope this receives a 100% grade",
      };

      MailComposer.composeAsync(options).then((result) => {
        promptForEmailResponse(result.status);
      });
    } else {
      console.log("Email is not available on this device");
    }
  }; //END sendMessageWithEmail

  const copyToClipboard = (data) => {
    //console.log(data);
    if (data != null) {
      Clipboard.setString(data);
    }
  };

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => showAlert(props.item)}
        onLongPress={() => copyToClipboard(props.item)}
      >
        <View style={styles.listItem}>
          <Text> {props.item} </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const FirstScreen = (props) => {
  [message, setMessage] = useState();
  const [contactList, setcontactList] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const addContactItemHandler = (contactItem) => {
    setcontactList((contactList) => [
      ...contactList,
      { key: Math.random().toString(), value: contactItem },
    ]);
    setIsAddMode(false);
  };

  const removecontactItemHandler = (itemId) => {
    setcontactList((contactList) => {
      return contactList.filter((item) => item.key !== itemId);
    });
  };

  onChangeHandler = (value) => {
    setMessage(value);
  };

  React.useLayoutEffect(() => {
    props.navigation?.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Add new Contact"
            iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
            onPress={() => setIsAddMode(true)}
          />
        </HeaderButtons>
      ),
    });
  }, []);

  return (
    <View style={styles.screen}>
      <View
        style={[styles.button, { backgroundColor: "blue", color: "white" }]}
      >
        <Button
          title="Text-to-Speech"
          color="white"
          onPress={() => props.navigation?.navigate("SecondScreen")}
        />
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Contacts</Text>
        <Text style={styles.newlabel}>
          Click on the + button on the top right corner to add a Contact to the
          Firebase Realtime DB!
        </Text>

        <FlatList
          style={styles.flatlist}
          data={contactList}
          renderItem={(itemData) => (
            <ContactListItem
              id={itemData.item.key} // To access ItemData you need to acess the item which is the contactList
              onDelete={removecontactItemHandler}
              item={itemData.item.value}
            />
          )}
        />

        <ContactInput
          visible={isAddMode}
          onCancel={() => setIsAddMode(false)}
          onAddItem={addContactItemHandler}
        />
      </View>
    </View> // MAIN VIEW
  );
};

export default FirstScreen;
