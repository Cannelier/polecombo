import * as ImagePicker from 'expo-image-picker';
import { Button, StyleSheet, View } from 'react-native';

export default function UploadImage({ setImage }: { setImage: (image: ImagePicker.ImagePickerAsset) => void }) {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });


    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title="Choisir une image"
        onPress={pickImage}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});