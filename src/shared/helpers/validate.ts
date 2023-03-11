export const isEmailValid = (email: string): boolean => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
}

export const isPhoneValid = (phone: string): boolean => {
  return /^[0-9\+\(\)\s\-]*$/.test(phone)
}
