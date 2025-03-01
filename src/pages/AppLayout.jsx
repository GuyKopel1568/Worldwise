import Sidebar from "../components/Sidebar";
import styles from "./AppLayout.module.css";
import User from "../components/User";
import Map from "../components/Map";
function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />;
      <Map />;
      <User />
    </div>
  );
}

export default AppLayout;
