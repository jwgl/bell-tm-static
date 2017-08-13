/**
 * condition: Function | {groupBy: string | Function, into: string, mappings: Map}
 */
export function groupBy(data: any, conditions: any[]) {
    if (conditions.length === 0) {
        return data;
    }

    const condition = conditions[0];
    if (typeof condition === 'function') {
        return condition(data);
    } else {
        const result: any[] = [];
        const groups: any = {};
        for (const row of data) {
            // groupBy 可以是属性名或映射函数
            const groupValue = typeof condition.groupBy === 'function' ? condition.groupBy(row) : row[condition.groupBy];
            let obj = groups[groupValue];
            // 创建分组
            if (obj === undefined) {
                obj = {};
                for (const k in condition.mappings) {
                    if (condition.mappings.hasOwnProperty(k)) {
                        obj[condition.mappings[k]] = row[k];
                    }
                }
                obj[condition.into] = [];
                result.push(obj);
                groups[groupValue] = obj;
            }

            const newRow: any = {};
            // 除去映射字段的新数据
            for (const p in row) {
                if (row.hasOwnProperty(p)) {
                    if (condition.mappings[p] === undefined) {
                        newRow[p] = row[p];
                    }
                }
            }
            obj[condition.into].push(newRow);
        }

        for (const group in groups) {
            if (groups.hasOwnProperty(group)) {
                groups[group][condition.into] = groupBy(groups[group][condition.into], conditions.slice(1));
            }
        }

        return result;
    }
}
