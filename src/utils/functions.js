const getInputNumbers = input => {
  return input.value.replace(/\D/g, '')
}

export const onChangePN = e => {
  let input = e.currentTarget
  let numbers = getInputNumbers(input)
  let formattedNumber = ''
  let selectionStart = input.selectionStart

  if (!numbers) {
    return (input.value = '')
  }

  if (input.value.length != selectionStart) {
    if (e.nativeEvent.data && /\D/g.test(e.nativeEvent.data)) {
      input.value = numbers
    }
    return input.value
  }

  if (['7', '8', '9'].indexOf(numbers[0]) > -1) {
    if (numbers[0] == '9') numbers = '7' + numbers
    let firstSymbols = numbers[0] == '8' ? '8' : '+7'
    formattedNumber = firstSymbols + ' '
    if (numbers.length > 1) {
      formattedNumber += '(' + numbers.substring(1, 4)
    }
    if (numbers.length >= 5) {
      formattedNumber += ') ' + numbers.substring(4, 7)
    }
    if (numbers.length >= 8) {
      formattedNumber += '-' + numbers.substring(7, 9)
    }
    if (numbers.length >= 10) {
      formattedNumber += '-' + numbers.substring(9, 11)
    }
  } else {
    formattedNumber = '+' + numbers.substring(0, 16)
  }
  input.value = formattedNumber
  return input.value
}

export const onKeyDownPN = e => {
  const element = e.target
  let inputValue = element.value.replace(/\D/g, '')

  if (e.keyCode === 8 && getInputNumbers(element).length == 1) {
    element.value = ''
  } else if ([8, 46].indexOf(e.keyCode) > -1 && inputValue.length > 1) {
    let symToClear = ''
    switch (e.keyCode) {
      case 8: // BackSpace key
        if (element.selectionStart) {
          symToClear = element.value[element.selectionStart - 1]
        }
        break
      case 46: // Delete key
        if (element.selectionStart) {
          symToClear = element.value[element.selectionStart]
        }
        break
    }
    if (symToClear && /\D/.test(symToClear)) e.preventDefault()
  }
  return element.value
}

export const onPastePN = e => {
  const element = e.target

  let pasted = e?.nativeEvent?.clipboardData?.getData('Text')

  let numbers = getInputNumbers(e.target)

  if (pasted) {
    if (/\D/g.test(pasted)) {
      element.value = numbers
      return element.value
    }
  }
  return element.value
}
