const url = "https://pokeapi.co/api/v2/pokemon/";

const card = document.getElementById("card");
const btn = document.getElementById("btn");


let getPokeData = () => {
    const id = Math.floor(Math.random() * 500) + 1;    
    const finalUrl = url + id;

    fetch(finalUrl)
        .then((resp) => resp.json())
        .then(generateCard)
}

let generateCard = (data) => {
    const hp = data.stats[0].base_stat;
    const imgSrc = data.sprites.other.dream_world.front_default;
    const pokeName = data.name;
    const statAttack = data.stats[1].base_stat;
    const statDefense = data.stats[2].base_stat;
    const statSpeed = data.stats[5].base_stat;

    card.innerHTML = `
        <p class="hp">
        <span>HP</span>
            ${hp}
        </p>

        <img src=${imgSrc} alt="pokemon-image">
        <h2 class="poke-name">${pokeName}</h2>
        <div class="types">
        </div>
        <div class="stats">
            <div>
                <h3>${statAttack}</h3>
                <p>Attack</p>
            </div>
            <div>
                <h3>${statDefense}</h3>
                <p>Defense</p>
            </div>
            <div>
                <h3>${statSpeed}</h3>
                <p>Speed</p>
            </div>
        </div>
    `;

    appendType(data.types);
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    styledCard('#'+randomColor);
}

let appendType = (types) => {
    types.forEach(
        item => {
            const span = document.createElement("span");
            span.textContent = item.type.name;
            document.querySelector(".types").appendChild(span);
        }
    );
}

let styledCard = (color) => {
    console.log(color);
    card.style.background = `radial-gradient(
        circle at 50% 0%, ${color} 36%, #fff 36%
    )`;

    card.querySelectorAll(".types span").forEach(
        (typeColor) => {
            console.log(typeColor);
            typeColor.style.background = color;
        }
    );
}

btn.addEventListener("click", getPokeData);