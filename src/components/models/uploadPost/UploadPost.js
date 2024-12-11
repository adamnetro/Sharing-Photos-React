import style from "./uploadPost.module.css"
import View from "../../items/view/View";
import Input from "../../items/input/Input";
import Button from "../../items/button/Button";
import Text from "../../items/text/Text";
import Icon from "../../items/icon/Icon";
import Image from "../../items/image/Image";
import { Formik } from "formik";
import * as yup from "yup"
import { useState } from "react";
import axios from "../../../config/axios";

function UploadPost({ putAlert, token }) {
    const [image, setImage] = useState('')
    const [imageSrc, setImageSrc] = useState('')

    const _uploadPost = async (values) => {
        if (token) {
            if (image) {
                const formData = new FormData()
                formData.append('title', values.title)
                if (values.description) formData.append('description', values.description)
                formData.append('image', image)
                axios.defaults.headers.common.Authorization = token
                const response = await axios.post(process.env.REACT_APP_UPLOAD_URL, formData)
                setImageSrc('')
                putAlert({
                    title: response.data.title,
                    message: response.data.message
                })

            } else {
                putAlert({
                    title: 'Alert',
                    message: 'Image upload required'
                })
            }

        } else {
            putAlert({
                title: 'Alert',
                message: 'You must create an account or login first'
            })
        }
    }

    function fileChange(e) {
        const fileTarget = e.target.files[0]
        if (fileTarget.type.split('/')[0] !== 'image') {
            putAlert({
                title: 'Alert',
                message: 'Only photo allowed'
            })
        } else {
            const file = new FileReader()
            file.readAsDataURL(fileTarget)
            file.onload = () => {
                setImageSrc(file.result)
                setImage(fileTarget)
            }
        }

    }

    const uploadValidationSchema = yup.object().shape({
        title: yup.string().required('Title required').max(40, 'Must be less than 40 letters'),
        description: yup.string().max(200, 'Must be less than 200 letters')
    })


    return (
        <View className={style.uploadPost} dr="column">
            <Formik
                initialValues={{
                    title: '',
                    description: '',
                }}
                validationSchema={uploadValidationSchema}
                onSubmit={(values) => _uploadPost(values)}
            >
                {({ handleChange, handleSubmit, values, errors, isValid }) => (
                    <>
                        <Input onChange={handleChange('title')} value={values.title} placeholder="Title" />
                        {errors.title && <Text p className='textError'>{errors.title}</Text>}
                        <Input onChange={handleChange('description')} value={values.description} textArea placeholder="Description" />
                        {errors.description && <Text p className='textError'>{errors.description}</Text>}
                        <Input id="uploadArea" type="file" hidden onChange={(e) => fileChange(e)} />
                        <label className={style.uploadArea} htmlFor="uploadArea">
                            {!imageSrc && <Icon className={style.uploadIcon} name="Upload04Icon" size={50} />}
                            {imageSrc && <Image className={style.imageShow} src={imageSrc} />}
                        </label>
                        <Button type="button" onClick={handleSubmit} disabled={!isValid}>Upload</Button>
                    </>
                )}

            </Formik>

        </View>
    )
}

export default UploadPost;