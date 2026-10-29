import MobileCatalog from "./mobile-catalog";
import DesktopCatalog from "./desktop-catalog";
import s from "./catalog.module.css";

export default function Home() {
  return <><DesktopCatalog /><div className={s.mobile}><MobileCatalog /></div></>;
}
