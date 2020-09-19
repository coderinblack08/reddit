import { useColorMode, Switch, Flex, Icon, Box } from '@chakra-ui/core';

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  return (
    <Box>
      <Flex alignItems="center" justify="center">
        {isDark ? (
          <Icon name="sun" mr={2} />
        ) : (
          <Icon name="moon" mr={2} color="yellow.400" />
        )}
        <Switch
          color="yellow"
          isChecked={isDark}
          onChange={() => {
            document.cookie = `isDarkMode=${colorMode === 'light'}`;
            toggleColorMode();
          }}
        />
      </Flex>
    </Box>
  );
};
