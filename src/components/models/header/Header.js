import style from "./header.module.css"
import View from "../../items/view/View"
import Logo from "../logo/Logo";
import To from "../../items/to/To";
import Button from "../../items/button/Button";
import Icon from "../../items/icon/Icon";
import Text from "../../items/text/Text";
import { useEffect, useState } from "react";
function Header({ setVisible, putAlert, location, token }) {
    const [list, setList] = useState(false)
    useEffect(() => {
        setList(false)
    }, [location])

    const LoginIcon = () => {
        if (!token) {
            return <To to="/login">
                <Text className={style.icon}>Login</Text>
            </To>
        } else {
            return (
            <Button onClick={() => setList(true)} ><Icon className={style.icon} name="Menu11Icon" size={30} /></Button>
        )
        }

    }

    function logOut() {
        putAlert({
            title: 'Alert', message: 'Are you sure you want to log out?', type: 'question', click: () => {
                localStorage.removeItem('token')
                setVisible(false)
            }
        })
        setList(false)
    }

    return (
        <View className={style.header} dr="row" >
            <Logo />
            <LoginIcon />
            {list &&
                <View className={style.list} dr="column">
                    <View dr="column">
                        <To className={style.option} to="/user">User <Icon name="UserIcon" size={30} /></To>
                        <To className={style.option} to="/save">Save <Icon name="Bookmark02Icon" size={30} /></To>
                    </View>
                    <Button state="danger" onClick={() => logOut()}>Log Out</Button>
                </View>
            }
        </View>
    )
}

export default Header;