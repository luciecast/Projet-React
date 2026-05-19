import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setServerInfo, setConnected } from '../Slice/serverSlice';
import { testConnection } from '../utils/api';
import { RootState, AppDispatch } from '../../store/store';


const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const server = useSelector((state: RootState) => state.server);

  const [ip, setIp] = useState(server.ip);
  const [port, setPort] = useState(server.port);

  const handleTest = async () => {
    if (!ip || !port) {
      Alert.alert('Erreur', 'IP et port requis');
      return;
    }
    dispatch(setServerInfo({ ip, port }));
    const ok = await testConnection(ip, port);
    dispatch(setConnected(ok));
    Alert.alert(ok ? 'Succès' : 'Erreur', ok ? 'Connexion réussie' : 'Impossible de joindre le serveur');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion au serveur RAVE</Text>
      <TextInput
        style={styles.input}
        placeholder="Adresse IP"
        value={ip}
        onChangeText={setIp}
      />
      <TextInput
        style={styles.input}
        placeholder="Port"
        value={port}
        onChangeText={setPort}
        keyboardType="numeric"
      />
      <Button title="Tester la connexion" onPress={handleTest} />
      <Text style={styles.status}>
        Statut : {server.connected ? 'Connecté' : 'Non connecté'}
      </Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  title: { fontSize: 20, marginBottom: 16, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 12,
    borderRadius: 6,
  },
  status: { marginTop: 16, textAlign: 'center' },
});
