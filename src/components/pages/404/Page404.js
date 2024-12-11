import style from "./page404.module.css"
import View from "../../items/view/View";
import Text from "../../items/text/Text";

function Page404() {
    return (
        <View className={style.parent404} dr="column">
            <Text className={style.title}>404</Text>
            <Text p className={style.description}>Sorry but this page is not available</Text>
        </View>
    )
}

export default Page404;