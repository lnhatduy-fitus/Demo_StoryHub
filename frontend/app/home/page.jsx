// 'use client';
import styles from './home.module.css';
import { Suspense } from 'react';
import ComicList from '@/components/comics/comic-list';
import LoadingComicList from '@/components/comics/loading-comic-list';


export default function Home() {

    return (

        <>
           <div className={styles.panel}>
                <p className={styles.panel_title}>Newest</p>
                <Suspense fallback={<LoadingComicList />}>
                    <ComicList />
                </Suspense>
            </div> 
        </>

    )

}