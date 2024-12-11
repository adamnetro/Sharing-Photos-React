import style from "./logo.module.css"
import To from "../../items/to/To";

function Logo(){
    return <To to="/" className={style.logo}>SharingPhotos</To>
}

export default Logo;