const pokemonList = document.getElementById('pokemonList')
const sideBarPokemon = document.getElementById('sideBarPokemon')
const loadMoreButton = document.getElementById('loadMoreButton')

const whichGeneration = document.getElementById('whichGeneration')
const generation = document.querySelector('input[name="generation"]:checked').value;
const generationClick = document.querySelectorAll('input[name="generation"]');

const limit = 10
let offset = 0;
let maxRecords = 151

generationClick[0].addEventListener('click', () => {
	pokemonList.innerHTML = ''
	maxRecords = 151
	offset = 0;
	whichGeneration.innerHTML = "Pokédex - Primeira Geração"

	loadPokemonItens(offset, limit)
})

generationClick[1].addEventListener('click', () => {
	pokemonList.innerHTML = ''
	maxRecords = 251
	offset = 151;
	whichGeneration.innerHTML = "Pokédex - Segunda Geração"

	loadPokemonItens(offset, limit)
})

generationClick[2].addEventListener('click', () => {
	pokemonList.innerHTML = ''
	maxRecords = 386
	offset = 251;
	whichGeneration.innerHTML = "Pokédex - Terceira Geração"

	loadPokemonItens(offset, limit)
})

generationClick[3].addEventListener('click', () => {
	pokemonList.innerHTML = ''
	maxRecords = 493
	offset = 386;
	whichGeneration.innerHTML = "Pokédex - Quarta Geração"

	loadPokemonItens(offset, limit)
})

generationClick[4].addEventListener('click', () => {
	pokemonList.innerHTML = ''
	maxRecords = 649
	offset = 493;
	whichGeneration.innerHTML = "Pokédex - Quinta Geração"

	loadPokemonItens(offset, limit)
})

generationClick[5].addEventListener('click', () => {
	pokemonList.innerHTML = ''
	maxRecords = 721
	offset = 649;
	whichGeneration.innerHTML = "Pokédex - Sexta Geração"

	loadPokemonItens(offset, limit)
})

generationClick[6].addEventListener('click', () => {
	pokemonList.innerHTML = ''
	const maxRecords = 809
	offset = 721;
	whichGeneration.innerHTML = "Pokédex - Sétima Geração"

	loadPokemonItens(offset, limit)
})

function loadPokemonItens(offset, limit) {

	pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
		const newHtml = pokemons.map((pokemon) => `
			<li id="${pokemon.number}" class="pokemon ${pokemon.type}" onclick="detailsPokemonSideBar(this.id)">
				<span class="number">#${pokemon.number}</span>
				<span class="name">${pokemon.name}</span>

				<div class="detail">
					<ol class="types">
						${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
					</ol>
					<img src="${pokemon.photo}"
						alt="${pokemon.name}">
				</div>
			</li>
		`).join('')

		pokemonList.innerHTML += newHtml

	})
}

loadPokemonItens(offset, limit)

function detailsPokemonSideBar(pokeID) {

	pokeApi.getSpecificPokemonsDetail(pokeID).then((pokemon = []) => {
		const newHtmlDetailPokemon = `
			<div class="side-bar-pokemon ${pokemon.type}">
				<div class="title">
					<div>
						<h1>${pokemon.name}</h1>
						<ol class="types">
							${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
						</ol>
					</div>
					<span>#${pokemon.number}</span>
				</div>

				<div class="img-pokemon">
					<img src="${pokemon.photo}"
					alt="${pokemon.name}">
				</div>

				<div class="detail-pokemon">
					<h3>Altura - ${pokemon.height / 10} M</h3>
					<h3>Peso - ${pokemon.weight / 10} KG</h3>

					<label for="abilities"><h3 class="titleLabel">Habilidades 	&darr;</h3></label>
					<input type="checkbox" id="abilities">
					<div class="abilities">
						${pokemon.abilities.map((abilitie) => `<span>${abilitie}</span>`).join(', ')}
					</div>

					<label for="moves"><h3 class="titleLabel">Movimentos 	&darr;</h3></label>
					<input type="checkbox" id="moves">
						<ol class="moves">
							${pokemon.moves.map((move) => `<li class="move">${move}</li>`).join('')}
						</ol>

					<label for="stats"><h3 class="titleLabel">Stats 	&darr;</h3></label>
					<input type="checkbox" id="stats">
						<div class="stats">
							<span>HP</span>
							<span>${pokemon.baseStats[0]}</span>
							<span>ATAQUE</span>
							<span>${pokemon.baseStats[1]}</span>
							<span>DEFESA</span>
							<span>${pokemon.baseStats[2]}</span>
							<span>ATAQUE ESPECIAL</span>
							<span>${pokemon.baseStats[3]}</span>
							<span>DEFESA ESPECIAL</span>
							<span>${pokemon.baseStats[4]}</span>
							<span>VELOCIDADE</span>
							<span>${pokemon.baseStats[5]}</span>
						</div>
				</div>
			</div>
		`
		sideBarPokemon.innerHTML = newHtmlDetailPokemon
	})
}

loadMoreButton.addEventListener('click', () => {
	offset += limit
	const qtdRecordNextPage = offset + limit

	if(qtdRecordNextPage >= maxRecords) {
		const newLimit = maxRecords - offset
		loadPokemonItens(offset, newLimit)

		loadMoreButton.parentElement.removeChild(loadMoreButton)
	} else {
		loadPokemonItens(offset, limit)
	}
})
