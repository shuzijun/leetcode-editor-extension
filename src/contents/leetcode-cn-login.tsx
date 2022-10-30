import type { PlasmoContentScript, PlasmoGetInlineAnchor } from "plasmo";
import { Button, Tooltip } from "antd";
import { useStorage } from "@plasmohq/storage/hook";
import { BaseUrl, Logo, Style } from "~tools";

export const config: PlasmoContentScript = {
  matches: ["https://leetcode.cn/*"]
};

export const getStyle = () => Style();

// Use this to optimize unmount lookups
export const getShadowHostId = () => "leetcode-editor-login-id";

export const getInlineAnchor: PlasmoGetInlineAnchor = () =>
  document.querySelector("a[href='/accounts/logout/']");


const LeetcodeCnLogin = () => {

  const [showIcon] = useStorage("ShowIcon", true);
  const logo = Logo(14);
  const url = BaseUrl("token");

  function click() {
    chrome.runtime.sendMessage("get-user-data", (response) => {
      window.open(url + response);
    });
  }

  return (
    <Tooltip title="IDE Login">
      <Button hidden={!showIcon} type="text" onClick={click} icon={logo} target="_blank"> Login </Button>
    </Tooltip>
  );
};

export default LeetcodeCnLogin;