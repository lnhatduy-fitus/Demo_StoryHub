'use client';
import styles from './comic-card.module.css';
import Link from 'next/link';
import React from 'react';

const ComicCard = ({ infor }) => {

    return (
        <div className={styles.commic}>
            <Link href={`/details/${infor.comicid}`}>
                <img className={styles.cover} src={infor.cover_image} alt={infor.comic_title} />
            </Link>
            <Link href={`/details/${infor.comicid}`} className={styles.title}>
                {infor.comic_title}
            </Link>
            <p className={styles.detail}>Số chương: {infor.chapter_count}</p>
        </div>
    )
}

export default React.memo(ComicCard);
