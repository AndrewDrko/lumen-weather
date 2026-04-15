import { NavLink } from "react-router";
import styles from "./NavElement.module.css";

interface NavElementProps {
  icon: React.ReactNode;
  text: string;
  to: string;
  isLight?: boolean;
}

function NavElement({ icon, text, to }: NavElementProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? `${styles.linkNav} ${styles.selected}` : styles.linkNav
      }
    >
      {icon}
      <span>{text}</span>
    </NavLink>
  );
}

export default NavElement;
