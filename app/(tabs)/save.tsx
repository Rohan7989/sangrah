import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SavePage() {
  const [name, setName] = useState('');
  const [isFree, setIsFree] = useState(false);
  const [requiresSignIn, setRequiresSignIn] = useState(false);
  const [platform, setPlatform] = useState('Website');
  const [notes, setNotes] = useState('');

  const handleSave = async () => {
    const entry = { name, isFree, requiresSignIn, platform, notes };
    const existing = await AsyncStorage.getItem('links');
    const newData = existing ? [...JSON.parse(existing), entry] : [entry];
    await AsyncStorage.setItem('links', JSON.stringify(newData));

    setName('');
    setIsFree(false);
    setRequiresSignIn(false);
    setPlatform('Website');
    setNotes('');
    alert('Saved!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💾 Add a Link</Text>
      <TextInput style={styles.input} placeholder="Website link/App Name" value={name} onChangeText={setName} />
      <View style={styles.row}><Text style={styles.label}>Free?</Text><Switch value={isFree} onValueChange={setIsFree} /></View>
      <View style={styles.row}><Text style={styles.label}>Sign-in Required?</Text><Switch value={requiresSignIn} onValueChange={setRequiresSignIn} /></View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.optionButton} onPress={() => setPlatform('Website')}>
          <Text style={styles.optionText}>🌐 Website</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton} onPress={() => setPlatform('App')}>
          <Text style={styles.optionText}>📱 App</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton} onPress={() => setPlatform('Both')}>
          <Text style={styles.optionText}>🔗 Both</Text>
        </TouchableOpacity>
      </View>
      <TextInput style={styles.input} placeholder="Notes/Tags" value={notes} onChangeText={setNotes} />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f0f4f7' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, color: '#2c3e50', textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, marginVertical: 10, borderRadius: 8, backgroundColor: '#fff', elevation: 2 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 },
  label: { fontSize: 16, color: '#333' },
  optionButton: { backgroundColor: '#3498db', padding: 10, borderRadius: 8, marginHorizontal: 5 },
  optionText: { color: 'white', fontWeight: 'bold' },
  saveButton: { backgroundColor: '#2ecc71', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 20 },
  saveButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});
