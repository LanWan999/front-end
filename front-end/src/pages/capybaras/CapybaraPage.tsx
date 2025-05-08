import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { Capybara } from "../../types/capybara"
import api from "../../api"
import styles from "./CapybaraPage.module.scss"


function CapybaraPage() {
    const { id } = useParams()

    const [capybara, setCapybara] = useState<Capybara | null>(null)


    useEffect(() => {
        const fetchCapybara = async () => {
            const { data } = await api.get(`/capybaras/${id}`)
            setCapybara(data)
        }
        fetchCapybara()
    }, [id])


    if (!capybara) {
        return <p>Loading...</p>
    }

    return (
        <div className={styles.pageContainer}>
          <div className={styles.card}>
            <img src={capybara.image} alt={capybara.name} className={styles.image} />
            <h2 className={styles.name}>{capybara.name}</h2>
            <p className={styles.personality}><strong>Personality:</strong> {capybara.personality}</p>
            <p className={styles.snack}><strong>Favorite snack:</strong> {capybara.favoriteSnack}</p>
            <p className={styles.description}>{capybara.description}</p>
          </div>
        </div>
    );
}
export default CapybaraPage