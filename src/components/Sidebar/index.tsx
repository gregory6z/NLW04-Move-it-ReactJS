import styles from '../../styles/components/Sidebar.module.css';
import { FiAward, FiHome , FiLogOut} from 'react-icons/fi'

export default function Sidebar() {
  return (
    <div className={styles.containerSidebar}>
      <img src="icons/devTime.svg" alt="devtime" />
    <div className={styles.buttons}>
      <button type="button">
      <div/>
        <FiHome size={38} />
        
      </button>
     
    </div>
    <div className={styles.logOut}>
        <FiLogOut size={32} />
    </div>
  </div>
);
}