import style from "./postController.module.css"
import View from "../../items/view/View";
import Image from "../../items/image/Image";
import Text from "../../items/text/Text";
import Icon from "../../items/icon/Icon";

function PostController(props) {
    return (
        <View className={style.parentPostController} dr="column">
            <View dr="row" gap="1em">
                <Image className={style.photo} src={`${process.env.REACT_APP_IMAGES_URL}/${props.image}`} />
                <Text className={style.title}>{props.title}</Text>
            </View>
            <View className={style.postOptions} dr="row">
                <Icon onClick={props.onEdit} className={style.edit} name="PencilEdit01Icon" />
                <Icon onClick={props.onDelete} className={style.delete} name="Delete02Icon" />
            </View>
        </View>
    )
}

export default PostController;