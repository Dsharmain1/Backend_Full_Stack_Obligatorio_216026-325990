const buildUserDTOResponse = user => {
    return {
        username: user.username,
        name: user.name,
        lastname: user.lastname,
        email: user.email
    }
}

module.exports = buildUserDTOResponse