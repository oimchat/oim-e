export default class WebElementBuilder {
    public static createImageHtml(url: string, title: string, alt: string, style: string): string {
        const html = '<img src="' + url +
            '" title="' + title +
            '" style="' + style +
            '" alt="' + alt + '"/>';
        return html;
    }
}
