import {
    IntellijIdeaLogo,
    AppcodeLogo,
    ClionLogo,
    PycharmLogo,
    PhpstormLogo,
    RubymineLogo,
    WebstormLogo,
    RiderLogo,
    GolandLogo
} from '@jetbrains/logos/react'

import {useStorage} from "@plasmohq/storage/hook"


const GetLogo = () => {
    const [product] = useStorage("Product", "idea")
    if (product == 'idea') {
        return <IntellijIdeaLogo height="20" width="20" style={{paddingTop: 0.2 + 'em'}}/>
    } else if (product == 'pycharm') {
        return <PycharmLogo height="20" width="20" style={{paddingTop: 0.2 + 'em'}}/>
    } else if (product == 'clion') {
        return <ClionLogo height="20" width="20" style={{paddingTop: 0.2 + 'em'}}/>
    } else if (product == 'goland') {
        return <GolandLogo height="20" width="20" style={{paddingTop: 0.2 + 'em'}}/>
    } else if (product == 'phpstorm') {
        return <PhpstormLogo height="20" width="20" style={{paddingTop: 0.2 + 'em'}}/>
    } else if (product == 'webstorm') {
        return <WebstormLogo height="20" width="20" style={{paddingTop: 0.2 + 'em'}}/>
    } else if (product == 'rider') {
        return <RiderLogo height="20" width="20" style={{paddingTop: 0.2 + 'em'}}/>
    } else if (product == 'rubymine') {
        return <RubymineLogo height="20" width="20" style={{paddingTop: 0.2 + 'em'}}/>
    } else if (product == 'appcode') {
        return <AppcodeLogo height="20" width="20" style={{paddingTop: 0.2 + 'em'}}/>
    }
    return <IntellijIdeaLogo height="20" width="20" style={{paddingTop: 0.2 + 'em'}}/>
}

export const GetLogoSize = (size) => {
    const [product] = useStorage("Product", "idea")
    if (product == 'idea') {
        return <IntellijIdeaLogo height={size} width={size}/>
    } else if (product == 'pycharm') {
        return <PycharmLogo height={size} width={size}/>
    } else if (product == 'clion') {
        return <ClionLogo height={size} width={size}/>
    } else if (product == 'goland') {
        return <GolandLogo height={size} width={size}/>
    } else if (product == 'phpstorm') {
        return <PhpstormLogo height={size} width={size}/>
    } else if (product == 'webstorm') {
        return <WebstormLogo height={size} width={size}/>
    } else if (product == 'rider') {
        return <RiderLogo height={size} width={size}/>
    } else if (product == 'rubymine') {
        return <RubymineLogo height={size} width={size}/>
    } else if (product == 'appcode') {
        return <AppcodeLogo height={size} width={size}/>
    }
    return <IntellijIdeaLogo height={size} width={size}/>
}

export default GetLogo