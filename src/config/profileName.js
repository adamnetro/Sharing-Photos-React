function profileName(name){
    const transormToArry = name.split(' ')
    return transormToArry.map(letter => {
        return letter[0].toUpperCase();
    }).join('')
}

export default profileName;