import style from "./post.module.css"
import View from "../../items/view/View"
import Image from "../../items/image/Image"
import Text from "../../items/text/Text"
import Icon from "../../items/icon/Icon"
import profileName from "../../../config/profileName"
import axios from "../../../config/axios"
import { useEffect, useState } from "react"

function Post(props) {
    const { token, putAlert } = props
    const [likes, setLikes] = useState({})
    const [saved, setSaved] = useState(false)


    const _showLikes = async () => {
        const data = {
            postId: props.postId
        }
        if (token) data.userId = props.user._id
        axios.defaults.headers.common.Authorization = token
        const response = await axios.post(process.env.REACT_APP_SHOWLIKES_URL, data)
        setLikes(response.data)

    }

    const _like = async () => {
        if (token) {
            axios.defaults.headers.common.Authorization = token
            await axios.post(process.env.REACT_APP_LIKE_URL, {
                postId: props.postId
            })
            _showLikes()
        } else {
            putAlert({
                title: 'Alert',
                message: 'You must create an account or login first'
            })
        }
    }

    const _showSave = async () => {
        if (token) {
            axios.defaults.headers.common.Authorization = token
            const response = await axios.post(process.env.REACT_APP_SHOWSAVE_URL, {
                postId: props.postId
            })
            setSaved(response.data.saved)
        }
    }

    const _save = async () => {
        if (token) {
            axios.defaults.headers.common.Authorization = token
            await axios.post(process.env.REACT_APP_SAVEPOST_URL, {
                postId: props.postId
            })
            _showSave()
        } else {
            putAlert({
                title: 'Alert',
                message: 'You must create an account or login first'
            })
        }
    }

    useEffect(() => {
        _showLikes()
        _showSave()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <View className={style.parentPost} dr="column">
            <View className={style.head} dr="row">
                <View className={style.pfp}>{profileName(props.name)}</View>
                <Text className={style.name}>{props.name}</Text>
            </View>
            <Text className={style.title}>{props.title}</Text>
            <Image onClick={props.onClick} className={style.photo} src={`${process.env.REACT_APP_IMAGES_URL}/${props.image}`} />
            <View className={style.optionSide} dr="row">
                <View dr="row" gap="0.5em">
                    <Icon onClick={() => _like()} className={likes.liked ? style.liked : style.like} fill={likes.liked ? 'var(--clr-red)' : false} name="FavouriteIcon" size={27} />
                    <Text className={style.totalLike}>{likes.likes}</Text>
                </View>
                <Icon onClick={() => _save()} className={saved ? style.saved : style.save} fill={saved ? 'var(--clr-gold)' : false} name="Bookmark02Icon" size={27} />
            </View>
        </View>
    )
}

export default Post;