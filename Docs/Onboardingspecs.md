# Onboarding Flow Specification

## Overview
The onboarding flow is designed to collect essential user information while maintaining engagement through a conversational and visually appealing interface. Each screen is focused on a single input, making the process easy to follow and complete.

## Flow Sequence

### 1. Gender Selection
- **Screen Title**: "Choose your Gender"
- **Options**: 
  - Male
  - Female
  - Other
- **UI Elements**: Large button-style options
- **Navigation**: "Next" button (disabled until selection made)

### 2. Workout Frequency
- **Screen Title**: "How many workouts do you do per week?"
- **Input Type**: Numeric selection (0-7)
- **UI Elements**: 
  - Circular selectable options
  - Visual indicators for each option
- **Navigation**: "Next" button

### 3. Discovery Source
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

### 4. Previous Experience
- **Screen Title**: "Have you tried other calorie tracking apps?"
- **Input Type**: Yes/No selection
- **UI Elements**: Large toggle or button selection
- **Navigation**: "Next" button

### 5. AI Feature Introduction
- **Screen Title**: "Cal AI creates long-term results"
- **Content**: Graph visualization showing progress potential
- **Key Message**: Focus on sustainable results
- **Navigation**: "Next" button

### 6. Height & Weight Input
- **Screen Title**: "Height & weight"
- **Input Fields**:
  - Height (cm)
  - Weight (kg)
- **UI Elements**:
  - Numeric input fields
  - Metric/Imperial toggle
- **Navigation**: "Next" button

### 7. Birth Date Selection
- **Screen Title**: "When were you born?"
- **Input Type**: Date picker
- **Format**: Month/Day/Year
- **UI Elements**: Native date picker
- **Navigation**: "Next" button

### 8. Goal Setting
- **Screen Title**: "What is your goal?"
- **Options**:
  - Lose weight
  - Maintain
  - Gain weight
- **UI Elements**: Large button-style options
- **Navigation**: "Next" button

### 9. Target Weight
- **Screen Title**: "What is your desired weight?"
- **Input Type**: Slider with numeric display
- **UI Elements**:
  - Weight slider
  - Current value display (82 kg)
- **Navigation**: "Next" button

### 10. Goal Timeline
- **Screen Title**: "How fast do you want to reach your goal?"
- **Options**: Visual speed options with icons
- **UI Elements**: 
  - Speed indicators (turtle, rabbit, cheetah)
  - Recommended option highlight
- **Navigation**: "Next" button

### 11. AI Weight Loss Projection
- **Screen Title**: "Lose twice as much with Cal AI vs on your own"
- **Content**: Comparison visualization
- **UI Elements**: Side-by-side progress comparison
- **Navigation**: "Next" button

### 12. Obstacles Assessment
- **Screen Title**: "What's stopping you from reaching your goals?"
- **Options**:
  - Lack of consistency
  - Unhealthy eating habits
  - Lack of support
  - Busy schedule
  - Lack of meal inspiration
- **UI Elements**: Checklist with icons
- **Navigation**: "Next" button

### 13. Dietary Preferences
- **Screen Title**: "Do you follow a specific diet?"
- **Options**:
  - Classic
  - Pescatarian
  - Vegetarian
  - Vegan
- **UI Elements**: List selection with icons
- **Navigation**: "Next" button

### 14. Goal Motivation
- **Screen Title**: "What would you like to accomplish?"
- **Options**: Multiple choice motivation selection
- **UI Elements**: Selectable cards with icons
- **Navigation**: "Next" button

### 15. Progress Visualization
- **Screen Title**: "You have great potential to crush your goal"
- **Content**: Progress graph projection
- **UI Elements**: Interactive graph visualization
- **Navigation**: "Next" button

### 16. App Rating Introduction
- **Screen Title**: "Give us rating"
- **Content**: Star rating system and user testimonials
- **UI Elements**:
  - 5-star rating system
  - User testimonial cards
- **Navigation**: "Next" button

### 17. Notifications Setup
- **Screen Title**: "Reach your goals with notifications"
- **Content**: Notification permission request
- **UI Elements**:
  - Allow/Don't Allow buttons
  - Notification preview
- **Navigation**: "Next" button

### 18. Referral Code
- **Screen Title**: "Do you have a referral code?"
- **Input Type**: Optional text input
- **UI Elements**: Text input field
- **Navigation**: "Next" button

### 19-23. Setup Progress
- **Screen Title**: "We're setting everything up for you"
- **Content**: Loading sequence with progress indicators
- **UI Elements**: Animated loading indicator
- **Navigation**: Automatic progression

### 24. Plan Ready
- **Screen Title**: "Congratulations your custom plan is ready!"
- **Content**: Summary of daily recommendations
- **UI Elements**: 
  - Circular progress indicators
  - Goal metrics
- **Navigation**: "Let's get started" button

### 25. Goals Overview
- **Screen Title**: "How to reach your goals"
- **Content**: List of action items and recommendations
- **UI Elements**: Checklist with icons
- **Navigation**: Final step to main app

### 26. Trial Offer
- **Screen Title**: "We want you to try Cal AI for free"
- **Content**: App preview and trial offer
- **UI Elements**:
  - App screenshot
  - Trial signup button
- **Navigation**: "Try for $0.00" button

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
