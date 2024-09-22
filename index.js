function processInput() {
    const num1 = document.getElementById('number1').value;
    const num2 = document.getElementById('number2').value;
    const num3 = document.getElementById('number3').value;
    const num4 = document.getElementById('number4').value;

    const invalidMessage = document.getElementById('invalid');
    const outputElement = document.getElementById('output');
    const noValid = document.getElementById('noValid');

    noValid.innerHTML = ''; 
    invalidMessage.style.display = 'none'; 
    outputElement.innerHTML = '';

    if (num1 === '' || num2 === '' || num3 === '' || num4 === '') {
        invalidMessage.innerHTML = 'Please enter valid numbers.';
        invalidMessage.style.display = 'block'; 
        return; 
    }

    const parsedNum1 = parseFloat(num1);
    const parsedNum2 = parseFloat(num2);
    const parsedNum3 = parseFloat(num3);
    const parsedNum4 = parseFloat(num4);

    if (isNaN(parsedNum1) || isNaN(parsedNum2) || isNaN(parsedNum3) || isNaN(parsedNum4)) {
        invalidMessage.innerHTML = 'Please enter valid numbers.';
        invalidMessage.style.display = 'block'; 
        return; 
    }

    const numbers = [parsedNum1, parsedNum2, parsedNum3, parsedNum4];
    const validExpressions = generateExpressions(numbers);

    if (validExpressions.length > 0) {
        validExpressions.forEach(expr => {
            const p = document.createElement('p');
            p.textContent = expr;
            outputElement.appendChild(p);
        });
    } else {
        noValid.innerHTML = 'No valid expressions found';
    }
}



function generateExpressions(numbers) {
    const operators = ['+', '-', '*', '/'];
    const results = new Set();

    const permute = (arr) => {
        if (arr.length === 1) return [arr];
        let permutations = [];
        for (let i = 0; i < arr.length; i++) {
            const rest = arr.slice(0, i).concat(arr.slice(i + 1));
            const permutedRest = permute(rest);
            for (const perm of permutedRest) {
                permutations.push([arr[i], ...perm]);
            }
        }
        return permutations;
    };

    const evaluateExpression = (expr) => {
        try {
            return Function(`'use strict'; return (${expr})`)();
        } catch (e) {
            return null;
        }
    };

    const generateAllExpressions = (nums) => {
        let expressions = [];
        for (let op1 of operators) {
            for (let op2 of operators) {
                for (let op3 of operators) {
                    const exprs = [
                        `${nums[0]} ${op1} ${nums[1]} ${op2} ${nums[2]} ${op3} ${nums[3]}`,
                        `(${nums[0]} ${op1} ${nums[1]}) ${op2} (${nums[2]} ${op3} ${nums[3]})`,
                        `(${nums[0]} ${op1} ${nums[1]} ${op2} ${nums[2]}) ${op3} ${nums[3]}`,
                        `${nums[0]} ${op1} (${nums[1]} ${op2} ${nums[2]}) ${op3} ${nums[3]}`,
                        `${nums[0]} ${op1} (${nums[1]} ${op2} (${nums[2]} ${op3} ${nums[3]}))`
                    ];
                    expressions.push(...exprs);
                }
            }
        }
        return expressions;
    };

    const numbersPermutations = permute(numbers);
    for (const nums of numbersPermutations) {
        const expressions = generateAllExpressions(nums);
        for (const expr of expressions) {
            const result = evaluateExpression(expr);
            if (result === 20 && !expr.includes('/ 0')) {
                results.add(expr);
            }
        }
    }

    return Array.from(results);
}
