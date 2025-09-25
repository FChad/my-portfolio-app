declare global {
  interface Window {
    turnstile: {
      render: (element: HTMLElement, options: any) => string
      reset: (widgetId: string) => void
      remove: (widgetId: string) => void
    }
    [key: `turnstileCallback_${string}`]: (token: string) => void
    [key: `turnstileExpired_${string}`]: () => void
    [key: `turnstileError_${string}`]: (error: string) => void
  }
}

export { }