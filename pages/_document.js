import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
	// Return the render function
	render() {
		// Create the HTML document
		return (
			<Html lang="en">
				<Head></Head>
				<body>
					<Main></Main>
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument;