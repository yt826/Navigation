const $siteList = $('.siteList')
const $last = $('li.last')

const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject||   [ {
        logo: '<img src="./images/csdn.jpg" alt="">',
        logoType:'image',
        url: 'csdn.net',
    },
    {
        logo: '<img src="./images/bilibili.jpg" alt="">',
        logoType:'image',
        url:'bilibili.com'
    }
]
$siteList.find('li:not(.last)').remove()
const render = () => {
    hashMap.forEach(node => {
    const $li = $(`<li>
                <a href="https://www.bilibili.com/">
                <div class="site">
                    <div class="logo">${node.logo}</div>
                    <div class="link">${node.url}</div>
                </div></a>
            </li>`).insertBefore($last)
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
            logo: `${url[8]}`,
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