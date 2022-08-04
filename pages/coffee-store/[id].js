import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import coffeeStoresData from '../../data/coffee-stores.json'


export async function getStaticProps(staticProps) {
	const params = staticProps.params;
	console.log('params', params);
	return {
		props: {
			coffeeStore: coffeeStoresData.find((coffeeStore) =>  { 
				return coffeeStore.id.toString() === params.id
			}),
		},
	}
}

export function getStaticPaths() {
	const paths = coffeeStoresData.map((coffeeStore) => {
		return {
			params: {
				id: coffeeStore.id.toString(),
			},
		}
	})
	return {
		paths,
		fallback: true,
	}
}

const CoffeeStore = (props) => {
	const router = useRouter()
	console.log('router', router)
	console.log('props', props)

	if (router.isFallback) {
		return <div>Loading...</div>
	}

	const { address, name, neighbourhood } = props.coffeeStore

	return (
		<>
			<Head>
				<title>{name}</title>
			</Head>
			<Link href="/">
				<a>Back to home</a>
			</Link>
			<p>{address}</p>
			<p>{name}</p>
			<p>{neighbourhood}</p>
		</>
	)
}

export default CoffeeStore;