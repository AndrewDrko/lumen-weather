import { Outlet } from "react-router";
import Navigation from "./Navigation";

import styles from "./MainLayout.module.css";
import Header from "./Header";

function MainLayout() {
  return (
    <div className={styles.mainLayout}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Navigation />
    </div>
  );
}

export default MainLayout;
