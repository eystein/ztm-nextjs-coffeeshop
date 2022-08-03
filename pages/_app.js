import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
		<>
			<Component {...pageProps} />
			<footer>
				<h2>I am the footer.</h2>
			</footer>
		</>
	)
}

export default MyApp
