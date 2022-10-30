import type { PlasmoContentScript, PlasmoGetInlineAnchor } from "plasmo";
import { Button, Tooltip } from "antd";
import { BaseUrl, Logo, Style } from "~tools";
import { useStorage } from "@plasmohq/storage/hook";


export const config: PlasmoContentScript = {
  matches: ["https://leetcode.com/*"]
};

export const getStyle = () => Style();

// Use this to optimize unmount lookups
export const getShadowHostId = () => "leetcode-editor-login-id";

export const getInlineAnchor: PlasmoGetInlineAnchor = () =>
  document.querySelector(".user-menu__JejQ > li:last-child ");


const LeetcodeComLogin = () => {

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
export default LeetcodeComLogin;