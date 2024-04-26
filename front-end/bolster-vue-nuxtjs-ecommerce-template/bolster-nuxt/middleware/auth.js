// Authentication logic

export default function ({ store, error }) {
    if (!store.state.authUser) {
        error({
            message: 'You are not loggedIn!',
            statusCode: 403
        })
    }
}