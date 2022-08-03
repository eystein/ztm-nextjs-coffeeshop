import { useRouter } from 'next/router'

const CoffeeStore = () => {
	const router = useRouter()
	console.log('router', router)
	return <div>Coffee store page {router.query.id}</div>
}

export default CoffeeStore;