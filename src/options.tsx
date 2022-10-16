import {useStorage} from "@plasmohq/storage/hook"
import { useEffect } from "react"
import "https://www.googletagmanager.com/gtag/js?id=$PLASMO_PUBLIC_GTAG_ID"

import {Row, Col, Form, Input, Select, Tooltip} from 'antd';

const {Option} = Select;

import './index.less';
import { IntellijIdeaLogo, AppcodeLogo, ClionLogo, PycharmLogo, PhpstormLogo, RubymineLogo, WebstormLogo, RiderLogo, GolandLogo } from '@jetbrains/logos/react';


function IndexOptions() {

    useEffect(() => {
        window.dataLayer = window.dataLayer || []
        window.gtag = function gtag() {
            window.dataLayer.push(arguments) // eslint-disable-line
        }
        window.gtag("js", new Date())
        window.gtag("config", process.env.PLASMO_PUBLIC_GTAG_ID, {
            page_path: "/options",
            debug_mode: true
        })
    }, [])


    const [editor, setEditor] = useStorage("Editor", "leetcode-editor-pro")
    const [product, setProduct] = useStorage("Product", "idea")
    const [project, setProject] = useStorage("Project", "")
    return (
            <div>
                <Row>
                    <Col span={16} offset={4} >
                        <h2>
                            Leetcode Editor Extension
                        </h2>
                        <span>
                            {chrome.i18n.getMessage("options_desc")}
                        </span>
                        <h2/>
                        <Form
                        name="basic"
                        labelCol={{span: 4}}
                        wrapperCol={{span: 20}}
                        >
                        <Form.Item label="Editor"
                            tooltip={{ title: <div dangerouslySetInnerHTML= {{ __html: chrome.i18n.getMessage("options_editor_tip") }} ></div> }}
                            >
                            <Select value={editor} onChange={(value => {setEditor(value)})}>
                                <Option value="leetcode-editor-pro">Leetcode editor Pro</Option>
                                <Option value="leetcode-editor" disabled>
                                    <Tooltip title="敬请期待">Leetcode editor</Tooltip>
                                </Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Product"
                            tooltip= {{ title: chrome.i18n.getMessage("options_product_tip") }}
                            >
                            <Select value={product} onChange={(value => {setProduct(value)})}>
                                <Option value="idea"><IntellijIdeaLogo  height="16" width="16" style={{ paddingTop: 0.2+'em' }}/> Idea</Option>
                                <Option value="pycharm"><PycharmLogo  height="16" width="16" style={{ paddingTop: 0.2+'em' }}/> Pycharm</Option>
                                <Option value="clion"><ClionLogo  height="16" width="16" style={{ paddingTop: 0.2+'em' }}/> Clion</Option>
                                <Option value="goland"><GolandLogo  height="16" width="16" style={{ paddingTop: 0.2+'em' }}/> Goland</Option>
                                <Option value="phpstorm"><PhpstormLogo  height="16" width="16" style={{ paddingTop: 0.2+'em' }}/> Phpstorm</Option>
                                <Option value="webstorm"><WebstormLogo  height="16" width="16" style={{ paddingTop: 0.2+'em' }}/> Webstorm</Option>
                                <Option value="rider"><RiderLogo  height="16" width="16" style={{ paddingTop: 0.2+'em' }}/> Rider</Option>
                                <Option value="rubymine"><RubymineLogo  height="16" width="16" style={{ paddingTop: 0.2+'em' }}/> Rubymine</Option>
                                <Option value="appcode"><AppcodeLogo  height="16" width="16" style={{ paddingTop: 0.2+'em' }}/> Appcode</Option>
                            </Select>
                        </Form.Item>

                            <Form.Item label="Project" tooltip={{ title: chrome.i18n.getMessage("options_project_tip") }}>
                            <Input value={project} onChange={(e) => {
                                setProject(e.target.value)
                            }}/>
                        </Form.Item>

                        </Form>
                    </Col>
                </Row>

            </div>

    )
}

export default IndexOptions
