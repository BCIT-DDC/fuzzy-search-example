/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import 'regenerator-runtime/runtime';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }) => {
    return <Component {...pageProps} />;
};

export default MyApp;
