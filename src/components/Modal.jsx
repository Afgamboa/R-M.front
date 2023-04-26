import React, {useState} from "react";
import "./css/Modal.css";
import { addCharacterToFav } from "./js/Api";

const Modal = (props) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { character, handleCloseModal } = props;
  if (!character) {
    return null;
  }

  const handleAddToFavorite = (character) => {
    const res = addCharacterToFav(character);
    if(res) setIsFavorite(true)
  };

  return (
    <div class="card d-flex" role="dialog" id="exampleModal">
      <img
        src={character.image}
        alt={character.name}
        className="card-img-top"
      />
      <div className="card-content">
        <div className="card-body row g-2">
          <div className="col-md-10">
            <h5 className="name-character">
              {character.name}
              <i
                className={`bi bi-star${isFavorite ? '-fill' : ''}`}
                onClick={() => handleAddToFavorite(character)}
              ></i>
            </h5>
            <label>Estado : {character.status}</label>
            <label>Especie : {character.species}</label>
            <label>Origen : {character.origin.name}</label>
            <label>Genero : {character.gender}</label>
          </div>
        </div>
        <div className="d-flex close">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCloseModal}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
