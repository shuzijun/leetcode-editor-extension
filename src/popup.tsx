import { useEffect } from "react"
import "https://www.googletagmanager.com/gtag/js?id=$PLASMO_PUBLIC_GTAG_ID"

function IndexPopup() {

    useEffect(() => {
        window.dataLayer = window.dataLayer || []
        window.gtag = function gtag() {
            window.dataLayer.push(arguments) // eslint-disable-line
        }
        window.gtag("js", new Date())
        window.gtag("config", process.env.PLASMO_PUBLIC_GTAG_ID, {
            page_path: "/popup",
            debug_mode: true
        })
    }, [])

  return (
    <div
      style={{
        display: "flex",
        width: "200px"
      }}>
      <span>
          {chrome.i18n.getMessage("popup")}
      </span>
    </div>
  )
}

export default IndexPopup
