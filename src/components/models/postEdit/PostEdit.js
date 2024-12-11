import style from "./postEdit.module.css"
import View from "../../items/view/View"
import Input from "../../items/input/Input";
import Button from "../../items/button/Button";
import Text from "../../items/text/Text";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "../../../config/axios";

function PostEdit(props) {
    const {putAlert, _showMyPosts, setLoader} = props
    const _postEdit = async (values) => {
        setLoader(true)
        const data = {
            title:values.title,
            description:values.description,
            postId: props.postId
        }
        const response = await axios.post(process.env.REACT_APP_POSTEDIT_URL, data)
        _showMyPosts()
        setLoader(false)
        putAlert({
            title:response.data.title,
            message:response.data.message
        })
    }

    const editPostValidationSchema = yup.object().shape({
        title: yup.string().required('Title required').max(40, 'Must be less than 40 letters'),
        description: yup.string().max(200, 'Must be less than 200 letters')
    })
    return (
        <View className={style.parentPostEdit}>
            <View className={style.form} dr="column">
                <Formik
                    initialValues={{
                        title: props.title,
                        description: props.description
                    }}
                    validationSchema={editPostValidationSchema}
                    onSubmit={(values) => _postEdit(values)}
                >
                    {({ handleChange, handleSubmit, values, errors, isValid }) => (
                        <>
                    <Input onChange={handleChange('title')} value={values.title} placeholder="Title" />
                    {errors.title && <Text p className='textError'>{errors.title}</Text>}
                    <Input onChange={handleChange('description')} value={values.description} textArea placeholder="Description" />
                    {errors.description && <Text p className='textError'>{errors.description}</Text>}
                    <Button type="button" onClick={() => {
                        handleSubmit()
                        props.onClick()
                    }} disabled={!isValid}>Continue</Button>
                    </>
                    )}

                </Formik>
                <Button onClick={props.onClose} state="danger">Cancel</Button>
            </View>
        </View>
    )
}

export default PostEdit;