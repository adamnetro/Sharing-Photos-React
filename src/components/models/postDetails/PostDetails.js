import style from "./postDetails.module.css"
import View from "../../items/view/View";
import Text from "../../items/text/Text";
import Button from "../../items/button/Button";
import Image from "../../items/image/Image";


function PostDetails(props) {
    return(
        <View className={style.parentPostDetails}>
            <View className={style.information} dr="column">
                <View dr="column" gap="2em">
                <Text className={style.title}>{props.title}</Text>
                <Text p className={style.description}>{props.description}</Text>
                </View>
                <Button state="danger" onClick={props.onClose}>Close</Button>
            </View>
            <Image className={style.photo} src={`${process.env.REACT_APP_IMAGES_URL}/${props.image}`}/>
        </View>
    )
}

export default PostDetails;