import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { CustomTheme } from '@/lib/theme/types';

type FilterPeriod = 'today' | 'weekly' | 'monthly';

interface FilterTabsProps {
  selected: FilterPeriod;
  onSelect: (period: FilterPeriod) => void;
  todayLabel?: string; // Optional custom label for today (e.g. "Today, 5 Mar")
  style?: object;
}

/**
 * A component for displaying filter tabs for time periods
 */
export const FilterTabs: React.FC<FilterTabsProps> = ({
  selected,
  onSelect,
  todayLabel = 'Today',
  style,
}) => {
  const theme = useTheme<CustomTheme>();
  
  const tabs: { key: FilterPeriod, label: string }[] = [
    { key: 'today', label: todayLabel },
    { key: 'weekly', label: 'Weekly' },
    { key: 'monthly', label: 'Monthly' },
  ];
  
  // Styles for active and inactive tabs
  const getTabStyle = (isActive: boolean) => {
    return [
      styles.tab,
      {
        backgroundColor: isActive ? '#000000' : theme.colors.surface,
      },
    ];
  };
  
  // Styles for text in active and inactive tabs
  const getTextStyle = (isActive: boolean) => {
    return {
      color: isActive ? '#FFFFFF' : '#000000',
      fontWeight: isActive ? '600' : '400',
    };
  };

  return (
    <View style={[styles.container, style]}>
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab.key}
          style={getTabStyle(selected === tab.key)}
          onPress={() => onSelect(tab.key)}
          activeOpacity={0.7}
        >
          <Text style={[styles.tabText, getTextStyle(selected === tab.key)]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 16,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  tabText: {
    fontSize: 14,
  },
}); 