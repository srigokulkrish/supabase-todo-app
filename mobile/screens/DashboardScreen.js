import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, StatusBar, ActivityIndicator, RefreshControl, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus } from 'lucide-react-native';
import { supabase } from '../lib/supabase';
import TodoListCard from '../components/TodoListCard';
import AddEditModal from '../components/AddEditModal';

export default function DashboardScreen({ navigation }) {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingList, setEditingList] = useState(null);
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    fetchLists();
  }, []);

  async function fetchLists() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('todo_lists')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    
    if (error) console.error('Error fetching lists:', error);
    else setLists(data);
    setLoading(false);
    setRefreshing(false);
  }

  const onRefresh = () => {
    setRefreshing(true);
    fetchLists();
  };

  async function handleSaveList(listData) {
    setSaveLoading(true);
    const { data: { user } } = await supabase.auth.getUser();

    if (editingList) {
      const { error } = await supabase
        .from('todo_lists')
        .update({
          title: listData.title,
          description: listData.description,
        })
        .eq('id', editingList.id);
      
      if (error) Alert.alert('Error', error.message);
      else {
        setModalVisible(false);
        fetchLists();
      }
    } else {
      const { error } = await supabase.from('todo_lists').insert({
        title: listData.title,
        description: listData.description,
        user_id: user.id,
      });

      if (error) Alert.alert('Error', error.message);
      else {
        setModalVisible(false);
        fetchLists();
      }
    }
    setSaveLoading(false);
  }

  async function handleDeleteList(id) {
    Alert.alert(
      'Delete List',
      'Are you sure you want to delete this list and all its tasks?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            const { error } = await supabase
              .from('todo_lists')
              .delete()
              .eq('id', id);
            
            if (error) Alert.alert('Error', error.message);
            else fetchLists();
          }
        },
      ]
    );
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>My Lists</Text>
          <Text style={styles.subtitle}>Manage your tasks efficiently.</Text>
        </View>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => {
            setEditingList(null);
            setModalVisible(true);
          }}
        >
          <Plus size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={lists}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TodoListCard 
            list={item} 
            onPress={() => navigation.navigate('TodoListDetail', { list: item })}
            onEdit={() => {
              setEditingList(item);
              setModalVisible(true);
            }}
            onDelete={() => handleDeleteList(item.id)}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No lists found.</Text>
            <TouchableOpacity 
              style={styles.emptyButton} 
              onPress={() => {
                setEditingList(null);
                setModalVisible(true);
              }}
            >
              <Text style={styles.emptyButtonText}>Create your first list</Text>
            </TouchableOpacity>
          </View>
        }
      />

      <AddEditModal
        visible={modalVisible}
        title={editingList ? "Edit List" : "Add New List"}
        initialData={editingList || { title: '', description: '' }}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveList}
        loading={saveLoading}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  listContent: {
    padding: 24,
    paddingBottom: 100,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    color: '#94a3b8',
    fontSize: 16,
    marginBottom: 16,
  },
  emptyButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#3b82f6',
    borderRadius: 12,
  },
  emptyButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
