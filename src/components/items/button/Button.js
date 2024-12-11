import style from './button.module.css'
function Button(props) {
    /* props : 
            type = danger / safe
            look = square / optionIcon
            hover
            autoSize
            noStyle
            noRadius
    */
    function custom(){
        const result = [style.default]
        if(props.look === 'square') result.push(style.square);
        if(props.look === 'optionIcon') result.push(style.optionIcon);
        if(props.state === 'danger') result.push(style.danger);
        if(props.state === 'safe') result.push(style.safe);
        if(props.autoSize) result.push(style.autoSize);
        if(props.hover) result.push(style.hover);
        if(props.noRadius) result.push(style.noRadius);
        if(props.noStyle) return '';
        if(props.className) result.push(props.className)
        return result.join(' ')
    }

    return <button type={props.type} onClick={props.onClick} className={custom()} title={props.title} disabled={props.disabled}>{props.children}</button>
}

export default Button;