// import style from "./text.module.css"

function Text(props){
    if(props.p){
        return <p className={props.className}>{props.children}</p>
    }else{
        return <h1 className={props.className}>{props.children}</h1>
    }

}

export default Text;