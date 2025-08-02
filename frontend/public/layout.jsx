// 'use client';

import Head from 'next/head';
import Link from 'next/link';
import styles from './details.module.css';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';
import Chat from '@/components/Chat/Chat';
// import { useState, useEffect } from 'react';

export default function DetailsComic({ children }) {

  return <>
    <div className= {styles.detailsContainer}>
      <Navbar />
      <div className={styles.main}>

        <div className={styles.details}>

          <div className={styles.detailsHeader}>
            <img src="/ComicName.jpg" alt="ComicName" className={styles.ComicPic} />

            <div className={styles.detailsText}>
              {/* /* chỗ này hiển thị tên tuyện */ }
              <h1 className={styles.ComicName}>Tên truyện: {''} </h1>

              {/* chỗ này hiển thị các thông tin của truyện */}
              <div className={styles.ComicAuthor}>
                <i className="fa-solid fa-user"></i>
                <span>Tác giả: {''}</span>
              </div>
                    
              <div className={styles.ComicStatus}>
                <i className="fa fa-rss"></i>
                <span>Trạng thái: {''}</span>
              </div>

              <div className={styles.ComicFavorite}>
                <i className="fa-solid fa-heart"></i>
                <span >Yêu thích: {''}</span>
              </div>

              <div className={styles.ComicViews}>
                <i className="fa-solid fa-eye"></i>
                <span>Lượt xem: {''}</span>
              </div>
                    
            </div>

                
          </div>

            {/* chỗ này hiển thị giới thiệu và danh sách chương của truyện */}
              <div className={styles.ComicDescription}>
                <div className={styles.ComicInfo}>
                  <i className="fa-solid fa-circle-info"></i>
                  <span>Giới thiệu</span>
                </div>
                <p className={styles.ComicText}>{''}</p>
              </div>
              <div className={styles.ComicChapter}>
                <i className="fa-solid fa-layer-group"></i>
                <span>Danh sách chương</span>
              </div>
              
              {/* chidren trả về danh sách chương của truyện */}
              <div className={styles.ChapterList}>
                {children}
              </div>
              
            <div className={styles.chatContainer}>
              <Chat />
            </div>

        </div>

      </div>

      <footer className={styles.footer}>
        <Footer />
      </footer>

    </div>  

</>;
}