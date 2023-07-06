export type toastType = 'success' | 'error' | 'warning' | 'info'

export function useToast() {
  const getToastColorClass = (type?: toastType) => {
    switch (type) {
      case 'success':
        return 'toast-green'
      case 'error':
        return 'toast-red'
      case 'warning':
        return 'toast-yellow'
      case 'info':
        return 'toast-blue'
      default:
        return 'toast-blue'
    }
  }

  const alert = (text: string, type?: toastType, dismiss?: boolean) => {
    const toast = document.getElementById('toast')
    const toastText = document.getElementById('toast-text')
    const toastIcon = document.getElementById('toast-dismiss')
    if (!toast || !toastText || !toastIcon) return
    toast.classList.add(getToastColorClass(type))
    toastText.innerText = text
    toast.dataset.show = 'true'

    if (dismiss) {
      toastIcon.classList.remove('hidden')
      toastIcon.addEventListener('click', () => {
        toast.dataset.show = 'false'
      })
    }

    if (!dismiss) {
      setTimeout(() => {
        toast.dataset.show = 'false'
      }, 3000)
    }
  }
  return { alert }
}
