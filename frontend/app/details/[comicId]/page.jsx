'use client';
import Link from 'next/link';
import styles from './details.module.css';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import DetailsLoading from '@/components/noti/details-loading';

export default function Details() {
  const { comicId } = useParams();

  const [details, setDetails] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [isErr, setErr] = useState(false);

  useEffect(() => {
    const getDetails = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comic/details?comicId=${comicId}`,
          {
            method: 'GET',
            credentials: 'include',
            cache: 'default',
          }
        );

        if (!res.ok) {
          setErr(true);
          setLoading(false);
          return;
        }

        const detail = await res.json();
        setDetails(detail);
        setLoading(false);
      } catch (err) {
        setErr(true);
        setLoading(false);
      }
    };

    getDetails();
  }, [comicId]);

  if (isLoading) return <DetailsLoading />;
  if (isErr || !details) return <div className={styles.error}>Lỗi tải dữ liệu truyện.</div>;

  const {
    title,
    author,
    status,
    likeCount,
    viewCount,
    description,
    chapters = [],
  } = details;

  return (
    <div className={styles.details}>
      <div className={styles.detailsHeader}>
        {/* Bạn cần truyền đúng ảnh truyện nếu có. Đây là placeholder */}
        <img src="/Story_Hub_Black.png" alt={title} className={styles.ComicPic} />

        <div className={styles.detailsText}>
          <h1 className={styles.ComicName}>Tên truyện: {title}</h1>

          <div className={styles.ComicAuthor}>
            <i className="fa-solid fa-user"></i>
            <span>Tác giả: {author}</span>
          </div>

          <div className={styles.ComicStatus}>
            <i className="fa fa-rss"></i>
            <span>Trạng thái: {status}</span>
          </div>

          <div className={styles.ComicFavorite}>
            <i className="fa-solid fa-heart"></i>
            <span>Yêu thích: {likeCount}</span>
          </div>

          <div className={styles.ComicViews}>
            <i className="fa-solid fa-eye"></i>
            <span>Lượt xem: {viewCount}</span>
          </div>
        </div>
      </div>

      <div className={styles.ComicDescription}>
        <div className={styles.ComicInfo}>
          <i className="fa-solid fa-circle-info"></i>
          <span>Giới thiệu: </span>
        </div>
        <p className={styles.ComicText}>{description}</p>
      </div>

      <div className={styles.ComicChapter}>
        <i className="fa-solid fa-layer-group"></i>
        <span>Danh sách chương</span>
      </div>

      <div className={styles.ComicChapterList}>
        <ul>
          {chapters.map((chapter) => (
            <li key={chapter.chapterId}>
              <Link
                href={`/reading/${chapter.chapterId}?comicId=${comicId}`}
                className={styles.ChapterLink}
              >
                <span className={styles.ChapterTitle}>{chapter.title}</span>
                <span className={styles.ChapterDate}>
                  Ngày đăng:{' '}
                  {chapter.uploadDate
                    ? new Date(chapter.uploadDate).toLocaleDateString('vi-VN')
                    : ''}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.chatContainer}>
        {/* Chat component nếu cần */}
      </div>
    </div>
  );
}
