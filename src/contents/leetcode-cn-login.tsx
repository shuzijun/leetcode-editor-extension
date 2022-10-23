import type {PlasmoContentScript, PlasmoGetInlineAnchor} from "plasmo"
import {Button, Tooltip} from 'antd';
import cssText from "data-text:~/src/index.less"

import {useStorage} from "@plasmohq/storage/hook"

import {GetLogoSize} from "~logo"

export const config: PlasmoContentScript = {
    matches: ["https://leetcode.cn/*"]
}

export const getStyle = () => {
    const style = document.createElement("style")
    style.textContent = cssText
    return style
}

// Use this to optimize unmount lookups
export const getShadowHostId = () => "leetcode-editor-login-id"

export const getInlineAnchor: PlasmoGetInlineAnchor = () =>
document.querySelector("a[href='/accounts/logout/']")


const LeetcodeCnLogin = () => {

    const [showIcon] = useStorage("ShowIcon", true)
    const logo = GetLogoSize(14)
    const url = GetUrl()

    function click() {
        chrome.runtime.sendMessage('get-user-data', (response) => {
            window.open(url+response)
        });

    }

    return (
            <Tooltip title="IDE Login">
                <Button hidden={!showIcon} type="text" onClick={click} icon={logo} target='_blank'> Login </Button>
            </Tooltip>

            )
}


const GetUrl = () => {
    const [editor] = useStorage("Editor", "leetcode-editor-pro")
    const [product] = useStorage("Product", "idea")
    const [project] = useStorage("Project", "")

    return "jetbrains://" + product + "/" + editor + "/login?project=" + project + "&token="
}

export default LeetcodeCnLogin