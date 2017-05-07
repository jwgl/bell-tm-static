/**
 * 从<script id="preload" type="application/json">中获取预加载数据。
 */
export function getInlineData(id = 'preload'): any {
    const el = document.getElementById(id);
    if (el && el.tagName.toUpperCase() === 'SCRIPT' && el.getAttribute('type') === 'application/json') {
        try {
            return JSON.parse(el.textContent);
        } catch (e) {
            throw Error(`JSON parse error: ${el.textContent}`);
        }
    } else {
        throw Error(`Can not load data from element(id=${id})`);
    }
}
