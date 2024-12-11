import style from "../login/login.module.css"
import View from "../../items/view/View";
import Text from "../../items/text/Text";
import Input from "../../items/input/Input";
import Button from "../../items/button/Button";
import To from "../../items/to/To";
import { Formik } from "formik"
import * as yup from "yup"
import axios from "../../../config/axios"
import { useEffect } from "react";

function Register({ setLoader, putAlert, token, navigate }) {
    useEffect(() => {
        if (token) navigate('/')
    }, [token, navigate])

    const _register = async (values) => {
        setLoader(true)
        const data = {
            name: values.name,
            email: values.email,
            password: values.password
        }
        try {
            const response = await axios.post(process.env.REACT_APP_REGISTER_URL, data)
            putAlert({
                title: response.data.title,
                message: response.data.message,
                type: response.data.type
            })
            if (response.data.title === 'Success') {
                const loginData = {
                    email: values.email,
                    password: values.password
                }
                const response = await axios.post(process.env.REACT_APP_LOGIN_URL, loginData)
                response.data.token && localStorage.setItem('token', response.data.token)
            }
            setLoader(false)
        } catch (e) {
            setLoader(false)
            putAlert({
                title: 'Danger',
                message: 'Sorry we have a problem with the server'
            })
        }

    }

    const registerValidationSchema = yup.object().shape({
        name: yup.string().required('Name required').max(17, 'Must be less than 17 letters'),
        email: yup.string().email('Invalid email').required('Email required').max(70, 'Must be less than 70 letters'),
        password: yup.string().required('Password required').min(7, 'Must be at least 7 letters long'),
        confirmPassword: yup.string().required('Password required')
    })


    return (
        <View className={style.parentLogin}>
            <View className={style.parentForm}>
                <Text className={style.titleForm}>Create Account</Text>
                <Formik
                    initialValues={{
                        name: '',
                        email: '',
                        password: '',
                        confirmPassword: ''
                    }}
                    validationSchema={registerValidationSchema}
                    onSubmit={(values) => _register(values)}
                >
                    {({ handleChange, handleSubmit, values, errors, isValid }) => (
                        <>
                            <Input onChange={handleChange('name')} value={values.name} placeholder="Name"/>
                            {errors.name && <Text p className='textError'>{errors.name}</Text>}
                            <Input lowercase type="email" onChange={handleChange('email')} value={values.email} placeholder="Email"/>
                            {errors.email && <Text p className='textError'>{errors.email}</Text>}
                            <Input type="password" onChange={handleChange('password')} value={values.password} placeholder="Password"/>
                            {errors.password && <Text p className='textError'>{errors.password}</Text>}
                            <Input type="password" onChange={handleChange('confirmPassword')} value={values.confirmPassword} placeholder="Confirm Password"/>
                            {values.confirmPassword !== values.password && <Text p className='textError'>Passwords must match</Text>}
                            <Button type="button" onClick={handleSubmit} disabled={!isValid || values.confirmPassword !== values.password}>Create</Button>
                        </>
                    )}

                </Formik>
                <To to={`${window.location.origin}/login`}>Login</To>
            </View>
        </View>
    )
}

export default Register;