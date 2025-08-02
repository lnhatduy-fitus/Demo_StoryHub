import styles from "./weekly.module.css"
import ShowCommicList from "@/components/CommicList/CommicList";

const init = [
    { title: "Demo"},
    { title: "Demo"},
    { title: "Demo"},
    { title: "Demo"},
    { title: "Demo"},
    { title: "Demo"},
]

export default function Home(){
    const listWeekly = init
    return (
        <>
            <div className={styles.WeeklyTitle}>
                <i className="fa-solid fa-crown"></i>
                <span className={styles.title}>Top hàng tuần</span>
            </div>
            <div className={styles.panel}>
                <ShowCommicList list={listWeekly} />
            </div>
        </>
        


    )
}