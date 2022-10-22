import type {PlasmoContentScript} from "plasmo"
import {useStorage} from "@plasmohq/storage/hook"
import React from "react"
import {createRoot} from "react-dom/client"

import {Button} from 'antd';
import {GetLogoSize} from "~logo"

export const config: PlasmoContentScript = {
    matches: ["https://codetop.cc/home*"]
}

export const getRootContainer = () =>
    new Promise((resolve) => {
        const checkInterval = setInterval(() => {
            const rootContainer = document.querySelector(".el-table__body-wrapper > .el-table__body > tbody")
            if (rootContainer) {
                clearInterval(checkInterval)
                resolve(rootContainer)
            }
        }, 137)
    })

const CodeTopCCList = ({sulg}) => {

    const [showIcon] = useStorage("ShowIcon", true)
    const logo = GetLogoSize(14)
    const url = GetUrl() + sulg

    return (<Button hidden={!showIcon} type="text" href={url} icon={logo} target='_blank'/>)
}

export const render = async ({createRootContainer}) => {

    const rootContainer = await createRootContainer()

    const els = rootContainer.querySelectorAll("tr > td:nth-child(1) > div")
    for (let i = 0; i < els.length; i++) {
        const d = document.createElement("div")
        d.style = "display: inline;padding-right:10px"
        els[i].insertBefore(d, els[i].lastChild)
        const root = createRoot(d)
        let sulg = els[i].getElementsByTagName("a")[0].getAttribute("href").split('/')[4]
        root.render(<CodeTopCCList sulg={sulg}/>);
    }
}


const GetUrl = () => {
    const [editor] = useStorage("Editor", "leetcode-editor-pro")
    const [product] = useStorage("Product", "idea")
    const [project] = useStorage("Project", "")

    return "jetbrains://" + product + "/" + editor + "/open?project=" + project + "&slug="
}

export default CodeTopCCList