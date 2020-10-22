const $siteList = $('.siteList')
const $last = $('li.last')

const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject||[{
        logo: 'C',
        url: 'https://csdn.net',
    },
    {
        logo: 'B',
        url:'https://bilibili.com'
    }
]
const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
    .replace(/\/.*/,'')//删除/开头的结尾，直到结尾
}
const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node,index) => {
    const $li = $(`<li>
    
                <div class="site">
                    <div class="logo">${node.logo}</div>
                    <div class="link">${simplifyUrl(node.url)}</div>
                    <div class = "close">
                    <svg class = "icon" aria-hidden="true">
                        <use xlink:href="#icon-shanchu"></use>
                    </svg>
                    </div>
                </div>
            </li>`).insertBefore($last)
        $li.on('click', () => {
            window.open(node.url)
            console.log(node.url);
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation()
            hashMap.splice(index, 1)
            render()
        })
})
}
render()
$('.addButton')
    .on('click', () => {
        let url = window.prompt('请输入你要添加的网址')
        if (url.indexOf('http') !== 0){
           url = 'https://'+url
        }
        console.log(url);
        hashMap.push({
            logo: `${simplifyUrl(url)[0]}`,
            logoType:'text',
            url:`${url}`
        })
        $siteList.find('li:not(.last)').remove()
        render()

    })
window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x',string)
}
$(document).on('keypress', (e) => {
    const {key} = e
    for (let i = 0; i < hashMap.length; i++){
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
            
        }
    }
})