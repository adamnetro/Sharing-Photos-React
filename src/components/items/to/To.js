import style from "./to.module.css"
import { Link } from "react-router-dom";

function To(props){
    function custom(){
        return [style.to, props.className].join(' ')
    }
    return <Link to={props.to || '#'} className={custom()} onClick={props.onClick} title={props.title}>{props.children}</Link>
}

export default To;