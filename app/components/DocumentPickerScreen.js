import React, { useState, useEffect } from "react";
import { View, Button } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as MediaLibrary from "expo-media-library";
import { FileUploader } from "../utils/ProfileApi";

const DocumentPickerScreen = () => {
  const [file, setFile] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access media library denied");
      }
    })();
  }, []);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });
console.log(result,"RESULT")
console.log(result.canceled)
      if(!result.canceled){
        setFile(result)
      }
        uploadDocument();
     
    } catch (err) {
      console.error("Error picking document:", err);
    }
  };

  const uploadDocument = async () => {
    console.log(file,"file")
    const formData = new FormData();
    formData.append("file", {
      uri:file.assets[0].uri,
      type: "application/pdf",
      name: file.assets[0].name,
    });

    await FileUploader({ formData });
  };

  return (
    <View>
      <View>
        <Button title="Upload Document" onPress={pickDocument} />
      </View>
    </View>
  );
};

export default DocumentPickerScreen;
