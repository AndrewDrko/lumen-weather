import { Outlet } from "react-router";
import Navigation from "./Navigation";

import styles from "./MainLayout.module.css";
import Header from "./Header";
import Overlay from "../ui/Overlay";

function MainLayout() {
  return (
    <div className={styles.mainLayout}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Navigation className={styles.navigation} />
      <Overlay />
    </div>
  );
}

export default MainLayout;
