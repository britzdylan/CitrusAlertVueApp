import cryptojs from 'crypto-js'

export function useCrypto() {
  const encrypt = async (data: string, secret: string) => {
    return await cryptojs.AES.encrypt(data, secret).toString()
  }
  const decrypt = async (data: string, secret: string) => {
    return await cryptojs.AES.decrypt(data, secret).toString(cryptojs.enc.Utf8)
  }
  return { encrypt, decrypt }
}
