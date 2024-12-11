import style from "./login.module.css"
import View from "../../items/view/View"
import Input from "../../items/input/Input"
import Button from "../../items/button/Button"
import Text from "../../items/text/Text"
import To from "../../items/to/To"
import { Formik } from "formik"
import * as yup from "yup"
import axios from "../../../config/axios"
import { useEffect } from "react"


function Login({ setLoader, putAlert, token, navigate }) {
    useEffect(() => {
        if (token) navigate('/')
    }, [token, navigate])

    const _login = async (values) => {
        setLoader(true)
        const data = {
            email: values.email,
            password: values.password
        }
        try {
            const response = await axios.post(process.env.REACT_APP_LOGIN_URL, data)
            putAlert({
                title: response.data.title || 'Error',
                message: response.data.message,
                type: response.data.type
            })
            response.data.token && localStorage.setItem('token', response.data.token)
            setLoader(false)
        } catch (e) {
            setLoader(false)
            putAlert({
                title: 'Danger',
                message: 'Sorry we have a problem with the server'
            })
        }
    }

    const loginValidationSchema = yup.object().shape({
        email: yup.string().email('Invalid email').required('Email required'),
        password: yup.string().required('Password required')
    })

    return (
        <View className={style.parentLogin}>
            <View className={style.parentForm}>
                <Text className={style.titleForm}>Login</Text>
                <Formik
                    initialValues={{
                        email: '',
                        password: ''
                    }}
                    validationSchema={loginValidationSchema}
                    onSubmit={(values) => _login(values)}
                >
                    {({ handleChange, handleSubmit, values, errors, isValid }) => (
                        <>
                            <Input lowercase type="email" onChange={handleChange('email')} value={values.email} placeholder="Email"/>
                            {errors.email && <Text p className='textError'>{errors.email}</Text>}
                            <Input type="password" onChange={handleChange('password')} value={values.password} placeholder="Password"/>
                            {errors.password && <Text p className='textError'>{errors.password}</Text>}
                            <Button type="button" onClick={handleSubmit} disabled={!isValid}>Login</Button>
                        </>
                    )}

                </Formik>
                <To to={`${window.location.origin}/register`}>create account</To>
            </View>
        </View>

    )
}

export default Login;