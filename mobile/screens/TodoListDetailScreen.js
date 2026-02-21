import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, StatusBar, ActivityIndicator, RefreshControl, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Plus } from 'lucide-react-native';
import { supabase } from '../lib/supabase';
import TodoItem from '../components/TodoItem';
import AddEditModal from '../components/AddEditModal';

export default function TodoListDetailScreen({ route, navigation }) {
  const { list: initialList } = route.params;
  const [list, setList] = useState(initialList);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .eq('list_id', list.id)
      .order('created_at', { ascending: false });
    
    if (error) console.error('Error fetching todos:', error);
    else setTodos(data);
    setLoading(false);
    setRefreshing(false);
  }

  async function toggleTodo(todo) {
    const { error } = await supabase
      .from('todos')
      .update({ completed: !todo.completed })
      .eq('id', todo.id);
    
    if (error) alert(error.message);
    else fetchTodos();
  }

  async function deleteTodo(id) {
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id);
    
    if (error) alert(error.message);
    else fetchTodos();
  }

  async function addTodo() {
    if (!newTodoTitle.trim()) return;

    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await supabase.from('todos').insert({
      title: newTodoTitle,
      list_id: list.id,
      user_id: user.id,
      completed: false,
    });

    if (error) alert(error.message);
    else {
      setNewTodoTitle('');
      fetchTodos();
    }
  }

  async function handleEditTodo(todoData) {
    setSaveLoading(true);
    const { error } = await supabase
      .from('todos')
      .update({
        title: todoData.title,
        description: todoData.description,
      })
      .eq('id', editingTodo.id);

    if (error) alert(error.message);
    else {
      setModalVisible(false);
      fetchTodos();
    }
    setSaveLoading(false);
  }

  const onRefresh = () => {
    setRefreshing(true);
    fetchTodos();
  };

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
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ArrowLeft size={24} color="#1e293b" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.title} numberOfLines={1}>{list.title}</Text>
          <Text style={styles.subtitle}>{todos.length} Tasks</Text>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task..."
          value={newTodoTitle}
          onChangeText={setNewTodoTitle}
          onSubmitEditing={addTodo}
        />
        <TouchableOpacity style={styles.addIconButton} onPress={addTodo}>
          <Plus size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TodoItem 
            todo={item} 
            onToggle={() => toggleTodo(item)}
            onDelete={() => deleteTodo(item.id)}
            onEdit={() => {
              setEditingTodo(item);
              setModalVisible(true);
            }}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No tasks yet. Get started!</Text>
          </View>
        }
      />

      <AddEditModal
        visible={modalVisible}
        title="Edit Task"
        initialData={editingTodo || { title: '', description: '' }}
        onClose={() => setModalVisible(false)}
        onSave={handleEditTodo}
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
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerTitleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  subtitle: {
    fontSize: 12,
    color: '#64748b',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  input: {
    flex: 1,
    height: 48,
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginRight: 12,
  },
  addIconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    color: '#94a3b8',
    fontSize: 16,
  },
});
