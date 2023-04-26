import React, { useEffect, useState } from "react";
import { getCharacter } from "./js/Api";
import Modal from "./Modal";
import "./css/Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [charactersPerPage, setCharactersPerPage] = useState(10);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const history = useNavigate();
  const username = localStorage.getItem("userName");
  const userId = localStorage.getItem("userId");
  console.log("first", username, userId)


  useEffect(() => {
    const fetchData = async () => {
      const response = await getCharacter();
      setCharacters(response);
    };
    fetchData();
  }, []);

  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;

  const currentCharacters =
    characters.length > 0
      ? characters.slice(indexOfFirstCharacter, indexOfLastCharacter)
      : [];
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(characters.length / charactersPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleCloseModal = () => {
    setShowDetails(false);
    setSelectedCharacter(null);
  };

  const handleShowDetails = (character) => {
    setSelectedCharacter(character);

    setShowDetails(true);
  };

  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <li
        key={number}
        className={`page-item ${currentPage === number ? "active" : ""}`}
      >
        <button onClick={() => setCurrentPage(number)} className="page-link">
          {number}
        </button>
      </li>
    );
  });

  const handleLogout = () => {
    localStorage.clear();
    history('/');
  };

  return (
    <div className="table-container">
      <div className="d-flex g-3">
        <h1 className="col-md-9">
          Hola bienvenido a Rick and Morty Api {username}
        </h1>
        <button onClick={() => handleLogout()} className="btn btn-danger">
          Cerrar sesion
        </button>
        <a href="/profile">
          <i class="bi bi-person-lines-fill"></i>
        </a>
      </div>
      <div className=" d-flex flex-row">
        <table class="table table-hover table-sm table-success table-striped">
          <tbody>
            {currentCharacters.map((character) => (
              <tr key={character.id}>
                <td>
                  <h5>{character.name}</h5>
                </td>
                <td>
                  <img src={character.image} width={60} alt={character.name} />
                </td>
                <td>
                  <button
                    onClick={() => handleShowDetails(character)}
                    data-bs-toggle="modal"
                    className="btn btn-link"
                  >
                    <i
                      className={`bi ${
                        showDetails && selectedCharacter.id === character.id
                          ? "bi-eye"
                          : "bi-eye-slash"
                      }`}
                    ></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showDetails && (
          <Modal
            character={selectedCharacter}
            handleCloseModal={handleCloseModal}
          />
        )}
      </div>
      <div className="d-flex justify-content-center mt-3">
        <ul className="pagination">{renderPageNumbers}</ul>
      </div>
    </div>
  );
};

export default Home;
