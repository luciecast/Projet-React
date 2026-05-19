import React, { useState } from 'react';
import { View, Text, Button, TextInput, FlatList, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { addRecording, removeRecording } from '../Slice/recordsSlice';
import { startRecording, stopRecording, playSound } from '../utils/audio';
import { saveRecordingFile } from '../utils/file';
import { Audio } from 'expo-av';

const Record: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const recordings = useSelector((state: RootState) => state.records.list);

  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [currentUri, setCurrentUri] = useState<string | null>(null);
  const [name, setName] = useState('');

  const handleStart = async () => {
    try {
      const rec = await startRecording();
      setRecording(rec);
    } catch {
      Alert.alert('Erreur', 'Impossible de démarrer l’enregistrement');
    }
  };

const handleStop = async () => {
  if (!recording) return;
  const uri = await stopRecording(recording);
  console.log("STOP URI =", uri);
  setRecording(null);
  setCurrentUri(uri);
  Alert.alert("Info", "Enregistrement terminé, donne un nom puis sauvegarde");
};


  const handlePlay = async () => {
    if (!currentUri) return;
    await playSound(currentUri);
  };

  const handleSave = async () => {
    if (!currentUri || !name) {
      Alert.alert('Erreur', 'Enregistrement et nom requis');
      return;
    }
    const { id, uri } = await saveRecordingFile(currentUri, name);
    dispatch(addRecording({ id, name, uri }));
    setName('');
    setCurrentUri(null);
    Alert.alert('Succès', 'Enregistrement sauvegardé');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enregistrement audio</Text>

      <View style={styles.row}>
        <Button title="Start" onPress={handleStart} disabled={!!recording} />
        <Button title="Stop" onPress={handleStop} disabled={!recording} />
        <Button title="Play" onPress={handlePlay} disabled={!currentUri} />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Nom de l'enregistrement"
        value={name}
        onChangeText={setName}
      />
      <Button title="Sauvegarder" onPress={handleSave} disabled={!currentUri || !name} />

      <Text style={styles.subtitle}>Mes enregistrements</Text>
      <FlatList
        data={recordings}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
            <View style={styles.row}>
              <Button title="Play" onPress={() => playSound(item.uri)} />
              <Button title="Suppr" color="red" onPress={() => dispatch(removeRecording(item.id))} />
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Record;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, marginBottom: 16, textAlign: 'center' },
  subtitle: { fontSize: 16, marginTop: 16, marginBottom: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 8,
    borderRadius: 6,
  },
  item: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    marginBottom: 8,
  },
});
