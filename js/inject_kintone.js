setTimeout(() => {
    fillTxtButton()
    buttonSetting()
}, 500);

function buttonSetting() {
    let appHeaderEles = document.getElementsByClassName("gaia-argoui-app-edit-breadcrumb")
    let appheaderEle = appHeaderEles[0]
    let saveButtons = document.getElementsByClassName("gaia-ui-actionmenu-save")
    let saveButton = saveButtons[0]
    let saveButtonClones = $(saveButton).clone()
    let saveButtonClone = saveButtonClones[0]
    saveButtonClone.style.backgroundColor = "GOLDENROD"
    saveButtonClone.innerText = "保存设定并更新按钮"
    let richText = document.createElement("textarea")
    richText.value = localStorage.report_info
    richText.style.width = "100%"
    richText.style.maxWidth = "100%"
    $(appheaderEle).after(richText)
    $(richText).after(saveButtonClone)
    console.log(saveButtonClone)
    $(saveButtonClone).click(function () {
        localStorage.report_info = richText.value
        fillTxtButton()
    })
}

function fillTxtButton() {
    let txTableEles = document.getElementsByClassName("subtable-gaia subtable-6080693 edit-subtable-gaia")
    let txTableEle = txTableEles[0]
    let buttonsContainerEle = document.getElementById("idiot-buttons")
    if (buttonsContainerEle) {
        $(buttonsContainerEle).empty()
    } else {
        buttonsContainerEle = document.createElement("div")
        buttonsContainerEle.id = "idiot-buttons"
    }
    $(txTableEle).before(buttonsContainerEle)
    let vaInit
    try {
        vaInit = JSON.parse(localStorage.report_info)
        let errorTxt = document.getElementById("idiot-json-error")
        if (errorTxt) {
            $(errorTxt).remove()
        }
    } catch (error) {
        addErrorText()
        return
    }
    for (let i = 0; i < vaInit.length; i++) {
        let fillTxtButton = document.createElement("button")
        fillTxtButton.innerText = vaInit[i].label
        fillTxtButton.setAttribute("arakajime", JSON.stringify(vaInit[i]))
        fillTxtButton.style.backgroundColor = vaInit[i].color
        fillTxtButton.setAttribute("class", "fill-button")
        /*jshint -W083 */
        $(fillTxtButton).click(function () {
            let getRec = kintone.app.record.get()
            let setting
            try {
                setting = JSON.parse(this.getAttribute("arakajime"))
            } catch (error) {
                return
            }
            let edittingRowLine = getRec.record.Table_0.value.length - 1
            console.log(getRec.record.Table_0)
            console.log(edittingRowLine)
            getRec.record.Table_0.value[edittingRowLine].value.文字列__1行_.value = setting.project
            getRec.record.Table_0.value[edittingRowLine].value.文字列__1行__0.value = setting.content
            getRec.record.Table_0.value[edittingRowLine].value.hour.value = setting.hour
            getRec.record.Table_0.value[edittingRowLine].value.ドロップダウン.value = setting.category
            kintone.app.record.set(getRec)
        })
        $(buttonsContainerEle).append(fillTxtButton)
    }
}

function addErrorText() {
    let errorTxt = document.getElementById("idiot-json-error")
    if (!errorTxt) {
        let appHeaderEles = document.getElementsByClassName("gaia-argoui-app-edit-breadcrumb")
        let appheaderEle = appHeaderEles[0]
        let errorTxt = document.createElement("div")
        errorTxt.id = "idiot-json-error"
        errorTxt.innerText = "设置格式有错误，请遵守json格式重新填写"
        errorTxt.style.backgroundColor = "MISTYROSE"
        errorTxt.style.color = "TOMATO"
        errorTxt.style.fontSize = "24px"
        $(appheaderEle).append(errorTxt)
    }
}