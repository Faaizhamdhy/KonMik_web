import Image from "next/image";
import styles from "./CitsunePose.module.css";

export default function CitsunePose() {
  return (
    <div className={styles.stage}>
      <div className={styles.halo} aria-hidden="true" />
      <span className={`${styles.spark} ${styles.sparkOne}`} aria-hidden="true">✦</span>
      <span className={`${styles.spark} ${styles.sparkTwo}`} aria-hidden="true">✧</span>
      <span className={`${styles.spark} ${styles.sparkThree}`} aria-hidden="true">✦</span>
      <div className={styles.character}>
        <Image
          src="/citsune-pose.webp"
          alt="Citsune dengan topi merah dan pose kedua tangan seperti cakar"
          fill
          sizes="(min-width: 1280px) 288px, (min-width: 1024px) 256px, (min-width: 640px) 240px, 208px"
          className={styles.image}
        />
      </div>
    </div>
  );
}
