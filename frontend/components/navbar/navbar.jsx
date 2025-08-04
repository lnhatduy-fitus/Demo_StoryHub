import styles from "./navbar.module.css"
import Link from "next/link";
import { cookies } from "next/headers";

import AuthButtons from "./auth-button";
import MenuList from "./menu-list";
import User from "./user-tools";

const menuItems = [
  {
    title: "Thể loại",
    content: [
      { title: "Action", href: "/genre/action" },
      { title: "Detective", href: "/genre/detective" },
    ],
  },
  {
    title: "Xếp hạng",
    content: [
      { title: "Top tuần", href: "/ranking/weekly" },
      { title: "Top tháng", href: "/ranking/monthly" },
    ],
  },
];

const Navbar = async () => {

    const cookie = await cookies();
    const logined = cookie.has('token');

console.log('Has token:', logined); // Sẽ log ở server terminal
    console.log('All cookies:', cookie.getAll())
    
    return (

        <header className={styles.header}>

            <Link href="/home" prefetch={true} className={styles.logoLink}>
                <img className={styles.logo} src="/Story_Hub_Black.png" />
            </Link>
            <div className={styles.header_tools}>
                <div className={styles.feature}>
                    <MenuList list={menuItems} />
                </div>
                <Link href="/upload" className={styles.feature}>Đăng truyện</Link>
                <div className={styles.feature}>
                    <AuthButtons isLoggedIn={logined}/>
                </div>
                <div>
                  <User />
                </div>
            </div>

        </header>

    )


}

export default Navbar;
