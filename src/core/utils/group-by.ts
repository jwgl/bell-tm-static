/**
 * condition: Function | {groupBy: string | Function, into: string, mappings: Map}
 */
export function groupBy(data: any, conditions: any[]) {
    if (conditions.length === 0) {
        return data;
    }

    let condition = conditions[0];
    if (typeof condition === 'function') {
        return condition(data);
    } else {
        let result: any[] = [];
        let groups = {};
        for (let i = 0; i < data.length; i++) {
            let row = data[i];
            // groupBy 可以是属性名或映射函数
            let groupValue: any;
            if (typeof condition.groupBy === 'function') {
                groupValue = condition.groupBy(row);
            } else {
                groupValue = row[condition.groupBy];
            }

            let obj = groups[groupValue];
            // 创建分组
            if (obj === undefined) {
                obj = {};
                for (let k in condition.mappings) {
                    if (condition.mappings.hasOwnProperty(k)) {
                        obj[condition.mappings[k]] = row[k];
                    }
                }
                obj[condition.into] = [];
                result.push(obj);
                groups[groupValue] = obj;
            }

            let newRow = {};
            // 除去映射字段的新数据
            for (let p in row) {
                if (row.hasOwnProperty(p)) {
                    if (condition.mappings[p] === undefined) {
                        newRow[p] = row[p];
                    }
                }
            }
            obj[condition.into].push(newRow);
        }

        for (let group in groups) {
            if (groups.hasOwnProperty(group)) {
                groups[group][condition.into] = groupBy(groups[group][condition.into], conditions.slice(1));
            }
        }

        return result;
    }
}
