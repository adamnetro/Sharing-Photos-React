import style from "./icon.module.css"
import * as Icons from "hugeicons-react"

function Icon({ name, color, size, className, onClick, fill}) {
    const Icon = Icons[name];
    if(!Icon){
        return <span>Icon not foun</span>
    }
    return <Icon onClick={onClick} color={color} size={size} className={`${style.icon} ${className}`} fill={fill?fill:'transparent'}/>;
}

export default Icon;