import style from "./input.module.css"
function Input(props) {
    function custom(){
        const result = [style.input, style.default, props.className]
        if(props.lowercase) result.push(style.lowercase)
        if(props.noStyle) result.shift()
        return result.join(' ')
    }
    if(props.textArea){
        return <textarea type={props.type} className={custom()} id={props.id} placeholder={props.placeholder} onChange={props.onChange} value={props.value} hidden={props.hidden || false} readOnly={props.readOnly || false} rows="100"/>
    }else{
        return <input type={props.type} className={custom()} id={props.id} placeholder={props.placeholder} onChange={props.onChange} value={props.value} hidden={props.hidden || false} readOnly={props.readOnly || false}/>
    }
}

export default Input;