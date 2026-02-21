import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ChevronRight, Calendar, Edit2, Trash2 } from 'lucide-react-native';

export default function TodoListCard({ list, onPress, onEdit, onDelete }) {
  const date = new Date(list.created_at).toLocaleDateString();

  return (
    <View style={styles.card}>
      <TouchableOpacity 
        style={styles.content} 
        onPress={onPress} 
        activeOpacity={0.7}
      >
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1}>{list.title}</Text>
          {list.description ? (
            <Text style={styles.description} numberOfLines={2}>{list.description}</Text>
          ) : null}
          <View style={styles.footer}>
            <Calendar size={12} color="#94a3b8" />
            <Text style={styles.date}>{date}</Text>
          </View>
        </View>
        <ChevronRight size={20} color="#cbd5e1" />
      </TouchableOpacity>

      <View style={styles.actionRow}>
        <TouchableOpacity onPress={onEdit} style={styles.actionButton}>
          <Edit2 size={18} color="#64748b" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} style={styles.actionButton}>
          <Trash2 size={18} color="#ef4444" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f8fafc',
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  date: {
    fontSize: 12,
    color: '#94a3b8',
    marginLeft: 4,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: '#f8fafc',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
});
