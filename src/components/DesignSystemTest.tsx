import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Button, Surface, useTheme } from 'react-native-paper';
import { CustomTheme } from '@/lib/theme/types';

export const DesignSystemTest = () => {
  const theme = useTheme<CustomTheme>();

  const TextSample = () => (
    <View style={styles.section}>
      <Text variant="displayLarge">Display Large</Text>
      <Text variant="displayMedium">Display Medium</Text>
      <Text variant="displaySmall">Display Small</Text>
      <Text variant="headlineLarge">Headline Large</Text>
      <Text variant="headlineMedium">Headline Medium</Text>
      <Text variant="headlineSmall">Headline Small</Text>
      <Text variant="titleLarge">Title Large</Text>
      <Text variant="titleMedium">Title Medium</Text>
      <Text variant="titleSmall">Title Small</Text>
      <Text variant="bodyLarge">Body Large</Text>
      <Text variant="bodyMedium">Body Medium</Text>
      <Text variant="bodySmall">Body Small</Text>
      <Text variant="labelLarge">Label Large</Text>
      <Text variant="labelMedium">Label Medium</Text>
      <Text variant="labelSmall">Label Small</Text>
    </View>
  );

  const ColorScales = () => (
    <View style={styles.section}>
      <Text variant="titleMedium">Color Scales</Text>
      <View style={styles.row}>
        <Surface style={[styles.colorBox, { backgroundColor: theme.colors.primary }]}>
          <Text style={styles.colorText}>Primary</Text>
        </Surface>
        <Surface style={[styles.colorBox, { backgroundColor: theme.colors.secondary }]}>
          <Text style={styles.colorText}>Secondary</Text>
        </Surface>
        <Surface style={[styles.colorBox, { backgroundColor: theme.colors.error }]}>
          <Text style={styles.colorText}>Error</Text>
        </Surface>
      </View>
    </View>
  );

  const SpacingSample = () => (
    <View style={styles.section}>
      <Text variant="titleMedium">Spacing Scale</Text>
      <View style={styles.row}>
        {Object.entries(theme.custom.spacing).map(([key, value]) => (
          <View key={key} style={[styles.spacingBox, { width: value, height: value }]}>
            <Text style={styles.spacingText}>{key}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const RadiusSample = () => (
    <View style={styles.section}>
      <Text variant="titleMedium">Border Radius</Text>
      <View style={styles.row}>
        {Object.entries(theme.custom.radius).map(([key, value]) => (
          <View
            key={key}
            style={[
              styles.radiusBox,
              {
                borderRadius: value,
              },
            ]}
          >
            <Text style={styles.radiusText}>{key}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const ElevationSample = () => (
    <View style={styles.section}>
      <Text variant="titleMedium">Elevation Levels</Text>
      <View style={styles.row}>
        {Object.entries(theme.custom.elevation).map(([key, value]) => (
          <Surface
            key={key}
            style={[
              styles.elevationBox,
              {
                shadowColor: value.shadowColor,
                shadowOffset: value.shadowOffset,
                shadowOpacity: value.shadowOpacity,
                shadowRadius: value.shadowRadius,
                elevation: value.elevation,
              },
            ]}
          >
            <Text>{key}</Text>
          </Surface>
        ))}
      </View>
    </View>
  );

  const ButtonSample = () => (
    <View style={styles.section}>
      <Text variant="titleMedium">Button Variants</Text>
      <View style={styles.buttonRow}>
        <Button mode="contained">Contained</Button>
        <Button mode="outlined">Outlined</Button>
        <Button mode="text">Text</Button>
        <Button mode="contained-tonal">Tonal</Button>
        <Button mode="elevated">Elevated</Button>
      </View>
    </View>
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      <Text variant="headlineMedium" style={styles.title}>
        Design System Test
      </Text>
      <TextSample />
      <ColorScales />
      <SpacingSample />
      <RadiusSample />
      <ElevationSample />
      <ButtonSample />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  title: {
    marginBottom: 24,
  },
  section: {
    marginBottom: 32,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  colorBox: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  colorText: {
    color: 'white',
  },
  spacingBox: {
    backgroundColor: '#E1E1E1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spacingText: {
    fontSize: 12,
  },
  radiusBox: {
    width: 100,
    height: 100,
    backgroundColor: '#E1E1E1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radiusText: {
    fontSize: 12,
  },
  elevationBox: {
    width: 100,
    height: 100,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
}); 