import styles from './details-loading.module.css';

export default function DetailsLoading() {
  return (
    <div className={styles.details}>
      <div className={styles.detailsHeader}>
        <div className={`${styles.ComicPic} skeleton-box`}></div>

        <div className={styles.detailsText}>
          <div className="skeleton-text title"></div>
          <div className="skeleton-text"></div>
          <div className="skeleton-text"></div>
          <div className="skeleton-text"></div>
          <div className="skeleton-text"></div>
        </div>
      </div>

      <div className={styles.ComicDescription}>
        <div className={styles.ComicInfo}>
          <i className="fa-solid fa-circle-info"></i>
          <span>Giới thiệu: </span>
        </div>
        <div className="skeleton-text" style={{ height: '60px' }}></div>
      </div>

      <div className={styles.ComicChapter}>
        <i className="fa-solid fa-layer-group"></i>
        <span>Danh sách chương</span>
      </div>

      <div className={styles.ComicChapterList}>
        <ul>
          {Array(6).fill(0).map((_, index) => (
            <li key={index}>
              <div className={styles.ChapterLink}>
                <div className="skeleton-text" style={{ width: '70%' }}></div>
                <div className="skeleton-text" style={{ width: '25%' }}></div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.chatContainer}>
        <div className="skeleton-text" style={{ height: '80px' }}></div>
      </div>
    </div>
  );
}
