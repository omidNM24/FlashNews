import Document, { Html, Head, Main, NextScript } from "next/document";

export default class CustomDocument extends Document {
  render() {
    return (
      <Html lang="fa" dir="rtl">
        <Head />

        <body className="">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
