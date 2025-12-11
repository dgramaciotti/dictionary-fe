const downloadJSON = (str: string) => {
    const blob = new Blob([str], {
        type: 'application/json',
    })

    const element = document.createElement('a')
    element.href = URL.createObjectURL(blob)
    element.download = 'export.json'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
}

export { downloadJSON }
