'use client';
import styles from './stage1.module.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const category = [
  { categoryId: 0, name: "Bí ẩn" },
  { categoryId: 1, name: "Hành động" },
  { categoryId: 2, name: "Phiêu lưu" },
  { categoryId: 3, name: "Tình cảm" },
  { categoryId: 4, name: "Hài" },
  { categoryId: 5, name: "Đời thường" },
  { categoryId: 6, name: "Bi kịch" },
  { categoryId: 7, name: "Giả tưởng" },
  { categoryId: 8, name: "Siêu nhiên" },
  { categoryId: 9, name: "Kinh dị" },
  { categoryId: 10, name: "Mystery" },
  { categoryId: 11, name: "Tâm lý" },
  { categoryId: 12, name: "Khoa học viễn tưởng" },
  { categoryId: 13, name: "Hồi hộp" },
  { categoryId: 14, name: "Lịch sử" },
  { categoryId: 15, name: "Võ thuật" },
  { categoryId: 16, name: "Robot/Cơ khí" },
  { categoryId: 17, name: "Học đường" },
  { categoryId: 18, name: "Thể thao" },
  { categoryId: 19, name: "Dị giới" },
  { categoryId: 20, name: "Hậu cung" },
  { categoryId: 21, name: "Truyện cho nữ trưởng thành" },
  { categoryId: 22, name: "Truyện cho thiếu nữ" },
  { categoryId: 23, name: "Truyện cho thiếu niên nam" },
  { categoryId: 24, name: "Truyện cho nam trưởng thành" },
  { categoryId: 25, name: "Đam mỹ" },
  { categoryId: 26, name: "Bách hợp" },
  { categoryId: 27, name: "fanmade" },
  { categoryId: 28, name: "Ecchi" },
  { categoryId: 29, name: "Châm biếm" },
  { categoryId: 30, name: "Phép thuật" },
  { categoryId: 31, name: "Trò chơi" },
  { categoryId: 32, name: "Ác quỷ/Ma quỷ" },
  { categoryId: 33, name: "Quân đội/Chiến tranh" },
  { categoryId: 34, name: "Trinh thám" },
  { categoryId: 35, name: "Sinh tồn" },
  { categoryId: 36, name: "Tội phạm" },
  { categoryId: 37, name: "Sinh tồn" },
  { categoryId: 38, name: "Không gian" },
  { categoryId: 39, name: "Hậu tận thế" },
  { categoryId: 40, name: "Tương lai" },
  { categoryId: 41, name: "Âm nhạc" },
  { categoryId: 42, name: "Ẩm thực" },
  { categoryId: 43, name: "Thế giới động vật" },
  { categoryId: 44, name: "Thần thoại" },
  { categoryId: 45, name: "Ma cà rồng" },
  { categoryId: 46, name: "Truyện ngắn" },
  { categoryId: 47, name: "Siêu năng lực" },
  { categoryId: 48, name: "Thám tử" },
  { categoryId: 49, name: "Thần tượng" }
];

export default function Stage1() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "Đang thực hiện",
    cover: null,
    genres: []
  });
  const [touched, setTouched] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({
        ...prev,
        genres: checked
          ? [...prev.genres, value]
          : prev.genres.filter((g) => g !== value),
      }));
    } else if (type === "file") {
      setForm((prev) => ({ ...prev, cover: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const isValid =
    form.title.trim() &&
    form.description.trim() &&
    form.genres.length > 0 &&
    form.cover;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(true);
    if (isValid) {
      // You can handle form data here (e.g., send to API)

      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('description', form.description);
      formData.append('status', form.status);

      formData.append('coverFile', form.cover);

      // Gửi từng thể loại
      form.genres.forEach((genre) => {
        formData.append('genres', genre);
      });

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comic/create`, {
          method: 'POST',
          credentials: 'include',
          body: formData
        })
        if (res.ok) {
          const infor = await res.json();
          router.push(`/upload/create/${infor.comicId}/stage2`);
        }else{
          router.push('/upload')
        }
      } catch (err) { alert(err)}
      
      // router.push(`/upload/create/${infor.comicId}/stage2`);
    }
  };

  return (
    <>


      <section className={styles.formWrapper}>
        <div className={styles.stepper}>
          <div className={styles.step}>
            <div className={`${styles.circle} ${styles.stepActiveCircle}`}>1</div>
            <div className={`${styles.label} ${styles.stepActiveLabel}`}>Tạo tác phẩm</div>
          </div>
          <div className={styles.separator}></div>
          <div className={styles.step}>
            <div className={styles.circle}>2</div>
            <div className={styles.label}>Thêm chapter</div>
          </div>
          <div className={styles.separator}></div>
          <div className={styles.step}>
            <div className={styles.circle}>3</div>
            <div className={styles.label}>Nộp chờ</div>
          </div>
        </div>

        <h2>Tạo truyện mới</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <label htmlFor="title" className={styles.formLabel}>
            Tên truyện:
          </label>
          <input
            type="text"
            name="title"
            id="title"
            required
            className={styles.input}
            value={form.title}
            onChange={handleChange}
          />

          <label htmlFor="description" className={styles.formLabel}>
            Mô tả:
          </label>
          <textarea
            name="description"
            id="description"
            required
            className={styles.textarea}
            value={form.description}
            onChange={handleChange}
          ></textarea>

          <label className={styles.formLabel}>Thể loại:</label>
          <div className={styles.checkboxGroup}>
            {category.map((c) => (
              <label key={c.categoryId} className={styles.checkBox}
              >
                <input
                  type="checkbox"
                  name="genre[]"
                  value={c.name}
                  checked={form.genres.includes(c.name)}
                  onChange={handleChange}
                />
                {c.name}
              </label>
            ))}
          </div>


          <label htmlFor="status" className={styles.formLabel}>
            Trạng thái:
          </label>
          <select
            name="status"
            id="status"
            className={styles.select}
            value={form.status}
            onChange={handleChange}
          >
            <option value="updating">Đang thực hiện</option>
            <option value="completed">Hoàn thành</option>
            <option value="delayed">Đã dừng</option>
            <option value="havenovel">Có Truyện Chữ</option>
          </select>

          <label htmlFor="cover" className={styles.formLabel}>
            Ảnh bìa:
          </label>
          <input
            type="file"
            name="cover"
            id="cover"
            accept="image/*"
            className={styles.fileInput}
            onChange={handleChange}
          />
          <button
            type="submit"
            className={styles.btn}
            disabled={touched && !isValid}
          >
            Tạo truyện
          </button>
        </form>
      </section>
    </>
  );
}