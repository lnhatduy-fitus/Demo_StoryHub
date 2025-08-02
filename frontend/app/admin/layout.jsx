import Sidebar from "@/components/Sidebar/Sidebar";
import NavbarAdmin from "@/components/NavbarAdmin/NavbarAdmin";
import styles from './admin.module.css';

export default function AdminLayout({ children }) {
    return (
        <div className={styles.layout}>
            <Sidebar />
            <div className={styles.main}>
                <NavbarAdmin />
                {children}
            </div>
        </div>
    );
}