import {Pipe} from '@angular/core';

@Pipe({name: 'markdown'})
export class MarkdownPipe {
    transform(text: any, args: any[]) {
        let md = (<any>window).markdownit();
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
