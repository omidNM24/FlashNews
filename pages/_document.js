import Document, { Html, Head, Main, NextScript } from "next/document";

export default class CustomDocument extends Document {
  render() {
    return (
      <Html lang="fa" dir="rtl">
        <Head />

        <body
          style={{
            margin: "0",
            padding: "0",
            boxSizing: "border-box",
            width: "100%",
          }}
        >
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
