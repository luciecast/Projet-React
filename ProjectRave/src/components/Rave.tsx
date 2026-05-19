import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, FlatList, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import {
  setModels,
  setSelectedModel,
  setSelectedAudioUri,
  setTransformedUri,
  setLoading,
} from '../Slice/raveSlice';
import { getModels, selectModel, uploadAudio } from '../utils/api';
import { playSound } from '../utils/audio';

const Rave: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { ip, port, connected } = useSelector((state: RootState) => state.server);
  const records = useSelector((state: RootState) => state.records.list);
  const rave = useSelector((state: RootState) => state.rave);

  const [originalUri, setOriginalUri] = useState<string | null>(null);

  useEffect(() => {
    const fetchModels = async () => {
      if (!connected) return;
      try {
        const models = await getModels(ip, port);
        dispatch(setModels(models));
        if (models.length > 0) dispatch(setSelectedModel(models[0]));
      } catch {
        Alert.alert('Erreur', 'Impossible de récupérer les modèles');
      }
    };
    fetchModels();
  }, [connected]);

  const handleSelectRecord = (uri: string) => {
    setOriginalUri(uri);
    dispatch(setSelectedAudioUri(uri));
  };

  const handleTransform = async () => {
    if (!originalUri) {
      Alert.alert('Erreur', 'Sélectionne un audio');
      return;
    }
    if (!rave.selectedModel) {
      Alert.alert('Erreur', 'Sélectionne un modèle');
      return;
    }
    try {
      dispatch(setLoading(true));
      await selectModel(ip, port, rave.selectedModel);
      await uploadAudio(ip, port, originalUri);

      dispatch(setTransformedUri(originalUri)); 
      Alert.alert('Info', 'Transformation terminée (download à implémenter)');
    } catch {
      Alert.alert('Erreur', 'Problème lors de la transformation');
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>RAVE - Transfert de timbre</Text>
      <Text>Serveur : {connected ? `${ip}:${port}` : 'Non connecté'}</Text>

      <Text style={styles.subtitle}>Modèles disponibles</Text>
      <FlatList
        data={rave.models}
        horizontal
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Button
            title={item}
            onPress={() => dispatch(setSelectedModel(item))}
            color={item === rave.selectedModel ? 'green' : 'gray'}
          />
        )}
      />

      <Text style={styles.subtitle}>Enregistrements</Text>
      <FlatList
        data={records}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Button
            title={item.name}
            onPress={() => handleSelectRecord(item.uri)}
            color={item.uri === originalUri ? 'blue' : 'gray'}
          />
        )}
      />

      <View style={{ marginVertical: 16 }}>
        <Button title="Transformer" onPress={handleTransform} disabled={rave.loading} />
        {rave.loading && <ActivityIndicator style={{ marginTop: 8 }} />}
      </View>

      <View style={styles.row}>
        <Button
          title="Play original"
          onPress={() => originalUri && playSound(originalUri)}
          disabled={!originalUri}
        />
        <Button
          title="Play transformé"
          onPress={() => rave.transformedUri && playSound(rave.transformedUri)}
          disabled={!rave.transformedUri}
        />
      </View>
    </View>
  );
};

export default Rave;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, marginBottom: 8, textAlign: 'center' },
  subtitle: { fontSize: 16, marginTop: 16, marginBottom: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 16 },
});
