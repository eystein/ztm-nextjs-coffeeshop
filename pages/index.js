import Head from 'next/head'
import Image from 'next/image'
import Banner from '../components/banner'
import Card from '../components/card'
import styles from '../styles/Home.module.css'
import coffeeStores from '../data/coffee-stores.json'

export async function getStaticProps(context) {
	console.log('hi getStaticProps');
	return {
		props: {
			coffeeStores, // key: value; -> coffeeStores: coffeeStores; -> coffeeStores
		}, // will be passed to the page component as props
	}
}


export default function Home(props) {
	const handleOnBannerBtnClick = () => {
		console.log('Button clicked')
	}

	return (
		<div className={styles.container}>
			<Head>
				<title>Coffee Connoisseur</title>
				<meta name="description" content="A next.js test app for Eystein" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<Banner buttonText="View stores nearby" handleOnClick={handleOnBannerBtnClick} />
				<div className={styles.heroImage}>
					<Image src="/static/hero-image.png" alt="Illustration of woman sitting on a cloud and drinking coffee." width={700} height={400} />
				</div>
				{coffeeStores.length > 0 && (
					<>
						<h2 className={styles.heading2}>Toronto stores</h2>
						<div className={styles.cardLayout}>
							{props.coffeeStores.map((coffeeStore) => {
								return (
									<Card
										name={coffeeStore.name}
										imgUrl={coffeeStore.imgUrl}
										href={`/coffee-store/${coffeeStore.id}`}
										className={styles.card}
										key={coffeeStore.id}
									/>
								)
							})}
						</div>
					</>
				)}									
			</main>

			
		</div>
	)
}
