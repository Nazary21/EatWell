import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Switch, Button, useTheme, Divider } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { saveUserProfile, clearUserProfile } from '@/features/user/slice';
import { useState, useCallback, useEffect } from 'react';
import { UserProfile, UserPreferences } from '@/features/user/types';
import { DesignSystemTest } from '@/components/DesignSystemTest';

export default function SettingsScreen() {
  return <DesignSystemTest />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  divider: {
    marginVertical: 8,
  },
  buttonContainer: {
    marginTop: 16,
    gap: 8,
  },
  button: {
    marginVertical: 4,
  },
  jsonContainer: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
  },
  jsonLine: {
    fontSize: 12,
    lineHeight: 20,
    letterSpacing: -0.5,
  },
}); 