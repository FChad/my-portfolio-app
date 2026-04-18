export function useCopyToClipboard(timeout = 2000) {
    const copiedValue = ref<string | null>(null)

    const copy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text)
        } catch {
            const textArea = document.createElement('textarea')
            textArea.value = text
            textArea.style.cssText = 'position:fixed;left:-9999px;top:-9999px'
            document.body.appendChild(textArea)
            textArea.select()
            document.execCommand('copy')
            document.body.removeChild(textArea)
        }
        copiedValue.value = text
        setTimeout(() => copiedValue.value = null, timeout)
    }

    return { copiedValue, copy }
}
