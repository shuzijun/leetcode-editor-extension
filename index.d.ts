declare namespace NodeJS {
    interface ProcessEnv {
        PLASMO_PUBLIC_GTAG_ID?: string
    }
}

interface Window {
    dataLayer: Array
    gtag: (a: string, b: any, c?: any) => void
}

interface Question {
    title:string
    slug:string
}

interface ReplayMessage {
    type:string
    url:string
    body:string
    requestId:string
    tabId:number
    retry?:number
    matching?(details: chrome.webRequest.WebRequestBodyDetails,body:string): ReplayMessage
    dispose?(callback: Function)
}

interface ReplayFetch{
    type:string
    method:string
    headers:HeadersInit
    dispose(callback: Function)
}