import style from "./image.module.css"

function Image(props){
    return <img onClick={props.onClick} src={props.src} alt={props.alt} height={props.h} width={props.w} className={`${style.img} ${props.className}`}/>
}

export default Image;