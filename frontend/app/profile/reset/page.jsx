import styles from "./reset.module.css";

export default function ProfilePage() {
  return (
    <div className={styles.resetForm}>
      <div className={styles.header}>
        <h2>Đổi mật khẩu</h2>
      </div>

      <form className={styles.form}>
		<div>
			<label className={styles.labelPrePass}>MẬT KHẨU HIỆN TẠI</label>
			<input type="password" className={styles.PrePassInput} />
		</div>

		<div>
			<label className={styles.labelNewPass}>MẬT KHẨU MỚI</label>
			<input type="password" className={styles.NewPassInput} />
		</div>

		<div>
			<label className={styles.labelConfPass}>XÁC NHẬN MẬT KHẨU</label>
			<input type="password" className={styles.ConfPassInput} />
		</div>

        <div className={styles.actions}>
          <button type="button" className={styles.cancel}>Hủy</button>
          <button type="submit" className={styles.save}>Lưu</button>
        </div>
      </form>
    </div>
  );
}
