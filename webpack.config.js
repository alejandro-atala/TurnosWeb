import { resolve as _resolve } from 'path';

export const output = {
    filename: 'bundle.js', // or any desired output file name
    path: _resolve(__dirname, 'dist'), // specify the output directory
};
export const resolve = {
    fallback: {
        "net": require.resolve("net"),
        "tls": require.resolve("tls"),
        "assert": require.resolve("assert"),
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        "os": require.resolve("os-browserify/browser"),
        "https": require.resolve("https-browserify"),
        "querystring": require.resolve("querystring-es3")
    }
};
