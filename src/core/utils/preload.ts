/**
 * 从<script id="preload" type="application/json">中获取预加载数据。
 */
export function getInlineData(id = 'preload'): any {
    let el = document.getElementById(id);
    if (el && el.tagName.toUpperCase() === 'SCRIPT' && el.getAttribute('type') === 'application/json') {
        try {
            return JSON.parse(el.textContent);
        } catch (e) {
            console.error(`JSON parse error: ${el.textContent}`);
            return null;
        }
    } else {
        console.error(`Can not load data from element(id=${id})`);
    }
}
