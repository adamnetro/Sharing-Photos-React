import View from "../../items/view/View";
import style from "./loader.module.css"
import { SyncLoader } from "react-spinners";

function Loader(props) {
    return (
        props.loader &&
        <View className={style.parentLoader} >
            <SyncLoader color={'var(--clr-df)'} size={17}/>
        </View>
    )
}

export default Loader;