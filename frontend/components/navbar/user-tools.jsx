import styles from './user-tools.module.css';
import Link from 'next/link';

const User = () => {

    return(

        <Link className={styles.container} href={'/profile'}>
            
            <div className={styles.avt_container}>
                <img src='/default_user.png' className={styles.avt}></img>
            </div>

        </Link>

    );

}

export default User;