import AppNav from './AppNav';
import Footer from './Footer';
import Logo from './Logo';
import { Outlet } from 'react-router-dom';

import styles from './Sidebar.module.css';
export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <Footer />
    </div>
  );
}
