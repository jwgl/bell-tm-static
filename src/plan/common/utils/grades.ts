export function findGradeRange(departments: any[]): number[] {
    let max = 0;
    let min = 10e10;

    // 查找最小值和最大值
    departments.forEach((department: any) => {
        department.subjects.forEach((subject: any) => {
            let keys = Object.keys(subject.grades);
            for (let i = 0; i < keys.length; i++) {
                let grade = parseInt(keys[i], 10);
                if (grade > max) {
                    max = grade;
                } else if (grade < min) {
                    min = grade;
                }
            };
        });
    });

    // 生成数组
    let grades: number[] = [];
    for (let grade = min; grade <= max; grade++) {
        grades.push(grade);
    }

    return grades;
}
