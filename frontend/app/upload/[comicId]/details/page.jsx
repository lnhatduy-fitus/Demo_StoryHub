'use client';
import { useEffect, useState } from "react";
import { use } from "react";
import styles from './details.module.css';

export default function Details({ params }) {

    const { comicId } = use(params);

    const [comic, setComic] = useState([]);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    const getComic = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comic/details?comicId=${comicId}`)

            if (res.ok) {
                const infor = await res.json();
                setComic({
                    title: infor.title,
                    author: infor.author,
                    status: infor.status,
                    likes: infor.likeCount,
                    views: infor.viewCount,
                    description: infor.description,
                    genres: infor.genres || [],
                    chapters: infor.chapters || [],
                    cover: infor.cover || "../../Story_Hub_Black.png",
                });
            }
        } catch (err) { alert(err) }
    }

    useEffect(() => {
        getComic();
    }, []);




    return (
        <>


            {/* Hiển thị thông tin truyện*/}
            <div className={styles.details}>
                {/*Ảnh bìa */}
                <div className={styles.comicHeader}>
                    <img src={comic.cover} alt="Ảnh bìa" className={styles.ComicPic} />

                    {/* Thông tin truyện */}
                    <div className={styles.detailsText}>
                        {/* Tên truyện */}
                        <h2 className={styles.ComicName}> {comic.title} </h2>

                        <div className={styles.ComicAuthor}>
                            <i className="fa-solid fa-user"></i>
                            <strong>Tác giả: </strong> {comic.author}
                        </div>

                        <div className={styles.ComicStatus}>
                            <i className="fa fa-rss"></i>
                            <strong>Trạng thái:</strong> {comic.status}
                        </div>

                        <div className={styles.ComicFavorite}>
                            <i className="fa-solid fa-heart"></i>
                            <strong>Yêu thích:</strong> {comic.likes}
                        </div>

                        <div className={styles.ComicViews}>
                            <i className="fa-solid fa-eye"></i>
                            <strong>Lượt xem:</strong> {comic.views}
                        </div>

                        <div className={styles.comicGenres}>
                            {comic?.genres?.map((genre, idx) => (
                                <span className={styles.genreTag} key={idx}>{genre}</span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={styles.ComicDescription}>
                    <div className={styles.ComicInfo}>
                        <i className="fa-solid fa-circle-info"></i>
                        <strong> Giới thiệu:</strong>
                    </div>

                    <p className={styles.comicText}>{comic.description}</p>
                </div>

                {/* Thêm chapter */}
                <div className={styles.chapterTable}>
                    <div className={styles.addChapterBar}>
                        <button
                            className={styles.addChapterBtn}
                            onClick={() => router.push('/uploading/uploading_page3')}
                        >
                            Thêm chapter
                        </button>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Chapter Tiêu đề</th>
                                <th>Thời gian</th>
                                <th>Trạng thái</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {comic?.chapters?.map((chapter, idx) => (
                                <tr key={idx}>
                                    <td>#{chapter.number}</td>
                                    <td>{chapter.title}</td>
                                    <td>{chapter.date}</td>
                                    <td><span className={styles.status + ' ' + styles.pending}>{chapter.status}</span></td>
                                    <td>
                                        <div className={styles.chapterActionButtons}>
                                            <button
                                                className={styles.btnOutline}
                                                onClick={() => handleDeleteChapter(chapter.number)}
                                            >
                                                Xóa chapter
                                            </button>
                                            <button
                                                className={styles.btnPrimary}
                                                onClick={() => handlePreview(chapter.number)}
                                            >
                                                Xem trước
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Preview Modal */}
            {isPreviewOpen && (
                <div className={styles.previewModal}>
                    <div className={styles.modalContent}>
                        <button
                            className={styles.closeButton}
                            onClick={() => setIsPreviewOpen(false)}
                        >
                            <i className="fa-solid fa-times"></i>
                        </button>
                        {/* Loading indicator có thể thêm ở đây nếu cần */}
                        <div className={styles.previewImages}>
                            <div className={styles.previewGrid}>
                                {previewImages.map((image, index) => (
                                    <div key={index} className={styles.previewPage}>
                                        <span className={styles.pageNumber}>Trang {index + 1}</span>
                                        <img src={image.url} alt={`Trang ${index + 1}`} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}