const types = require("@babel/types")

function loadablePlugin({ types: t }) {
    return {
        visitor: {
            CallExpression: (path) => {
                const { callee } = path.node
                if (callee.name === "loadable") {
                    const { arguments } = path.node
                    let componentPath, isSSR = false, isSelectiveHydration = false;
                    if (arguments[1] && arguments[1].type === "ObjectExpression") {
                        arguments[1].properties.forEach(({ key: { name } = {}, value: { value } = {} }) => {
                            if (name === "ssr")
                                isSSR = value
                            if (name === "selectiveHydration")
                                isSelectiveHydration = value
                        })
                    }
                    console.log(isSSR, isSelectiveHydration)
                    if (isSSR || isSelectiveHydration) {
                        path.traverse({
                            CallExpression: (path) => {
                                const { callee, arguments } = path.node
                                if (callee.type === "Import") {
                                    componentPath = arguments[0]
                                }
                            }
                        })
                        arguments[0] = t.memberExpression(t.callExpression(t.identifier("require"), [componentPath]), t.identifier("default"))
                    }
                }
            }
        }
    };
}

module.exports = loadablePlugin