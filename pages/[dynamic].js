import { useRouter } from 'next/router'
import Head from 'next/head'

const DynamicRoute = () => {
	const router = useRouter()

	return (
		<>
			<Head>
				<title>{router.query.dynamic}</title>
			</Head>
			<h1>Page: <em>{router.query.dynamic}</em></h1>
		</>
	)
}

export default DynamicRoute;