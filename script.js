const button = document.getElementById("check-properties");

button.addEventListener("click", function () {
    // Get the input value correctly
    const input = document.getElementById("relation").value;
    // Parse the relation
    const relation = parseRelation(input);
    // Get elements from the relation
    const elements = getElements(relation);

    // Check properties
    const reflexive = checkReflexive(elements, relation);
    const symmetric = checkSymmetric(relation);
    const transitive = checkTransitive(relation);

    // Display results
    displayResults(reflexive, symmetric, transitive, relation, elements);

    console.log(relation);

    console.log(elements);

});

document.getElementById('clear-input').addEventListener('click', function() {
    document.querySelector('input').value = '';
});

function parseRelation(input){

    const regex = /\((\d+),\s*(\d+)\)/g;

    let match;

    const relation = [];

    while((match = regex.exec(input)) !== null){

        relation.push([
            Number(match[1]),
            Number(match[2])
        ]);

    }

    return relation;

}

function getElements(relation){

    const elements = new Set();

    relation.forEach(pair=>{

        elements.add(pair[0]);
        elements.add(pair[1]);

    });

    return [...elements];

}

function checkReflexive(elements, relation) {
    // Convert relation pairs to strings for easier comparison
    const relationStrings = relation.map(pair => `(${pair[0]},${pair[1]})`);

    for (let element of elements) {

        let pair = `(${element},${element})`;

        if (!relationStrings.includes(pair)) {
            return false;
        }
    }

    return true;
}

function checkSymmetric(relation) {
    // Convert to string format for easy comparison
    const relationStrings = relation.map(pair => `(${pair[0]},${pair[1]})`);
    
    for (let [a, b] of relation) {
        let reversePair = `(${b},${a})`;
        if (!relationStrings.includes(reversePair)) {
            return false;
        }
    }
    return true;
}

function checkTransitive(relation) {
    // Convert to string format for easy comparison
    const relationStrings = relation.map(pair => `(${pair[0]},${pair[1]})`);
    
    for (let [a, b] of relation) {
        for (let [c, d] of relation) {
            if (b === c) {
                let pair = `(${a},${d})`;
                if (!relationStrings.includes(pair)) {
                    return false;
                }
            }
        }
    }
    return true;
}

function displayResults(reflexive, symmetric, transitive, relation, elements) {
    // Display properties
    document.getElementById("reflexive").innerHTML = 
        `<strong>Reflexive:</strong> ${reflexive ? "YES ✅" : "NO ❌"}`;
    
    document.getElementById("symmetric").innerHTML = 
        `<strong>Symmetric:</strong> ${symmetric ? "YES ✅" : "NO ❌"}`;
    
    document.getElementById("transitive").innerHTML = 
        `<strong>Transitive:</strong> ${transitive ? "YES ✅" : "NO ❌"}`;
    
    // Display closures
    const reflexiveClosure = getReflexiveClosure(elements, relation);
    const symmetricClosure = getSymmetricClosure(relation);
    const transitiveClosure = getTransitiveClosure(relation);
    
    document.getElementById("reflexive-closure").innerHTML = 
        formatClosure(reflexiveClosure);
    
    document.getElementById("symmetric-closure").innerHTML = 
        formatClosure(symmetricClosure);
    
    document.getElementById("transitive-closure").innerHTML = 
        formatClosure(transitiveClosure);
}

function getReflexiveClosure(elements, relation) {
    const closure = [...relation];
    const relationStrings = closure.map(pair => `(${pair[0]},${pair[1]})`);
    
    for (let element of elements) {
        let pair = `(${element},${element})`;
        if (!relationStrings.includes(pair)) {
            closure.push([element, element]);
        }
    }
    
    return closure;
}

function getSymmetricClosure(relation) {
    const closure = [...relation];
    const relationStrings = closure.map(pair => `(${pair[0]},${pair[1]})`);
    
    for (let [a, b] of relation) {
        let reversePair = `(${b},${a})`;
        if (!relationStrings.includes(reversePair)) {
            closure.push([b, a]);
        }
    }
    
    return closure;
}

function getTransitiveClosure(relation) {
    const closure = [...relation];
    let added = true;
    
    while (added) {
        added = false;
        const closureStrings = closure.map(pair => `(${pair[0]},${pair[1]})`);
        
        for (let [a, b] of closure) {
            for (let [c, d] of closure) {
                if (b === c) {
                    let pair = `(${a},${d})`;
                    if (!closureStrings.includes(pair)) {
                        closure.push([a, d]);
                        added = true;
                    }
                }
            }
        }
    }
    
    return closure;
}

function formatClosure(closure) {
    if (closure.length === 0) {
        return "∅ (Empty set)";
    }
    return closure.map(pair => `(${pair[0]},${pair[1]})`).join(", ");
}

