
const POP_SIZE = 100;
const MUTATION_RATE = 0.01;
let population = [];
let generation = 0;

function randomChar() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ ";
    return chars.charAt(Math.floor(Math.random() * chars.length));
}

function initPopulation() {
    for (let i = 0; i < POP_SIZE; i++) {
        let randomString = "";
        for (let j = 0; j < document.getElementById("target").value.length; j++) {
            randomString += randomChar();
        }
        population.push(randomString);
    }
}

function fitness(str) {
    const target = document.getElementById("target").value;
    let score = 0;
    for (let i = 0; i < str.length; i++) {
        if (str[i] === target[i]) {
            score++;
        }
    }
    return score / target.length;
}

function mutate(str) {
    let mutated = "";
    for (let char of str) {
        if (Math.random() < MUTATION_RATE) {
            mutated += randomChar();
        } else {
            mutated += char;
        }
    }
    return mutated;
}

function crossover(parent1, parent2) {
    const midpoint = Math.floor(parent1.length / 2);
    return parent1.substring(0, midpoint) + parent2.substring(midpoint);
}

function newGeneration() {
    const newPop = [];
    for (let i = 0; i < POP_SIZE; i++) {
        const parent1 = selectParent();
        const parent2 = selectParent();
        let child = crossover(parent1, parent2);
        child = mutate(child);
        newPop.push(child);
    }
    population = newPop;
    generation++;
}

function selectParent() {
    let totalFitness = population.reduce((total, str) => total + fitness(str), 0);
    let random = Math.random() * totalFitness;
    for (let str of population) {
        if (random < fitness(str)) {
            return str;
        }
        random -= fitness(str);
    }
    return population[0];
}

function startEvolution() {
    initPopulation();
    let maxGenerations = 1000;
    const interval = setInterval(() => {
        newGeneration();
        const best = population.sort((a, b) => fitness(b) - fitness(a))[0];
        document.getElementById("bestMatch").textContent = best;
        document.getElementById("generation").textContent = generation;
        if (best === document.getElementById("target").value || generation >= maxGenerations) {
            clearInterval(interval);
        }
    }, 50);
}

