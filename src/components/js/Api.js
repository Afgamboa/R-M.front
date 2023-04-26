
import axios from 'axios';

export const getCharacter = async () => {
    try {
        const response = await axios.get('https://rickandmortyapi.com/api/character/?page=26',
        {
          headers: {
            'Access-Control-Allow-Origin':'*',
          },
        });
        return response.data.results;

      } catch (error) {
        return console.log(error);
      }
}

export const addCharacterToFav = async (character) => {

    const userId = localStorage.getItem('userId');
    const characterId = character.id;
    await axios.post('http://localhost:8000/api/character/fav', {userId, characterId},
    {
      headers: {
        'Access-Control-Allow-Origin':'*',
      },
    })
    .then(response => {
      return response
    })
    .catch(error => {
      console.log(error);
    });

}