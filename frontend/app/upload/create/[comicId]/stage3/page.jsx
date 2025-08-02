'use client';
import styles from "./stage3.module.css";

export default function Stage4() {
  return (
    <>
      

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
          <div className={`${styles.step} ${styles.stepActive}`}>
            <div className={`${styles.circle} ${styles.stepActiveCircle}`}>3</div>
            <div className={`${styles.label} ${styles.stepActiveLabel}`}>Nộp chờ</div>
          </div>
        </div>

        <div className={styles.resultBox}>
          <div className={styles.iconSuccess}>✔</div>
          <h3>Gửi thành công, đang chờ kiểm duyệt.</h3>
          <p className={styles.note}>
            Bạn có thể tiếp tục chỉnh sửa, lưu và gửi lại trong thời gian chờ kiểm duyệt.
          </p>
          <p className={styles.subNote}>
            Chúng tôi sẽ tiến hành kiểm duyệt tác phẩm của bạn trong thời gian 3 ngày làm việc.
            Vui lòng để ý thông báo của Hệ thống trong thời gian này. Xin cảm ơn!
          </p>
          <div className={styles.btnGroup}>
            <button
              className={styles.btnOutline}
              type="button"
              onClick={() => {
                window.location.href = "/home";
              }}
            >
              Quay lại nội dung
            </button>
            <button
              className={styles.btnPrimary}
              type="button"
              onClick={() => {
                window.location.href = "/upload";
              }}
            >
              Trở về trang chủ
            </button>
          </div>
        </div>
      </section>
    </>
  );
}