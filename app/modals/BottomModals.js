import React, { useState } from "react";
import { useEffect } from "react";
import { Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

const ConfirmModal = ({
  show,
  title,
  message,
  okButtonText,
  okButtonColor,
  showSpinner,
  handleOkButton,
}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={show}>
      <View style={[styles.centeredView, { marginHorizontal: 5 }]}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{title}</Text>

          {showSpinner && <ActivityIndicator size="large" color="#0000ff" />}

          <Text style={styles.modalText}>{message}</Text>
          <Pressable
            style={[
              styles.button,
              styles.buttonClose,
              { backgroundColor: okButtonColor },
            ]}
            onPress={() => {
              handleOkButton();
            }}
          >
            <Text style={styles.textStyle}>{okButtonText}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
  },
  modalView: {
    width: "100%",

    backgroundColor: "#c6f7f8",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.45,
    shadowRadius: 4,
    elevation: 5,
    bottom: 0,
    position: "absolute",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default ConfirmModal;
