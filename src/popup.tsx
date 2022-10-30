import { useEffect } from "react";
import { useStorage } from "@plasmohq/storage/hook";

import { Switch, Row, Col, Form, Button, Tooltip, Alert } from "antd";
import { SettingOutlined, HeartFilled } from "@ant-design/icons";
import "./index.less";

import "https://www.googletagmanager.com/gtag/js?id=$PLASMO_PUBLIC_GTAG_ID";

function IndexPopup() {

  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments); // eslint-disable-line
    };
    window.gtag("js", new Date());
    window.gtag("config", process.env.PLASMO_PUBLIC_GTAG_ID, {
      page_path: "/popup",
      debug_mode: true
    });
  }, []);

  const [showIcon, setShowIcon] = useStorage("ShowIcon", true);
  const onChange = (checked: boolean) => {
    setShowIcon(checked);
  };

  return (
    <div style={{ width: "250px" }}>
      <Row>
        <Col span={22} offset={1}>
          <Form name="basic" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} layout="horizontal" >
            <Form.Item>
              <span>{chrome.i18n.getMessage("popup")} </span>
            </Form.Item>
            <Form.Item>
              <Row>
                <Col span={4} offset={1}>
                  <Tooltip title="Setting">
                    <Button type="primary" size="small" icon={<SettingOutlined />}
                            href="options.html" target="_banlk" />
                  </Tooltip>
                </Col>
                <Col span={4} offset={1}>
                  <Tooltip title="Donate">
                    <Button type="primary" size="small" icon={<HeartFilled />}
                            href="https://shuzijun.cn/donate/" target="_banlk" />
                  </Tooltip>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item>
              <Switch
                checkedChildren="Open Icon"
                unCheckedChildren="Close Icon"
                checked={showIcon}
                onClick={onChange}
              />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>

  );
}

export default IndexPopup;
