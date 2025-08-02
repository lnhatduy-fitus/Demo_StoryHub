import ComicCard from "./comic-card";
import styles from './comic-list.module.css';
import ErrorDisplay from "../noti/gen-err";

const ComicList = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comic/recent`, {
      method: 'GET',
      credentials: 'include',
      cache: 'default',
    });

    if (!res.ok) {
      return (
        <ErrorDisplay
          title="Server Error"
          subtitle="We couldn't connect to the server"
          message="The server may not be running or responded incorrectly."
        />
      );
    }

    const comics = await res.json();

    return (
      <div className={styles.panel}>
        {comics.map((item) => (
          <div key={item.comicid}>
            <ComicCard infor={item} />
          </div>
        ))}
      </div>
    );

  } catch (err) {
    return (
      <ErrorDisplay
        title="Server Error"
        subtitle={err.message}
        message="The server may not be running or responded incorrectly."
      />
    );
  }
};

export default ComicList;
