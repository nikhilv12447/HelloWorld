module.exports = function (src) {
    const callback = this.async();
    console.log("-------------------------------------------")
    console.log(src)
    const style = "`" + src + "`"
    const content = `   
        import {addToStyle, getStyles} from 'utils/utils.js';

        addToStyle(${style});
        export default getStyles;
    `
    callback(null, content)
}