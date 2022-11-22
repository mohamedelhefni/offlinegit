export function mapLangExtension(ext: string): string {
    const supportedExtensions = new Map()
    supportedExtensions.set("rs", "rust")
    supportedExtensions.set("sh", "bash")
    supportedExtensions.set("h", "cpp")
    return supportedExtensions.has(ext) ? supportedExtensions.get(ext) : ext
}