import React, { useState } from "react";
import { Modal, StyleSheet, Text, Pressable, View } from "react-native";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  ThumbUpAnimated,
  ThumbDownAnimated,
} from "../../assets/images/svg-images/ThumbAnimations";
import { FONTS } from "../constants/Assets";

const ConfirmModal = ({
  show,
  title,
  message,
  error,
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

          {showSpinner ? (
            <LoadingSpinner visible={true} size={60} />
          ) : error ? (
            <ThumbDownAnimated />
          ) : (
            <ThumbUpAnimated />
          )}

          <Text style={styles.modalText}>{message}</Text>
          <Pressable
            style={[styles.button, { backgroundColor: okButtonColor }]}
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
    backgroundColor: "#fff",
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
  textStyle: {
    color: "white",
    fontSize: 14,
    fontFamily: FONTS.RobotoRegular,
    textAlign: "center",
    paddingHorizontal: 10,
  },
  modalText: {
    textAlign: "center",
    fontSize: 24,
    fontFamily: FONTS.RobotoBold,
  },
});

export default ConfirmModal;
