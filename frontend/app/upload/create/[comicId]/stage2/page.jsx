// 'use client';
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import styles from './stage2.module.css';
// import { use } from "react";


// export default function Stage2({ params }) {

//     const { comicId } = use(params);

//     const router = useRouter();
//     const [form, setForm] = useState({
//         chapter_title: "",
//         chapter_order: "",
//         chapter_images: null,
//     });
//     const [touched, setTouched] = useState(false);

//     const handleChange = async (e) => {
//         const { name, value, type, files } = e.target;
//         if (type === "file") {
//             setForm((prev) => ({ ...prev, chapter_images: files }));
//         } else {
//             setForm((prev) => ({ ...prev, [name]: value }));
//         }
//     };

//     const isValid =
//         form.chapter_title.trim() &&
//         form.chapter_order &&
//         form.chapter_images &&
//         form.chapter_images.length > 0;

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setTouched(true);

//         if (isValid) {
//             const formData = new FormData();
//             formData.append('comicId', comicId);
//             formData.append('title', form.chapter_title);
//             formData.append('chapterNumber', form.chapter_order);
//             Array.from(form.chapter_images).forEach(img => {
//                 formData.append('imageFiles', img);
//             });

//             try {
//                 const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chapter/create`, {
//                     method: 'POST',
//                     credentials: 'include',
//                     body: formData,
//                 });

//                 if (res.ok) {
//                     // ✅ Reset form sau khi gửi thành công
//                     setForm({
//                         chapter_title: "",
//                         chapter_order: "",
//                         chapter_images: null,
//                     });
//                     setTouched(false);

//                     // ✅ Optional: làm mới data hoặc show thông báo
//                     router.refresh();
//                     alert("Chương đã được tạo thành công!");
//                 } else {
//                     alert("Tạo chương thất bại");
//                 }
//             } catch (err) {
//                 alert("Lỗi server: " + err.message);
//             }
//         }
//     };


//     return (
//         <>


//             <section className={styles.formWrapper}>
//                 <div className={styles.stepper}>
//                     <div className={`${styles.step} ${styles.stepActive}`}>
//                         <div className={`${styles.circle} ${styles.stepActiveCircle}`}>1</div>
//                         <div className={`${styles.label} ${styles.stepActiveLabel}`}>Tạo tác phẩm</div>
//                     </div>
//                     <div className={styles.separator}></div>
//                     <div className={`${styles.step} ${styles.stepActive}`}>
//                         <div className={`${styles.circle} ${styles.stepActiveCircle}`}>2</div>
//                         <div className={`${styles.label} ${styles.stepActiveLabel}`}>Thêm chapter</div>
//                     </div>
//                     <div className={styles.separator}></div>
//                     <div className={styles.step}>
//                         <div className={styles.circle}>3</div>
//                         <div className={styles.label}>Nộp chờ</div>
//                     </div>
//                 </div>

//                 <h2>Thêm chương mới</h2>
//                 <form onSubmit={handleSubmit} encType="multipart/form-data">
//                     <label className={styles.formLabel}>Tên chương:</label>
//                     <input
//                         type="text"
//                         name="chapter_title"
//                         required
//                         className={styles.input}
//                         value={form.chapter_title}
//                         onChange={handleChange}
//                     />

//                     <label className={styles.formLabel}>Thứ tự chương:</label>
//                     <input
//                         type="number"
//                         name="chapter_order"
//                         min="1"
//                         required
//                         className={styles.input}
//                         value={form.chapter_order}
//                         onChange={handleChange}
//                     />

//                     <label className={styles.formLabel}>Ảnh chương:</label>
//                     <input
//                         type="file"
//                         name="chapter_images"
//                         accept="image/*"
//                         multiple
//                         className={styles.fileInput}
//                         onChange={handleChange}
//                     />

//                     <div className={styles.buttonGroup}>
//                         <button
//                             type="submit"
//                             className={styles.btn}
//                             disabled={touched && !isValid}
//                         >
//                             Tạo chương
//                         </button>

//                         <button
//                             type="button"
//                             className={styles.nextBtn}
//                             onClick={() => router.push(`/upload/create/${comicId}/stage3`)}
//                         >
//                             Next
//                         </button>
//                     </div>
//                 </form>
//             </section>
//         </>
//     );
// }

'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from './stage2.module.css';
import { use } from "react";

export default function Stage2({ params }) {
    const { comicId } = use(params);
    const router = useRouter();

    const [form, setForm] = useState({
        chapter_title: "",
        chapter_order: "",
        chapter_images: null,
    });
    const [fileInputKey, setFileInputKey] = useState(Date.now()); // ✅ Key để reset file input
    const [touched, setTouched] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file") {
            setForm((prev) => ({ ...prev, chapter_images: files }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const isValid =
        form.chapter_title.trim() &&
        form.chapter_order &&
        form.chapter_images &&
        form.chapter_images.length > 0;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setTouched(true);

        if (isValid) {
            const formData = new FormData();
            formData.append('comicId', comicId);
            formData.append('title', form.chapter_title);
            formData.append('chapterNumber', form.chapter_order);
            Array.from(form.chapter_images).forEach(img => {
                formData.append('imageFiles', img);
            });

            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chapter/create`, {
                    method: 'POST',
                    credentials: 'include',
                    body: formData,
                });

                if (res.ok) {
                    // ✅ Reset form và file input
                    setForm({
                        chapter_title: "",
                        chapter_order: "",
                        chapter_images: null,
                    });
                    setFileInputKey(Date.now()); // ✅ Đổi key để remount input file
                    setTouched(false);
                    router.refresh();
                    alert("Chương đã được tạo thành công!");
                } else {
                    alert("Tạo chương thất bại");
                }
            } catch (err) {
                alert("Lỗi server: " + err.message);
            }
        }
    };

    return (
        <section className={styles.formWrapper}>
            <div className={styles.stepper}>
                <div className={`${styles.step} ${styles.stepActive}`}>
                    <div className={`${styles.circle} ${styles.stepActiveCircle}`}>1</div>
                    <div className={`${styles.label} ${styles.stepActiveLabel}`}>Tạo tác phẩm</div>
                </div>
                <div className={styles.separator}></div>
                <div className={`${styles.step} ${styles.stepActive}`}>
                    <div className={`${styles.circle} ${styles.stepActiveCircle}`}>2</div>
                    <div className={`${styles.label} ${styles.stepActiveLabel}`}>Thêm chapter</div>
                </div>
                <div className={styles.separator}></div>
                <div className={styles.step}>
                    <div className={styles.circle}>3</div>
                    <div className={styles.label}>Nộp chờ</div>
                </div>
            </div>

            <h2>Thêm chương mới</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <label className={styles.formLabel}>Tên chương:</label>
                <input
                    type="text"
                    name="chapter_title"
                    required
                    className={styles.input}
                    value={form.chapter_title}
                    onChange={handleChange}
                />

                <label className={styles.formLabel}>Thứ tự chương:</label>
                <input
                    type="number"
                    name="chapter_order"
                    min="1"
                    required
                    className={styles.input}
                    value={form.chapter_order}
                    onChange={handleChange}
                />

                <label className={styles.formLabel}>Ảnh chương:</label>
                <input
                    key={fileInputKey} // ✅ Reset input khi key thay đổi
                    type="file"
                    name="chapter_images"
                    accept="image/*"
                    multiple
                    className={styles.fileInput}
                    onChange={handleChange}
                />

                <div className={styles.buttonGroup}>
                    <button
                        type="submit"
                        className={styles.btn}
                        disabled={touched && !isValid}
                    >
                        Tạo chương
                    </button>

                    <button
                        type="button"
                        className={styles.nextBtn}
                        onClick={() => router.push(`/upload/create/${comicId}/stage3`)}
                    >
                        Next
                    </button>
                </div>
            </form>
        </section>
    );
}
