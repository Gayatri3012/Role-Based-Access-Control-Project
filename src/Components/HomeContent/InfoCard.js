import styles from './HomeContent.module.css'

export default function InfoCard({label, stats}) {

    return <article className={styles.InfoCard}> 
        <p className={styles.cardLabel}>{label}</p>
        <p className={styles.cardValue}>{stats}</p>
        
    </article>

}