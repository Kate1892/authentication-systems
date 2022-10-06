export const getFormDataLS = () => {
  const data = localStorage.getItem('formsData')

  const LSdata = data
    ? JSON.parse(data)
    : {
        name: '',
        password: '',
        isVisible: false,
        number: '',
        isSave: '',
        avatar: '',
      }

  return {
    LSdata,
  }
}
