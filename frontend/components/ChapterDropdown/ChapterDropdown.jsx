'use client';

import { useRouter } from 'next/navigation';
import styles from './ChapterDropdown.module.css';

export default function ChapterDropdown({ chapterList, currentChapterId }) {
  const router = useRouter();

  const handleChange = (e) => {
    const selectedChapterId = e.target.value;
    if (selectedChapterId !== currentChapterId.toString()) {
      router.push(`/reading/${selectedChapterId}`);
    }
  };

  return (
    <select
      id="chapterSelect"
      className={styles.chapterSelect}
      onChange={handleChange}
      value={currentChapterId} // 👈 giúp giữ option đang chọn hiển thị đúng
    >
      {chapterList.map((chapter) => (
        <option key={chapter.chapterId} value={chapter.chapterId}>
          {chapter.title}
        </option>
      ))}
    </select>
  );
}
