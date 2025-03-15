import { getStorybookUI } from '@storybook/react-native';
import { configure } from '@storybook/react-native';

// Import your stories
configure(() => {
  // Import your stories here
  require('../components/DesignSystemTest.stories');
  // Add more story imports as needed
}, module);

// Refer to https://github.com/storybookjs/react-native/tree/master/app/react-native for more information about how to use Storybook
const StorybookUIRoot = getStorybookUI({
  asyncStorage: null,
  onDeviceUI: true,
  disableWebsockets: true,
});

export default StorybookUIRoot; 