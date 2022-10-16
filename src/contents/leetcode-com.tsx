import type { PlasmoContentScript, PlasmoGetInlineAnchor } from "plasmo"
import {Button, Tooltip} from 'antd';
import cssText from "data-text:~/src/index.less"

import {useStorage} from "@plasmohq/storage/hook"

import GetLogo from "~logo";

export const config: PlasmoContentScript = {
    matches: ["https://leetcode.com/problems/*"]
}

export const getStyle = () => {
    const style = document.createElement("style")
    style.textContent = cssText
    return style
}


export const getInlineAnchor: PlasmoGetInlineAnchor = () =>
document.querySelector(".select__2iyW")

// Use this to optimize unmount lookups
export const getShadowHostId = () => "leetcode-editor-open-id"

const GetUrl = () => {
    const [editor] = useStorage("Editor", "leetcode-editor-pro")
    const [product] = useStorage("Product", "idea")
    const [project] = useStorage("Project", "")
    const slug = window.location.pathname.split('/')[2]

    return "jetbrains://" + product + "/"+ editor + "/open?project="+ project + "&slug=" + slug
}

const LeetcodeComItem = () => {

    const logo = GetLogo()
    const url = GetUrl()

    return (
            <Tooltip title={chrome.i18n.getMessage("open_ide")}>
                <Button type="text" href={ url } icon={ logo } target='_blank'/>
            </Tooltip>

    )
}

export default LeetcodeComItem