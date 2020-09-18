import * as React from 'react';
import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core';
import { Provider, createClient } from 'urql';
import cookies from 'next-cookies';

import theme from '../theme';
import { DarkModeSwitch } from '../components/DarkModeSwitch';

const client = createClient({
  url: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: 'include',
  },
});

const App = ({
  Component,
  pageProps,
  initialColorMode,
}: {
  Component: any;
  pageProps: any;
  initialColorMode: any;
}) => {
  return (
    <Provider value={client}>
      <ThemeProvider theme={theme}>
        <ColorModeProvider value={initialColorMode}>
          <CSSReset />
          <DarkModeSwitch />
          <Component {...pageProps} />
        </ColorModeProvider>
      </ThemeProvider>
    </Provider>
  );
};

App.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  const { isDarkMode = 'false' } = cookies(ctx);
  return {
    pageProps,
    initialColorMode: isDarkMode === 'true' ? 'dark' : 'light',
  };
};

export default App;
