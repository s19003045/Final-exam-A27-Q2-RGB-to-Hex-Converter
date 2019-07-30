// ================1.變數宣告================

// 選取BASIC之r,g,b三個input及output
const basicRGBinput = document.querySelector('#basic-rgb-input')

const basicRedText = document.querySelector('.basic-red-text')
const basicRedValue = document.querySelector('.basic-red-value')
const basicGreenText = document.querySelector('.basic-green-text')
const basicGreenValue = document.querySelector('.basic-green-value')
const basicBlueText = document.querySelector('.basic-blue-text')
const basicBlueValue = document.querySelector('.basic-blue-value')

// 選取RGB SLIDER之r,g,b三個input及output
const advanceRGBinput = document.querySelector('#rgb-slider')

const advanceRedText = document.querySelector('.advance-red-text')
const advanceRedValue = document.querySelector('.advance-red-value')
const advanceGreenText = document.querySelector('.advance-green-text')
const advanceGreenValue = document.querySelector('.advance-green-value')
const advanceBlueText = document.querySelector('.advance-blue-text')
const advanceBlueValue = document.querySelector('.advance-blue-value')

// rgb的設定值，初始值為255，若有修改，此處會異動
const rgbSetting = {
  r: 0,
  g: 0,
  b: 0,
}
let hexValue = '#000000'
console.log(rgbSetting)


// 選取convert button
const basicConvert = document.querySelector('#basic-convert')
// 選取HEX value
const basicHexValue = document.querySelector('.basic-hex-value')
// 選取HEX output
const basicHexOutput = document.querySelector('.basic-hex-output')

// HEX output初始值為rgb(0,0,0)
basicHexOutput.style.backgroundColor = 'rgb(0,0,0)'


// ================2‧監聽及執行=================

// 將BASIC之r,g,b三者放在一起監聽, 隨時依使用者輸入變更各自色塊
basicRGBinput.addEventListener('keyup', function (event) {
  console.log(event.target)

  // 修改rgbSetting
  rgbSetting.r = Number(basicRedValue.value)
  rgbSetting.g = Number(basicGreenValue.value)
  rgbSetting.b = Number(basicBlueValue.value)

  // r,g,b三個參數,render至各自色塊
  rgbOutput(rgbSetting.r, rgbSetting.g, rgbSetting.b)

  // 將rgb轉換成HEX，並存至hexValue
  hexValue = rgbToHex(rgbSetting.r, rgbSetting.g, rgbSetting.b)

  // 使用hexValue ,render至畫面HEX色塊
  hexOutput(hexValue)

  // r,g,b三個參數,render至ADVANCE之各色塊
  advanceRgbOutput(rgbSetting.r, rgbSetting.g, rgbSetting.b)

  // 依rgbSetting,將數值輸出至ADVANCE之rgb slider
  settingToRGBslider(rgbSetting.r, rgbSetting.g, rgbSetting.b)
})

// 將ADVANCE之r,g,b三者放在一起監聽, 隨時依使用者輸入變更各自色塊
advanceRGBinput.addEventListener('change', function (event) {
  console.log(event.target)

  // 修改rgbSetting
  rgbSetting.r = Number(advanceRedValue.value)
  rgbSetting.g = Number(advanceGreenValue.value)
  rgbSetting.b = Number(advanceBlueValue.value)

  // r,g,b三個參數,render至ADVANCE之各色塊
  advanceRgbOutput(rgbSetting.r, rgbSetting.g, rgbSetting.b)

  // r,g,b三個參數,render至BASIC各色塊
  rgbOutput(rgbSetting.r, rgbSetting.g, rgbSetting.b)

  // 依rgbSetting,將數值輸出至rgb input
  settingToRGBinput(rgbSetting.r, rgbSetting.g, rgbSetting.b)

  // 將rgb轉換成HEX，並存至hexValue
  hexValue = rgbToHex(rgbSetting.r, rgbSetting.g, rgbSetting.b)

  // 使用hexValue ,render至畫面HEX色塊
  hexOutput(hexValue)
})

basicConvert.addEventListener('click', function (event) {

  // r,g,b三個參數,render至各自色塊
  rgbOutput(rgbSetting.r, rgbSetting.g, rgbSetting.b)

  // 將rgb轉換成HEX，並存至hexValue
  hexValue = rgbToHex(rgbSetting.r, rgbSetting.g, rgbSetting.b)

  // 使用hexValue ,render至畫面HEX色塊
  hexOutput(hexValue)

  // r,g,b三個參數,render至ADVANCE之各色塊
  advanceRgbOutput(rgbSetting.r, rgbSetting.g, rgbSetting.b)

  // 依rgbSetting,將數值輸出至ADVANCE之rgb slider
  settingToRGBslider(rgbSetting.r, rgbSetting.g, rgbSetting.b)
})

// 監聽HEX input
basicHexValue.addEventListener('keyup', function (event) {
  // 將使用者輸入存至hexValue變數
  hexValue = event.target.value

  // 修改HEX，自動轉成r,g,b，只接受6位數HEX碼。同時異動rgbSetting
  hexToRgb(hexValue)

  // 使用hexValue ,render至畫面HEX色塊
  hexOutput(hexValue)

  // rgbSetting的r,g,b輸出至r input, g input, b input
  basicRedValue.value = rgbSetting.r
  basicGreenValue.value = rgbSetting.g
  basicBlueValue.value = rgbSetting.b

  // r,g,b三個參數,render至各自色塊
  rgbOutput(rgbSetting.r, rgbSetting.g, rgbSetting.b)

  // r,g,b三個參數,render至ADVANCE之各色塊
  advanceRgbOutput(rgbSetting.r, rgbSetting.g, rgbSetting.b)

  // 依rgbSetting,將數值輸出至ADVANCE之rgb slider
  settingToRGBslider(rgbSetting.r, rgbSetting.g, rgbSetting.b)
})


// ================3.函式宣告================

// 依rgbSetting,將數值輸出至BASIC之rgb input
function settingToRGBinput(r, g, b) {
  basicRedValue.value = Number(r)
  basicGreenValue.value = Number(g)
  basicBlueValue.value = Number(b)
}

// 依rgbSetting,將數值輸出至ADVANCE之rgb slider
function settingToRGBslider(r, g, b) {
  advanceRedValue.value = Number(r)
  advanceGreenValue.value = Number(g)
  advanceBlueValue.value = Number(b)
}


// r,g,b三個參數,render至各自色塊
// r,g,b需先預處理(轉成number)，再傳進function
function advanceRgbOutput(r, g, b) {
  // 變更紅色色塊及其數字
  advanceRedText.style.backgroundColor = `rgb(${Number(r)},0,0)`
  advanceRedText.textContent = Number(r)

  // 變更綠色色塊及其數字
  advanceGreenText.style.backgroundColor = `rgb(0,${Number(g)},0)`
  advanceGreenText.textContent = Number(g)

  // 變更藍色色塊及其數字
  advanceBlueText.style.backgroundColor = `rgb(0,0,${Number(b)})`
  advanceBlueText.textContent = Number(b)
}

// r,g,b三個參數,render至BASIC各色塊
// r,g,b需先預處理(轉成number)，再傳進function
function rgbOutput(r, g, b) {
  // 變更紅色色塊
  basicRedText.style.backgroundColor = `rgb(${Number(r)},0,0)`

  // 變更綠色色塊
  basicGreenText.style.backgroundColor = `rgb(0,${Number(g)},0)`

  // 變更藍色色塊
  basicBlueText.style.backgroundColor = `rgb(0,0,${Number(b)})`
}

// 將r,g,b三個參數傳入自動算出HEX
function rgbToHex(r, g, b) {
  return `#${hexColour(r)}${hexColour(g)}${hexColour(b)}`
}

// 輸入HEX參數，render至畫面HEX色塊
function hexOutput(hexValue) {
  console.log(hexValue)
  basicHexValue.value = hexValue
  basicHexOutput.style.backgroundColor = hexValue
}

// 修改HEX，自動轉成r,g,b，只接受6位數HEX碼
function hexToRgb(hexValue) {

  if (hexValue.length === 7) {
    let partI = hexValue.slice(1, 3)
    let partII = hexValue.slice(3, 5)
    let partIII = hexValue.slice(5, 7)

    rgbSetting.r = parseInt(partI, 16)
    rgbSetting.g = parseInt(partII, 16)
    rgbSetting.b = parseInt(partIII, 16)
    console.log(rgbSetting)
  }
}


// 處理rgb輸入值轉換成16進位，允許輸入範圍0~255。
// 大於255，則視為255；小於0，則視為0；
// 其餘則回傳'00'
function hexColour(value) {
  if (value <= 255 && value >= 0) {
    let returnValue = Math.floor(value).toString(16)
    // return returnValue
    if (returnValue.length === 1) {
      return `0${returnValue}`
    } else {
      return returnValue
    }
  } else if (value > 255) {
    return 'ff'
  } else if (value < 0) {
    return '00'
  } else {
    return '00'
  }
}


