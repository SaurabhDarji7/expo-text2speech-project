import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F1F1F1",
    padding: 20,
  },
  form: {
    marginTop: 60,
    marginHorizontal: 30,
  },
  playBackOptions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 20,
  },
  options: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#4E6E5D",
    borderRadius: 50,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  newOptions: {
    width: 93,
    height: 93,
  },
  textInput: {
    borderBottomColor: "#4E6E5D",
    borderBottomWidth: 1.5,
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 5,
    fontSize: 18,
    color: "#4E6E5D",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#4E6E5D",
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
    color: "#4E6E5D",
    fontWeight: "bold",
    fontSize: 18,
  },
  flatlist: {
    marginTop: 20,
  },
  label: {
    fontSize: 40,
    textAlign: "center",
    marginTop: -10,
    marginBottom: 30,
    color: "black",
    fontWeight: "bold",
  },
  newlabel: {
    fontSize: 16,
    textAlign: "center",
    marginTop: -10,
    marginBottom: 30,
    color: "black",
    fontWeight: "bold",
  },
  label2: {
    borderRadius: 15,
    height: 100,
    padding: 10,
    marginBottom: 20,
    alignItems: "center",
    backgroundColor: "#fff",
    opacity: 0.9,
    borderWidth: 2,
    borderColor: "#4E6E5D",
    fontSize: 30,
    color: "#4E6E5D",
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: 300,
    marginBottom: 20,
    borderRadius: 10,
  },
  listItem: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#fff",
    borderColor: "#4E6E5D",
    borderRadius: 10,
    borderWidth: 1.5,
    textAlign: "center",
  },
  tts: {
    alignSelf: "center",
    marginTop: 25,
    width: "75%",
  },
});