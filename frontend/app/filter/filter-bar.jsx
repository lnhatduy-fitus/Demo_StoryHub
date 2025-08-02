'use client';
import styles from './filter.module.css';
import { useRouter } from 'next/navigation';

const categoryList = [
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
    { categoryId: 49, name: "Thần tượng" },
];

export default function FilterBar() {

    const category = categoryList;

    const router = useRouter();

    const handleChange = (e) => {
        const categoryId = e.target.value;
        router.push(`/filter/result?category=${categoryId}`);
    };

    return (
        <div className={styles.panel}>
            <p className={styles.panel_title}>Chọn thể loại:</p>
            <div className={styles.checkbox_group}>
                {category.map((c) => (
                    <label key={c.categoryId} className={styles.checkbox_item}>
                        <input
                            type="radio"
                            name="category"
                            value={c.categoryId}
                            onChange={handleChange}
                        />
                        {c.name}
                    </label>
                ))}
            </div>
        </div>
    );

}