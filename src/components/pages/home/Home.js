import style from "./home.module.css"
import View from "../../items/view/View"
import Post from "../../models/post/Post";
import Text from "../../items/text/Text";
import UploadPost from "../../models/uploadPost/UploadPost";
import { useEffect, useState } from "react";
import axios from "../../../config/axios";
import PostDetails from "../../models/postDetails/PostDetails";

function Home(props) {
    const [posts, setPosts] = useState([])
    const [postDetails, setPostDetails] = useState(false)
    const {putAlert} = props


    useEffect(() => {
        const _show = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_SHOW_URL)
                setPosts(response.data)
            } catch (e) {
                putAlert({
                    title: 'Danger',
                    message: 'Sorry we have a problem with the server'
                })
            }

        }
        _show()
        //👇 عشان أعطل القاعدة و عدم اظهار التحذير! وجدته عبر انترنت
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const postsMap = posts.map((post, id) => {
        return <Post onClick={() => setPostDetails(id + 1)} postId={post._id} {...props} key={id} name={post.user.name} title={post.title} image={post.image}/>
    })

    return (
        <View className={style.parentHome} dr="column">
            <View className={style.homeContent} dr="column" gap="1em">
                <UploadPost {...props} />
                {postDetails && <PostDetails title={posts[postDetails - 1].title} description={posts[postDetails - 1].description} image={posts[postDetails - 1].image} onClose={() => setPostDetails(false)}/>}
                {posts.length > 0?postsMap:<Text className="noPosts">No posts yet</Text>}
            </View>
        </View>
    )
}

export default Home;