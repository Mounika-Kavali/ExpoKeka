import React, { useState, useEffect } from "react";
import { View, Button } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as MediaLibrary from "expo-media-library";
import { FileUploader } from "../utils/ProfileApi";
import axios from "axios";
import { FILE_UPLOAD_API } from "../environment.development";

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
      console.log(result, "RESULT");

      setFile(result);

      uploadDocument();
    } catch (err) {
      console.error("Error picking document:", err);
    }
  };

  const uploadDocument = async () => {
    try {
      if (!file) {
        console.log("No file selected");
        return;
      }

      // // Convert file to binary format
      // const resp = await fetch(file.assets[0].uri);
      // const blob = await resp.blob();

      // Create FormData
      const formData = new FormData();
      formData.append("name", "RDV5930888.pdf"); // Replace with your desired name
      formData.append("description", "File to upload");
      formData.append(
        "csrfmiddlewaretoken",
        "UMjSlBvXVLPu7GeBTz0r6oTSDhJTumntrvxeTKHITaiGvsyJ1bZ2R1XSdJsD63j1"
      );
      formData.append("file", {
        uri: "C:/Users/Kavali Mounika/Pictures/Saved Pictures/neytiriii.jpg",
        name: "neytiriii.jpg",
        type: "image/jpg",
      });
      console.log(formData, "formData");
       console.log(formData._parts[3][1], "FILE");

      // Send POST request to upload the document
      const response = await axios.post(`${FILE_UPLOAD_API}`, {
        method: "post",
        body: formData,
        headers: {
          'Accept': "application/json",
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data, "RES");
    } catch (error) {
      console.error("Error uploading document:", error);
    }
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
