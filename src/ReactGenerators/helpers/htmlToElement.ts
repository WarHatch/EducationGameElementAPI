export default (html: string): ChildNode => {
  const template = document.createElement("template");
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  // @ts-ignore assume always exists
  return template.content.firstChild;
}