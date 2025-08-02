import ImgSwiper from "@/components/Swiper/Swiper"
import styles from "./monthly.module.css"
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
    const listMonthly = init;
    return (
        <>
            <div className={styles.MonthlyTitle}>
                <i className="fa-solid fa-crown"></i>
                <span className={styles.title}>Top hàng tháng</span>
            </div>
            <div className={styles.panel}>
                <ShowCommicList list={listMonthly} />
            </div>
        </>
        


    )
}