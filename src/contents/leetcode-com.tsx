import type {PlasmoContentScript, PlasmoGetInlineAnchor} from "plasmo"
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

    return "jetbrains://" + product + "/" + editor + "/open?project=" + project + "&slug=" + slug
}

const LeetcodeComItem = () => {
    const [showIcon] = useStorage("ShowIcon", true)
    const logo = GetLogo()
    const url = GetUrl()

    function click() {
        window.open(url)
    }

    return (
        <Tooltip title={chrome.i18n.getMessage("open_ide")}>
            <Button hidden={!showIcon} type="text" onClick={click} icon={logo} target='_blank'
                    style={{paddingTop: 0.25 + 'em'}}/>
        </Tooltip>

    )
}

export default LeetcodeComItem