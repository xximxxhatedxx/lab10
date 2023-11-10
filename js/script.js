document.body.style.margin = '0px';
document.body.style.height = '100vh';
document.body.style.backgroundColor = 'white';
document.body.style.display = 'flex';
document.body.style.flexDirection = 'column';
document.body.style.alignItems = 'center';
document.body.style.justifyContent = 'center';
 
let nameDiv = document.body.appendChild(document.createElement('div'));
nameDiv.style.fontSize = '2vmin';
 
let container = document.body.appendChild(document.createElement('div'));
container.style.height = '600px';
container.style.aspectRatio = '1/1';
container.style.maxHeight = '80%';
container.style.maxWidth = '95%'
container.style.display = 'flex';
container.style.alignItems = 'center';
container.style.justifyContent = 'space-between';
container.style.border = '1px black solid';
container.style.padding = '10px';
container.style.boxSizing = 'border-box';
 
for (let i = 0; i < 3; i++){
    let column = container.appendChild(document.createElement('div'));
    column.style.height = '100%';
    column.style.width = '30%';
    column.style.backgroundColor = '#e0e0e0';
    column.style.display = 'flex';
    column.style.flexDirection = 'column';
    column.style.padding = '10px';
    column.style.alignItems = 'center';
    column.style.justifyContent = 'space-between';
    column.style.boxSizing = 'border-box';
    for (let j = 0; j < 3; j++){
        let element = column.appendChild(document.createElement('div'));
        element.id = `slot${i*3 + j}`
        element.style.width = '100%';
        element.style.aspectRatio = '1/1';
        element.style.backgroundColor = '#8896d4';
        element.style.backgroundImage = `url(images/${Math.floor(Math.random() * 8 + 1)}.png)`;
        element.style.backgroundPosition = 'center';
        element.style.backgroundSize = 'cover';
    }
}
 
let generateContainer = document.body.appendChild(document.createElement('button'));
let generate = generateContainer.appendChild(document.createElement('div'));
let attempts = generateContainer.appendChild(document.createElement('div'));
 
generateContainer.style.height = '170px';
generateContainer.style.minHeight = '15%';
generateContainer.style.maxHeight = '20%';
generateContainer.style.maxWidth = '40%';
generateContainer.style.aspectRatio = '3/2';
generateContainer.style.backgroundColor = 'limegreen';
generateContainer.style.display = 'flex';
generateContainer.style.alignItems = 'center';
generateContainer.style.justifyContent = 'center';
generateContainer.style.flexDirection = 'column';
generateContainer.style.marginTop = '10px';
 
generate.innerText = "Generate";
generate.style.fontSize = '4vmin';
 
attempts.id = "attempts";
attempts.innerText = "You have 3 more attempts";
attempts.style.fontSize = '2vmin';
 
let attemptsCount = 3;
 
const nickname = prompt("Enter your name:", "Player") ?? "";
nameDiv.textContent = nickname.length > 0 ? nickname : "Player";
 
let numbers = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
];
 
const MySet = new Set([1,2,3,4,5,6,7,8]);
let available;
 
generateContainer.onclick = () => {
    generateContainer.disabled = true;
    for (let i = 0; i < 3; i++){
        available = new Set(MySet);
        for (let j = 0; j < 3; j++){
            numbers[i][j] = Array.from(available)[Math.floor(Math.random() * available.size)];
            available.delete(numbers[i][j]);
            document.getElementById(`slot${i*3+j}`).style.backgroundImage = `url("images/${numbers[i][j]}.png")`;
        }
    }

    document.getElementById("attempts").innerText = `You have ${--attemptsCount} more attempts`;
    let flag;
    
    setTimeout(() => {
        for (let i = 0; i < 3; i++){
            flag = true;
            for (let j = 1; j < 3; j++){
                if (numbers[j][i] == numbers[0][i]) continue;
                flag = false;
                break;
            }
            if (flag) {
                alert("You've won!");
                attemptsCount = 3;
                document.getElementById("attempts").innerText = `You have ${attemptsCount} more attempts`;
                generateContainer.disabled = false;
                return;
            }
        }
        if (attemptsCount < 1){
            alert("You've lost. Try again!");
            attemptsCount = 3;
            document.getElementById("attempts").innerText = `You have ${attemptsCount} more attempts`;
        }
        generateContainer.disabled = false;
    }, 500);
}