import { useRouter } from 'next/router'
import Link from 'next/link'
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
	return {
		paths: [
			{ params: { id: '0' } }, 
			{ params: { id: '1' } },
			{ params: { id: '300' } }
		],
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

	return (
		<>
			<Link href="/">
				<a>Back to home</a>
			</Link>
			<p>{props.coffeeStore.address}</p>
			<p>{props.coffeeStore.name}</p>
		</>
	)
}

export default CoffeeStore;