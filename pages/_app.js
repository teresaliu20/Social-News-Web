import withRedux from 'next-redux-wrapper';
import { withRouter } from 'next/router';
import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import Layout from 'components/Layout';
import {createPersistStore} from 'store/createPersistStore';
import {PersistGate} from 'redux-persist/integration/react';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    return {
      pageProps: Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {},
    };
  }

  render() {
    const { Component, pageProps, store, router } = this.props;
    return (
      <Container>
        <Provider store={store}>
          <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </PersistGate>
        </Provider>
      </Container>
    );
  }
}

export default withRedux(createPersistStore, { debug: true })(
  MyApp
);
