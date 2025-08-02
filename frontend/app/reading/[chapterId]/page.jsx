import styles from './reading.module.css';
import Link from 'next/link';
import ReadingErr from '@/components/noti/reading-err';

export default async function ReadingPage({ params, searchParams }) {

  const { chapterId } = await params;
  const comicId = (await searchParams)?.comicId;


  let imgs = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chapter/images?comicId=${comicId}&chapterId=${chapterId}`, {
      method: 'GET',
      credentials: 'include',
      cache: 'default'
    });


    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        imgs = data.map(item => ({
          url: item.image_url,
          number: item.page_number
        }));
      }
    } else {
      return <ReadingErr mess={'Unable to connect to Backend'}/>;
    }
  } catch (err) {
    return <ReadingErr mess={{ message: err?.message + ' Server not responding' }} />
  }

  

  return (
    <>

      <div className={styles.readingContainer}>
        {imgs.map((url, index) => (
          <img
            key={index}
            className={styles.readingImage}
            src={url.url}
            alt={`Trang ${index + 1}`}
          />
        ))}
      </div>
      <footer className={styles.footer}>
        <Link href="/home" className={styles.homeButton}>
          <i className="fa-solid fa-house" ></i>
        </Link>
        <div className={styles.tools}>
          <button className={styles.nav_btn}>
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button className={styles.nav_btn}>
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
        <button className={styles.favorite}>
          <i className="fa-solid fa-heart"></i>
          <span>Yêu thích</span>
        </button>
      </footer>

    </>
  );
}
