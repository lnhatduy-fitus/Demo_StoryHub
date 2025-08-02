import styles from "./profile.module.css";

export default function ProfilePage() {
  return (
    <div className={styles.profileInfo}>
      <div className={styles.header}>
        <h2>Thông tin cá nhân</h2>
        <div className={styles.user}>
          <img src="NamViet.png" alt="avatar" className={styles.avatar} />
          <span>Số token: 2000000</span>
        </div>
      </div>

      <form className={styles.form}>
        <div className={styles.row}>
          <div>
            <label>HỌ</label>
            <input type="text" className={styles.lastNameInput} />
          </div>
          <div>
            <label>TÊN</label>
            <input type="text" className={styles.firstNameInput} />
          </div>
        </div>

		<div>
			<label className={styles.labelBirth}>NGÀY SINH</label>
			<input type="date" className={styles.birthInput} />
		</div>

		<div>
			<label className={styles.labelEmail}>EMAIL</label>
			<input type="email" className={styles.emailInput} />
		</div>

		<div>
			<label className={styles.labelPassword}>MẬT KHẨU</label>
			<input type="password" className={styles.passwordInput} />
		</div>

        <div className={styles.actions}>
          <button type="button" className={styles.cancel}>Hủy</button>
          <button type="submit" className={styles.save}>Lưu</button>
        </div>
      </form>
    </div>
  );
}
