# Onboarding Flow Specification

## Status Legend
🟢 READY - Component implemented and tested
🟡 IN PROGRESS - Currently being implemented
⚪ NOT STARTED - Planned but not yet started

## Overview
The onboarding flow is designed to collect essential user information while maintaining engagement through a conversational and visually appealing interface. Each screen is focused on a single input, making the process easy to follow and complete.

## Flow Sequence

### 1. Gender Selection [🟡 IN PROGRESS]
- **Screen Title**: "Choose your Gender"
- **Options**: 
  - Male
  - Female
  - Other
- **UI Elements**: Large button-style options
- **Navigation**: "Next" button (disabled until selection made)
- **Database**: Store in user_profile.gender
- **Analytics**: track_gender_selected

### 2. Workout Frequency [⚪ NOT STARTED]
- **Screen Title**: "How many workouts do you do per week?"
- **Input Type**: Numeric selection (0-7)
- **UI Elements**: 
  - Circular selectable options
  - Visual indicators for each option
- **Navigation**: "Next" button
- **Database**: Store in user_profile.workout_frequency
- **Analytics**: track_workout_frequency_set

### 3. Discovery Source [⚪ NOT STARTED]
- **Screen Title**: "Where did you hear about us?"
- **Options**:
  - Instagram
  - Facebook
  - TikTok
  - YouTube
  - Google
  - TV
- **UI Elements**: List of social media platforms with icons
- **Navigation**: "Next" button
- **Database**: Store in user_profile.discovery_source
- **Analytics**: track_discovery_source_selected

### 4. Previous Experience [⚪ NOT STARTED]
- **Screen Title**: "Have you tried other calorie tracking apps?"
- **Input Type**: Yes/No selection
- **UI Elements**: Large toggle or button selection
- **Navigation**: "Next" button
- **Database**: Store in user_profile.has_tracking_experience
- **Analytics**: track_previous_experience_indicated

### 5. AI Feature Introduction [⚪ NOT STARTED]
- **Screen Title**: "Cal AI creates long-term results"
- **Content**: Graph visualization showing progress potential
- **Key Message**: Focus on sustainable results
- **Navigation**: "Next" button
- **Analytics**: track_ai_intro_viewed

### 6. Height & Weight Input [⚪ NOT STARTED]
- **Screen Title**: "Height & weight"
- **Input Fields**:
  - Height (cm)
  - Weight (kg)
- **UI Elements**:
  - Numeric input fields
  - Metric/Imperial toggle
- **Navigation**: "Next" button
- **Database**: Store in user_profile.height and user_profile.weight
- **Analytics**: track_measurements_entered

### 7. Birth Date Selection [⚪ NOT STARTED]
- **Screen Title**: "When were you born?"
- **Input Type**: Date picker
- **Format**: Month/Day/Year
- **UI Elements**: Native date picker
- **Navigation**: "Next" button
- **Database**: Store in user_profile.birth_date
- **Analytics**: track_birth_date_entered

### 8. Goal Setting [⚪ NOT STARTED]
- **Screen Title**: "What is your goal?"
- **Options**:
  - Lose weight
  - Maintain
  - Gain weight
- **UI Elements**: Large button-style options
- **Navigation**: "Next" button
- **Database**: Store in user_profile.goal_type
- **Analytics**: track_goal_type_selected

### 9. Target Weight [⚪ NOT STARTED]
- **Screen Title**: "What is your desired weight?"
- **Input Type**: Slider with numeric display
- **UI Elements**:
  - Weight slider
  - Current value display (82 kg)
- **Navigation**: "Next" button
- **Database**: Store in user_profile.target_weight
- **Analytics**: track_target_weight_set

### 10. Goal Timeline [⚪ NOT STARTED]
- **Screen Title**: "How fast do you want to reach your goal?"
- **Options**: Visual speed options with icons
- **UI Elements**: 
  - Speed indicators (turtle, rabbit, cheetah)
  - Recommended option highlight
- **Navigation**: "Next" button
- **Database**: Store in user_profile.goal_timeline
- **Analytics**: track_goal_timeline_selected

### 11. AI Weight Loss Projection [⚪ NOT STARTED]
- **Screen Title**: "Lose twice as much with Cal AI vs on your own"
- **Content**: Comparison visualization
- **UI Elements**: Side-by-side progress comparison
- **Navigation**: "Next" button
- **Analytics**: track_ai_projection_viewed

### 12. Obstacles Assessment [⚪ NOT STARTED]
- **Screen Title**: "What's stopping you from reaching your goals?"
- **Options**:
  - Lack of consistency
  - Unhealthy eating habits
  - Lack of support
  - Busy schedule
  - Lack of meal inspiration
- **UI Elements**: Checklist with icons
- **Navigation**: "Next" button
- **Database**: Store in user_profile.obstacles (array)
- **Analytics**: track_obstacles_identified

### 13. Dietary Preferences [⚪ NOT STARTED]
- **Screen Title**: "Do you follow a specific diet?"
- **Options**:
  - Classic
  - Pescatarian
  - Vegetarian
  - Vegan
- **UI Elements**: List selection with icons
- **Navigation**: "Next" button
- **Database**: Store in user_profile.dietary_preference
- **Analytics**: track_dietary_preference_selected

### 14. Goal Motivation [⚪ NOT STARTED]
- **Screen Title**: "What would you like to accomplish?"
- **Options**: Multiple choice motivation selection
- **UI Elements**: Selectable cards with icons
- **Navigation**: "Next" button
- **Database**: Store in user_profile.motivations (array)
- **Analytics**: track_motivations_selected

### 15. Progress Visualization [⚪ NOT STARTED]
- **Screen Title**: "You have great potential to crush your goal"
- **Content**: Progress graph projection
- **UI Elements**: Interactive graph visualization
- **Navigation**: "Next" button
- **Analytics**: track_progress_visualization_viewed

### 16. App Rating Introduction [⚪ NOT STARTED]
- **Screen Title**: "Give us rating"
- **Content**: Star rating system and user testimonials
- **UI Elements**:
  - 5-star rating system
  - User testimonial cards
- **Navigation**: "Next" button
- **Analytics**: track_rating_prompt_viewed

### 17. Notifications Setup [⚪ NOT STARTED]
- **Screen Title**: "Reach your goals with notifications"
- **Content**: Notification permission request
- **UI Elements**:
  - Allow/Don't Allow buttons
  - Notification preview
- **Navigation**: "Next" button
- **Database**: Store in user_profile.notifications_enabled
- **Analytics**: track_notification_preference_set

### 18. Referral Code [⚪ NOT STARTED]
- **Screen Title**: "Do you have a referral code?"
- **Input Type**: Optional text input
- **UI Elements**: Text input field
- **Navigation**: "Next" button
- **Database**: Store in user_profile.referral_code
- **Analytics**: track_referral_code_entered

### 19-23. Setup Progress [⚪ NOT STARTED]
- **Screen Title**: "We're setting everything up for you"
- **Content**: Loading sequence with progress indicators
- **UI Elements**: Animated loading indicator
- **Navigation**: Automatic progression
- **Analytics**: track_setup_progress_started, track_setup_progress_completed

### 24. Plan Ready [⚪ NOT STARTED]
- **Screen Title**: "Congratulations your custom plan is ready!"
- **Content**: Summary of daily recommendations
- **UI Elements**: 
  - Circular progress indicators
  - Goal metrics
- **Navigation**: "Let's get started" button
- **Analytics**: track_plan_ready_viewed

### 25. Goals Overview [⚪ NOT STARTED]
- **Screen Title**: "How to reach your goals"
- **Content**: List of action items and recommendations
- **UI Elements**: Checklist with icons
- **Navigation**: Final step to main app
- **Analytics**: track_goals_overview_completed

### 26. Trial Offer [⚪ NOT STARTED]
- **Screen Title**: "We want you to try Cal AI for free"
- **Content**: App preview and trial offer
- **UI Elements**:
  - App screenshot
  - Trial signup button
- **Navigation**: "Try for $0.00" button
- **Database**: Store in user_profile.trial_started_at
- **Analytics**: track_trial_offer_viewed, track_trial_started

## Data Collection Summary
- Demographics: Gender, birth date
- Physical metrics: Height, weight, target weight
- Lifestyle: Workout frequency, dietary preferences
- Goals: Weight goals, timeline, motivations
- Obstacles: Personal challenges
- Marketing: Discovery source, referral code

## Technical Implementation Notes
- All inputs should be validated in real-time
- Progress should be saved at each step
- Support back navigation without data loss
- Implement analytics tracking for drop-off analysis
- Support offline completion with data sync
