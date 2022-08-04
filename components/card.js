import Link from 'next/link'
import Image from 'next/image'
import styles from './card.module.css'

const Card = (props) => {
	return (
		<Link href={props.href}>
			<a className={styles.cardLink}>
				<div className={styles.container}>
					<div className={styles.cardHeaderWrapper}>
						<h2 className={styles.cardHeader}>{props.name}</h2>
					</div>
					<div className={styles.cardImageWrapper}>
						<Image 
							className={styles.cardImage}
							src={props.imgUrl} 
							alt={props.imgAlt} 
							width={250} 
							height={150} 
						/>
					</div>
				</div>
			</a>
		</Link>
	)
}

export default Card;
