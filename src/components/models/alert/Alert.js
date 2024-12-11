import View from "../../items/view/View";
import style from "./alert.module.css"
import Text from "../../items/text/Text";
import Button from "../../items/button/Button";
import Icon from "../../items/icon/Icon";

function Alert(props) {
    const state = () => {
        switch (props.title) {
            case 'Danger': return <Icon className={style.dangerIcon} name="Cancel02Icon" size={50} />
            case 'Alert': return <Icon className={style.alertIcon} name="Alert02Icon" size={50} />
            default: return <Icon className={style.safeIcon} name="CheckmarkCircle03Icon" size={50} />
        }
    }

    return (
        props.visible &&
        <View className={style.parentAlert} visible={props.visible}>
            <View className={style.message} dr="column">
                {props.type === 'question' ?
                    <>
                        {state()}
                        <View dr="column" gap="1em">
                            <Text>{props.title}</Text>
                            <Text className={style.title} p>{props.message}</Text>
                        </View>
                        <View className={style.options} dr="row">
                            <Button onClick={props.onClick} state="danger">Yes</Button>
                            <Button onClick={props.onClose}>No</Button>
                        </View>
                    </>
                    :
                    <>
                        {state()}
                        <View dr="column" gap="1em">
                            <Text>{props.title}</Text>
                            <Text className={style.title} p>{props.message}</Text>
                        </View>
                        <View className={style.options} dr="row">
                            <Button onClick={props.onClick}>Ok</Button>
                        </View>
                    </>}
            </View>
        </View>
    )

}

export default Alert;