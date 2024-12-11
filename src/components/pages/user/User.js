import style from "./user.module.css"
import View from "../../items/view/View";
import Button from "../../items/button/Button";
import PostController from "../../models/postController/PostController";
import Text from "../../items/text/Text";
import Input from "../../items/input/Input";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup"
import axios from "../../../config/axios";
import profileName from "../../../config/profileName";
import PostEdit from "../../models/postEdit/PostEdit";

function User(props) {
    const { user, putAlert, token, navigate, setLoader } = props
    const [edit, setEdit] = useState(false)
    const [postEdit, setPostEdit] = useState(false)
    const [myPosts, setMyPosts] = useState([])

    useEffect(() => {
        if (!token) {
            navigate('/login')
        } else {
            _showMyPosts()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, navigate])

    const _showMyPosts = async () => {
        axios.defaults.headers.common.Authorization = token
        const response = await axios.get(process.env.REACT_APP_SHOWMYPOSTS_URL)
        setMyPosts(response.data)
    }

    function editComponents(handleChange, handleSubmit, values, errors, isValid) {
        if (!edit) {
            return (
                <>
                    <Text>{user && user.name}</Text>
                    <Text>{user && user.email}</Text>
                    <Button onClick={() => setEdit(true)}>Edit</Button>
                </>
            )
        } else {
            return (
                <>
                    <Input onChange={handleChange('name')} value={values.name} placeholder="Name" />
                    {errors.name && <Text p className='textError'>{errors.name}</Text>}
                    <Input onChange={handleChange('email')} value={values.email} placeholder="Email" />
                    {errors.email && <Text p className='textError'>{errors.email}</Text>}
                    <Input type="password" onChange={handleChange('password')} value={values.password} placeholder="Password" />
                    {errors.password && <Text p className='textError'>{errors.password}</Text>}
                    <Button type="button" onClick={handleSubmit} disabled={!isValid}>Continue</Button>
                    <Button state="danger" onClick={() => setEdit(false)}>Cancel</Button>
                </>
            )
        }
    }

    const _update = async (values) => {
        setLoader(true)
        const data = {
            name: values.name,
            email: values.email,
            password: values.password,
        }
        if (token) {
            axios.defaults.headers.common.Authorization = token
            const response = await axios.put(process.env.REACT_APP_UPDATE_URL, data)
            setLoader(false)
            putAlert({
                title: response.data.title,
                message: response.data.message
            })

            if (response.data.title === "Success") {
                setEdit(false)
            }
        }
    }

    const _delete = (postId) => {
        putAlert({
            title: 'Danger',
            message: 'Are you sure you want to delete this post?',
            type: 'question',
            click: async () => {
                setLoader(true)
                axios.defaults.headers.common.Authorization = token
                const response = await axios.post(process.env.REACT_APP_DELETE_URL, {
                    postId: postId
                })
                setLoader(false)
                putAlert({
                    title: response.data.title,
                    message: response.data.message
                })
                _showMyPosts()
            }
        })

    }

    const editValidationSchema = yup.object().shape({
        name: yup.string().required('Name required').max(17, 'Must be less than 17 letters'),
        email: yup.string().email('Invalid email').required('Email required').max(70, 'Must be less than 70 letters'),
        password: yup.string().min(7, 'Must be at least 7 letters long'),
    })

    const myPostsMap = myPosts.map((post, id) => {
        return <PostController onEdit={() => setPostEdit(id + 1)} key={id} onDelete={() => _delete(post._id)} title={post.title} image={post.image} />
    })

    return (
        <View className={style.parentUser}>
            <View className={style.userInformation}>
                <View className={style.pfp}>{profileName(user ? user.name : '?')}</View>
                <View className={style.information} dr="column" gap="1em">
                    <Formik
                        initialValues={{
                            name: user ? user.name : '',
                            email: user ? user.email : '',
                            password: ''
                        }}
                        validationSchema={editValidationSchema}
                        onSubmit={(values) => _update(values)}
                    >
                        {({ handleChange, handleSubmit, values, errors, isValid }) => (
                            editComponents(handleChange, handleSubmit, values, errors, isValid)
                        )}
                    </Formik>

                </View>
            </View>

            <View dr="column" gap="1em">
            {postEdit && <PostEdit {...props} _showMyPosts={_showMyPosts} onClick={() => setPostEdit(false)} se onClose={() => setPostEdit(false)} title={myPosts[postEdit - 1].title} description={myPosts[postEdit - 1].description} postId={myPosts[postEdit - 1]._id}/>}
            {myPostsMap.length > 0?myPostsMap:<Text className="noPosts">No posts shared yet</Text>}
            </View>
        </View>
    )
}

export default User;