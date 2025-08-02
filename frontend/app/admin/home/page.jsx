import styles from './home.module.css';
import CardAgents from "@/components/admin/CardAgent/CardAgents";
import { CardBalance } from "@/components/admin/CardBalance/CardBalance";
import { CardChart } from "@/components/admin/CardChart/CardChart";

const series = [
  {
    name: 'Revenue',
    data: [300, 400, 500, 600, 750, 850, 900],
  },
  {
    name: 'Cost',
    data: [200, 300, 350, 400, 500, 600, 650],
  },
];

export default function Home() {

    return (
        <div className={styles.main_body}>
            <div className={styles.main_content}>
                <div className={styles.card_balance}>
                    <div className={styles.card_balance_item}>
                        <CardBalance title="Views" />
                    </div>
                    <div className={styles.card_balance_item}>
                        <CardBalance title="Visit" />
                    </div>
                    <div className={styles.card_balance_item}>
                        <CardBalance title="New Users" />
                    </div>
                    <div className={styles.card_balance_item}>
                        <CardBalance title="Active Users" />
                    </div>
                </div>
                <div className={styles.chart}>
                    <CardChart series={series} />
                </div>
            </div>
            <div className={styles.right_side}>
                <div className={styles.section_block}>
                    <span className={styles.card_title}>Authors</span>
                    <CardAgents />
                </div>
            </div>
        </div>
    )

}