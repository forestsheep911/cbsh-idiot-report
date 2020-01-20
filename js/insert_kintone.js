let j = document.createElement('script')
j.src = chrome.extension.getURL('lib/jquery-3.4.1.min.js')
j.onload = function () {
    setTimeout(() => {
        this.parentNode.removeChild(this);
    }, 20000)
}

let s = document.createElement('script')
s.src = chrome.extension.getURL('js/inject_kintone.js')
s.onload = function () {
    setTimeout(() => {
        this.parentNode.removeChild(this);
    }, 20000)
};
(document.head || document.documentElement).appendChild(j);
(document.head || document.documentElement).appendChild(s)

if (!localStorage.report_info) {
    localStorage.report_info = JSON.stringify([{
            "label": "主要开发1天",
            "category": "项目常",
            "project": "kintone",
            "content": "编码",
            "hour": "8",
            "hoursc": "",
            "color": "SEAGREEN"
        },
        {
            "label": "周会",
            "category": "项目常",
            "project": "kintone",
            "content": "例会",
            "hour": "1",
            "hoursc": "",
            "color": "FUCHSIA"
        },
        {
            "label": "js学习",
            "category": "学习",
            "project": "js",
            "content": "学习",
            "hour": "",
            "hoursc": "",
            "color": "SIENNA"
        },
        {
            "label": "工数统计2h",
            "category": "管理",
            "project": "工数统计",
            "content": "工数统计",
            "hour": "2",
            "hoursc": "",
            "color": "DARKORANGE"
        },
        {
            "label": "参加生日会1小时",
            "category": "共通",
            "project": "生日会",
            "content": "生日会",
            "hour": "1",
            "hoursc": "",
            "color": "YELLOWGREEN"
        },
        {
            "label": "年假1天",
            "category": "休假",
            "project": "年假",
            "content": "年假",
            "hour": "8",
            "hoursc": "",
            "color": "MEDIUMTURQUOISE"
        },
        {
            "label": "病假半天",
            "category": "休假",
            "project": "病假",
            "content": "病假",
            "hour": "4",
            "hoursc": "",
            "color": "DARKGRAY"
        }
    ])
}