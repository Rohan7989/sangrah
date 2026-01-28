
// import React, { useState } from 'react';
// import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useFocusEffect } from '@react-navigation/native';

// export default function SearchPage() {
//   const [search, setSearch] = useState('');
//   const [savedData, setSavedData] = useState<any[]>([]);

//   // Load data whenever screen comes into focus
//   useFocusEffect(
//     React.useCallback(() => {
//       const loadData = async () => {
//         const jsonValue = await AsyncStorage.getItem('links');
//         if (jsonValue) setSavedData(JSON.parse(jsonValue));
//       };
//       loadData();
//     }, [])
//   );

//   // Delete entry
//   const handleDelete = async (index: number) => {
//     const newData = savedData.filter((_, i) => i !== index);
//     setSavedData(newData);
//     await AsyncStorage.setItem('links', JSON.stringify(newData));
//   };

//   const filteredData = savedData.filter(item =>
//     item.name.toLowerCase().includes(search.toLowerCase()) ||
//     item.notes.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Search Links</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Search...."
//         value={search}
//         onChangeText={setSearch}
//       />

//       <FlatList
//         data={filteredData}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={({ item, index }) => (
//           <View style={styles.card}>
//             {/* Delete button top-right */}
//             <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(index)}>
//               <Text style={styles.deleteText}>delete</Text>
//             </TouchableOpacity>

//             <Text style={styles.cardText}>📌 {item.name}</Text>
//             <Text style={styles.cardText}>Free: {item.isFree ? 'Yes' : 'No'}</Text>
//             <Text style={styles.cardText}>Sign-in: {item.requiresSignIn ? 'Yes' : 'No'}</Text>
//             <Text style={styles.cardText}>Platform: {item.platform}</Text>
//             <Text style={styles.cardText}>Notes: {item.notes}</Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: 'white' },
//   title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
//   input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 10 },
//   card: { 
//     borderWidth: 1, 
//     borderColor: '#ddd', 
//     padding: 10, 
//     marginVertical: 5, 
//     borderRadius: 5, 
//     backgroundColor: '#f9f9f9',
//     position: 'relative'
//   },
//   cardText: { color: 'black' },
//   deleteButton: {
//     position: 'absolute',
//     top: 5,
//     right: 5,
//     backgroundColor: '#ff4d4d',
//     borderRadius: 12,
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//   },
//   deleteText: { color: 'white', fontWeight: 'bold' },
// });

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SearchPage() {
  const [search, setSearch] = useState('');
  const [savedData, setSavedData] = useState<any[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      const loadData = async () => {
        const jsonValue = await AsyncStorage.getItem('links');
        if (jsonValue) setSavedData(JSON.parse(jsonValue));
      };
      loadData();
    }, [])
  );

  const handleDelete = async (index: number) => {
    const newData = savedData.filter((_, i) => i !== index);
    setSavedData(newData);
    await AsyncStorage.setItem('links', JSON.stringify(newData));
  };

  const filteredData = savedData.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.notes.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔍 Search Links</Text>
      <TextInput
        style={styles.input}
        placeholder="Type to search..."
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(index)}>
              <Text style={styles.deleteText}>✖</Text>
            </TouchableOpacity>
            <Text style={styles.cardText}>📌 {item.name}</Text>
            <Text style={styles.cardText}>Free: {item.isFree ? 'Yes' : 'No'}</Text>
            <Text style={styles.cardText}>Sign-in: {item.requiresSignIn ? 'Yes' : 'No'}</Text>
            <Text style={styles.cardText}>Platform: {item.platform}</Text>
            <Text style={styles.cardText}>Notes: {item.notes}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f0f4f7' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, color: '#2c3e50', textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, marginVertical: 10, borderRadius: 8, backgroundColor: '#fff', elevation: 2 },
  card: { borderWidth: 1, borderColor: '#ddd', padding: 15, marginVertical: 8, borderRadius: 10, backgroundColor: '#fff', elevation: 3, position: 'relative' },
  cardText: { color: '#333', fontSize: 16, marginBottom: 4 },
  deleteButton: { position: 'absolute', top: 5, right: 5, backgroundColor: '#e74c3c', borderRadius: 12, paddingHorizontal: 6, paddingVertical: 2 },
  deleteText: { color: 'white', fontWeight: 'bold' },
});
