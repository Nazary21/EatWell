import { View, StyleSheet } from 'react-native';
import { Text, Button, useTheme, IconButton } from 'react-native-paper';
import { router } from 'expo-router';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { updateProfile } from '@/store/slices/onboardingSlice';
import { profileService } from '@/services/profile';
import { analytics } from '@/services/analytics';
import { AnalyticsEvent, Gender } from '@/types/profile';
import { StepIndicator } from '@/components/core/atoms/StepIndicator';

export default function GenderScreen() {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { currentStep } = useAppSelector((state) => state.onboarding);
  const userId = useAppSelector((state) => state.auth.session?.user.id);
  const [selectedGender, setSelectedGender] = useState<Gender | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBack = () => {
    // Track back navigation in analytics
    analytics.track(AnalyticsEvent.OnboardingAbandoned, {
      step_number: currentStep,
      step_name: 'gender',
    });
    
    // Navigate back to sign-in
    router.replace('/(auth)/sign-in');
  };

  const handleGenderSelect = async (gender: Gender) => {
    setSelectedGender(gender);
    
    // Track selection in analytics
    analytics.track(AnalyticsEvent.GenderSelected, {
      gender,
      step_number: currentStep,
      step_name: 'gender',
    });
  };

  const handleNext = async () => {
    if (!selectedGender || !userId || isSubmitting) return;

    setIsSubmitting(true);
    try {
      // Save to Supabase
      await profileService.saveOnboardingProgress(userId, currentStep, {
        gender: selectedGender,
      });

      // Update Redux state
      dispatch(updateProfile({ gender: selectedGender }));

      // Navigate to next screen
      router.push('/onboarding/workout-frequency');
    } catch (error) {
      console.error('Error saving gender:', error);
      // TODO: Show error toast
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <View style={styles.backButton}>
          <IconButton
            icon="arrow-left"
            size={24}
            onPress={handleBack}
            style={{ margin: 0 }}
          />
        </View>
        <StepIndicator
          current={currentStep}
          total={26}
          size="small"
          active
        />
        <Text
          variant="displaySmall"
          style={[styles.title, { color: theme.colors.primary }]}
        >
          Choose your Gender
        </Text>
      </View>

      <View style={styles.options}>
        <Button
          mode={selectedGender === 'male' ? 'contained' : 'outlined'}
          onPress={() => handleGenderSelect('male')}
          style={styles.option}
          contentStyle={styles.optionContent}
        >
          Male
        </Button>

        <Button
          mode={selectedGender === 'female' ? 'contained' : 'outlined'}
          onPress={() => handleGenderSelect('female')}
          style={styles.option}
          contentStyle={styles.optionContent}
        >
          Female
        </Button>

        <Button
          mode={selectedGender === 'other' ? 'contained' : 'outlined'}
          onPress={() => handleGenderSelect('other')}
          style={styles.option}
          contentStyle={styles.optionContent}
        >
          Other
        </Button>
      </View>

      <Button
        mode="contained"
        onPress={handleNext}
        disabled={!selectedGender || isSubmitting}
        loading={isSubmitting}
        style={styles.nextButton}
      >
        Next
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    position: 'relative',
    width: '100%',
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1,
  },
  title: {
    marginTop: 16,
    textAlign: 'center',
  },
  options: {
    gap: 16,
    marginTop: 32,
  },
  option: {
    borderRadius: 12,
  },
  optionContent: {
    height: 56,
  },
  nextButton: {
    marginTop: 'auto',
    borderRadius: 12,
  },
}); 