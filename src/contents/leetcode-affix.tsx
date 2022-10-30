import type { PlasmoContentScript, PlasmoGetInlineAnchor } from "plasmo";
import { Affix, Button, Drawer, List } from "antd";
import { BaseUrl, Icon as logoIcon, Style } from "~tools";
import Icon from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import {matchingDispose} from "~network";

export const config: PlasmoContentScript = {
  matches: ["https://leetcode.cn/*", "https://leetcode.com/*"],
  run_at: "document_end"
};

export const getStyle = () => {
  const style = Style(true);
  const myStyle = "#plasmo-shadow-container {position: absolute !important; top: 0px; right: 0px;}";
  style.textContent = style.textContent + myStyle;
  return style;
};

// Use this to optimize unmount lookups
export const getShadowHostId = () => "leetcode-editor-affix-id";

export const getInlineAnchor: PlasmoGetInlineAnchor = () =>
  document.querySelector("body");


const LeetcodeAffix = () => {
  const [questions, setQuestions] = useState<Question[]>([]);

  const addData = (item:Question[]) => {
    setQuestions([...questions, ...item]);
  };

  useEffect(() => {
    const cache = [];
    chrome.runtime.onMessage.addListener((message:ReplayMessage, sender, sendResponse) => {
      if (cache.some((value) => value === message.requestId)) {
        sendResponse({ status: "ok" });
        return true;
      }
      cache.push(message.requestId);
      console.log(cache);
      matchingDispose(message).dispose((questions:Question[]) => {addData(questions)});
      sendResponse({ status: "ok" });
      return true;
    });
  }, []);


  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    let container = getContainer();
    container.style.height = "300px";
    container.style.width = "150px";
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
    setTimeout(() => {
      let container = getContainer();
      container.style.height = "0px";
      container.style.width = "0px";
    }, 1000);

  };
  const getContainer = (): HTMLElement => {
    return document.querySelector("#" + getShadowHostId()).shadowRoot.querySelector("#plasmo-shadow-container").querySelector("#containerAffix");
  };

  const url = BaseUrl("slug");

  return (
    <>
      <Affix style={{ position: "absolute", top: 80, right: 0 }}>
        <Button type="link" style={{ width: 40, height: 40 }} onClick={showDrawer} hidden={open}
                icon={<Icon component={logoIcon} />} />

      </Affix>
      <Affix style={{ position: "absolute", top: 0, right: 0 }}>
        <div id="containerAffix"></div>
      </Affix>
      <Drawer title={ chrome.i18n.getMessage("affix_toolbox") } placement="right" destroyOnClose={true} onClose={onClose} open={open} width={150} height={200}
              getContainer={getContainer()}
              style={{ position: "absolute" }}>
        <List
          header={<div>Problem Set</div>}
          itemLayout="horizontal"
          dataSource={questions}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta title={<a href={url + item.slug} target="_blank">{item.title}</a>} />
            </List.Item>
          )}
        />
      </Drawer>
    </>
  );
};

export default LeetcodeAffix;