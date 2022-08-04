import Head from 'next/head'
import Image from 'next/image'
import Banner from '../components/banner'
import Card from '../components/card'
import styles from '../styles/Home.module.css'


export default function Home() {
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
				<Card 
					name="DarkHourse Coffee"  
					imgUrl="/static/hero-image.png"
					href="/coffee-store/darkhorse-coffee"
					/>
			</main>

			
		</div>
	)
}
