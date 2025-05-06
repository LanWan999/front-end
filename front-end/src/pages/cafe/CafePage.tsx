import { useEffect, useState } from "react"
import { Dessert } from "../../types/dessert"
import api from "../../api"
import { Drink } from "../../types/drink"
import { OpeningHour } from "../../types/OpeningHour"
import styles from "./CafePage.module.scss"

const CafePage = () => {
    const [desserts, setDesserts] = useState<Dessert[]>([])
    const [drinks, setDrinks] = useState<Drink[]>([])
    const [openingHours, setOpeningHours] = useState<OpeningHour[]>([])

    const [view, setView] = useState<"menu" | "opening-hours">("menu")

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const fetchDesserts = async () => {
            try {
                const { data } = await api.get(`/desserts`)
                const resDrinks = await api.get(`/drinks`)
                const resOpeningHours = await api.get(`/opening-hours`)
                console.log("Opening hours fetched:", resOpeningHours.data)

                setDesserts(data)
                setDrinks(resDrinks.data)
                setOpeningHours(resOpeningHours.data)
            } catch (error: unknown) {
                setError(error instanceof Error ? error : new Error("Unknown error"))
            } finally {
                setLoading(false)
            }
        }

        fetchDesserts()
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }


    return (
        <div className={styles.pageContainer}>
            <div className={styles.sidebar}>
                <button onClick={() => setView("menu")}>Menu</button>
                <button onClick={() => setView("opening-hours")}>Opening Hours</button>
            </div>

            {view === "menu" && (
                <>
                    <div className={styles.foodCard}>
                        <div>
                            <h2>Desserts</h2>
                            <div>
                                {desserts.map(dessert => (
                                    <div key={dessert._id} >
                                        <strong>{dessert.name}</strong><br />
                                        <img src={dessert.image} alt={dessert.name} width={100} /><br />
                                        {dessert.description}<br />
                                        ${dessert.price.toFixed(2)}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div >
                            <h2>Drinks</h2>
                            <div>
                                {drinks.map(drink => (
                                    <div key={drink._id}>
                                        <strong>{drink.name}</strong><br />
                                        <img src={drink.image} alt={drink.name} width={100} /><br />
                                        {drink.description}<br />
                                        ${drink.price.toFixed(2)}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}

            {view === "opening-hours" && (
                <div>
                    <h2>Opening Hours</h2>
                    <table>
                        <tbody>
                            {openingHours.map(hour => (
                                <tr key={hour._id}>
                                    <td><strong>{hour.day}</strong></td>
                                    <td>{hour.openingTime} – {hour.closingTime}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default CafePage