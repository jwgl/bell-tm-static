import {Pipe} from '@angular/core';

@Pipe({name: 'markdown'})
export class MarkdownPipe {
    transform(text: any, args: any[]) {
        const md = (window as any).markdownit();
        if (text) {
            if (args[0] && args[0].inline) {
                return md.renderInline(text);
            } else {
                return md.render(text);
            }
        } else {
            return '';
        }
    }
}
