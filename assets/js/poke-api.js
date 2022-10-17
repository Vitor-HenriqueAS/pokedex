
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
	const pokemon = new Pokemon()
	pokemon.number = pokeDetail.id
	pokemon.name = pokeDetail.name

	const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
	const [type] = types

	pokemon.type = type
	pokemon.types = types

	pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

	const baseStats = pokeDetail.stats.map((baseStatsSlot) => baseStatsSlot.base_stat)
	const abilities = pokeDetail.abilities.map((abilitiesSlot) => abilitiesSlot.ability.name)
	const moves = pokeDetail.moves.map((movesSlot) => movesSlot.move.name)

	pokemon.weight = pokeDetail.weight
	pokemon.height = pokeDetail.height

	pokemon.baseStats = baseStats
	pokemon.abilities = abilities
	pokemon.moves = moves

	return pokemon
}

pokeApi.getSpecificPokemonsDetail = (pokeID) => {
	return fetch(`https://pokeapi.co/api/v2/pokemon/${pokeID}/`)
					.then((response) => response.json())
					.then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemonsDetail = (pokemon) => {
	return fetch(pokemon.url)
					.then((response) => response.json())
					.then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 10) => {
	const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

	return fetch(url)
		.then((response) => response.json())
		.then((jsonBody) => jsonBody.results) //RETORNO DO PRIMEIRO THEN
		.then((pokemons) => pokemons.map(pokeApi.getPokemonsDetail))//assim por diante
		.then((detailRequests) => Promise.all(detailRequests))
		.then((pokemonsDetails) => pokemonsDetails)

		.catch((error) => console.log(error))
}
