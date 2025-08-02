import styles from "./filter.module.css"
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import FilterBar from "./filter-bar";

const FilterLayout = async ({ children }) => {
  return (
    <div className={styles.filter}>
      <Navbar />
      <div className={styles.filterBar}>
        <FilterBar />
      </div>
        <div className={styles.main}>{children}</div>
      <Footer />
      
    </div>

  );
};

export default FilterLayout;
