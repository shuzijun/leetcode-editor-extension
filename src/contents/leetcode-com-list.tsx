import type {PlasmoContentScript} from "plasmo"
import {Button, Tooltip} from 'antd';
import cssText from "data-text:~/src/index.less"

import {useStorage} from "@plasmohq/storage/hook"

import GetLogo from "~logo"

export const config: PlasmoContentScript = {
    matches: ["https://leetcode.com/problemset/all/*"]
}

export const getStyle = () => {
    const style = document.createElement("style")
    style.textContent = cssText
    return style
}

export const getShadowHostId = () => "leetcode-editor-open-id"

export const getInlineAnchorList = () => document.querySelectorAll("div[role=rowgroup] > div > div:nth-child(1)")

const LeetcodeCnList = ({anchor}) => {
    const [showIcon] = useStorage("ShowIcon", true)
    const logo = GetLogo()
    const url = GetUrl()

    function click() {
        const slug = anchor.element.nextSibling.nextSibling.getElementsByTagName("a")[0].getAttribute("href").split('/')[2]
        window.open(url + slug)
    }

    return (
        <Tooltip title={chrome.i18n.getMessage("open_ide")}>
            <Button hidden={!showIcon} type="text" onClick={click} icon={logo} target='_blank'
                    style={{paddingTop: 0.5 + 'em'}}/>
        </Tooltip>

    )
}
const GetUrl = () => {
    const [editor] = useStorage("Editor", "leetcode-editor-pro")
    const [product] = useStorage("Product", "idea")
    const [project] = useStorage("Project", "")

    return "jetbrains://" + product + "/" + editor + "/open?project=" + project + "&slug="
}


export default LeetcodeCnList