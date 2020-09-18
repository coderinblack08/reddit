import { useColorMode, Switch } from '@chakra-ui/core';

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  return (
    <Switch
      position="fixed"
      top="1rem"
      right="1rem"
      color="yellow"
      isChecked={isDark}
      onChange={() => {
        document.cookie = `isDarkMode=${colorMode === 'light'}`;
        toggleColorMode();
      }}
    />
  );
};
