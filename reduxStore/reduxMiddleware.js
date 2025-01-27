export function getFlushDataMiddleware(res) {
    return api => next => action => {
        if (action?.flushData) {
            res.write("<script>")
            res.write("window.dispatch(" + JSON.stringify(action) + ")")
            res.write("</script>")
        }
        next(action)
    }
}