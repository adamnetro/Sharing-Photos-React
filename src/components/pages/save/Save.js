import style from "./save.module.css"
import View from "../../items/view/View";
import Post from "../../models/post/Post";
import PostDetails from "../../models/postDetails/PostDetails";
import Text from "../../items/text/Text";
import { useEffect, useState } from "react";
import axios from "../../../config/axios";

function Save(props) {
    const { token, navigate } = props
    const [posts, setPosts] = useState([])
    const [postDetails, setPostDetails] = useState(null)

    useEffect(() => {
        if (!token) navigate('/login')
        _showMySaveList()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, navigate])

    const _showMySaveList = async () => {
        axios.defaults.headers.common.Authorization = token
        const response = await axios.get(process.env.REACT_APP_SHOWMYSAVELiST_URL)
        setPosts(response.data.saveList)
    }

    const postsMap = posts.map((post, id) => {
        return <Post onClick={() => setPostDetails(id + 1)} postId={post.post._id} {...props} key={id} name={post.post.user.name} title={post.post.title} image={post.post.image}/>
    })

    return (
        <View className={style.parentSave}>
            <View className={style.saveContent} dr="column" gap="1em">
            {postDetails && <PostDetails title={posts[postDetails - 1].post.title} description={posts[postDetails - 1].post.description} image={posts[postDetails - 1].post.image} onClose={() => setPostDetails(false)}/>}
            {posts.length > 0?postsMap:<Text className="noPosts">No saves yet</Text>}
            </View>
        </View>

    )
}

export default Save;