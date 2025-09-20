const buildUserDTOResponse = user => {
    return {
        username: user.username,
        email: user.email
    }
}

module.exports = buildUserDTOResponse