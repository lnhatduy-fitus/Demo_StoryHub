import styles from './reading.module.css'; 

export default function Loading({ count = 5 }) {
  return (
    <div className={styles.readingContainer}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="skeleton-box" />
      ))}
    </div>
  );
}
