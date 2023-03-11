export const renderHTML = (html: string) => {
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}
