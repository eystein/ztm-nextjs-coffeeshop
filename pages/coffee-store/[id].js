import { useRouter } from 'next/router'
import Link from 'next/link'

const CoffeeStore = () => {
	const router = useRouter()
	console.log('router', router)
	return (
		<>
			<Link href="/">
				<a>Back to home</a>
			</Link>
			<div>Coffee store page {router.query.id}</div>
		</>
	)
}

export default CoffeeStore;