export function findGradeRange(departments: any[]): number[] {
    let max = 0;
    let min = 10e10;

    // 查找最小值和最大值
    departments.forEach((department: any) => {
        department.subjects.forEach((subject: any) => {
            const keys = Object.keys(subject.grades);
            keys.forEach(key => {
                const grade = parseInt(key, 10);
                if (grade > max) {
                    max = grade;
                } else if (grade < min) {
                    min = grade;
                }
            });
        });
    });

    // 生成数组
    const grades: number[] = [];
    for (let grade = min; grade <= max; grade++) {
        grades.push(grade);
    }

    return grades;
}
