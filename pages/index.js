import Head from 'next/head'
import Image from 'next/image'
import Banner from '../components/banner'
import Card from '../components/card'
import styles from '../styles/Home.module.css'

export async function getStaticProps(context) {
	console.log('hi getStaticProps', getStaticProps);
	
	const options = {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			Authorization: process.env.FOURSQUARE_API_KEY,
		}
	};

	const response = await fetch(
		'https://api.foursquare.com/v3/places/search?query=coffee&ll=45.931574%2C6.766988&limit=6', 
		options
	);

	const data = await response.json();
	console.log(data.results);
	// .catch(err => console.error(err));

	return {		
		props: {
			coffeeStores: data.results, 
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
				{props.coffeeStores.length > 0 && (
					<>
						<h2 className={styles.heading2}>Toronto stores</h2>
						<div className={styles.cardLayout}>
							{props.coffeeStores.map((coffeeStore) => {
								return (
									<Card
									key={coffeeStore.fsq_id}	
									name={coffeeStore.name}
										imgUrl={coffeeStore.imgUrl || "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" }
										href={`/coffee-store/${coffeeStore.fsq_id}`}
										className={styles.card}
										
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
