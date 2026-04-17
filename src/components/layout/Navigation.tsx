import styles from "./Navigation.module.css";
import { HiCloud } from "react-icons/hi";
import { HiCog6Tooth, HiMiniListBullet } from "react-icons/hi2";
import NavElement from "../ui/NavElement";

function Navigation({ className = "" }: { className?: string }) {
  return (
    <div className={`${styles.navBox} ${className}`}>
      <nav>
        <ul>
          <li>
            <NavElement icon={<HiCloud />} text="Clima" to="/weather" />
          </li>
          <li>
            <NavElement
              icon={<HiMiniListBullet />}
              text="Locaciones"
              to="/locations"
            />
          </li>
          <li>
            <NavElement
              icon={<HiCog6Tooth />}
              text="Configuración"
              to="/settings"
            />
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navigation;
