import styles from "./home.module.css"
import Navbar from "../../components/navbar/navbar"
import Footer from "@/components/footer/footer"
import { cookies } from "next/headers";

const HomeLayout = async ({ children }) => {


  return (
    <div className={styles.home}>
      <Navbar />
      <div className={styles.main}>{children}</div>
      <Footer />
    </div>
  );
};

export default HomeLayout;
