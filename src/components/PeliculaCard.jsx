import { useState } from 'react';
import { calificarPelicula } from '../services/api';
import '../styles/PeliculaCard.css';

function PeliculaCard({ pelicula, onEditar, onEliminar }) {
  const userRole = localStorage.getItem('userRole');

  return (
    <div className="pelicula-card">
      <div className="pelicula-header">
        <h3 className="pelicula-nombre">{pelicula.peliculaNombre}</h3>
        <span className="pelicula-anio">{pelicula.peliculaAnio}</span>
      </div>

      <div className="pelicula-info">
        <span className="pelicula-categoria">📁 {pelicula.categoriaNombre}</span>
        <div className="pelicula-rating-promedio">
          ⭐ {pelicula.peliculaRatingPromedio}
        </div>
      </div>

      <p className="pelicula-sinopsis">{pelicula.peliculaSinopsis}</p>

      {userRole === 'ROLE_ADMIN' && (
        <div className="pelicula-acciones">
          <button
            className="btn-editar"
            onClick={() => onEditar(pelicula)}
          >
            ✏️ Editar
          </button>
          <button
            className="btn-eliminar"
            onClick={() => onEliminar(pelicula.peliculaId)}
          >
            🗑️ Eliminar
          </button>
        </div>
      )}
    </div>
  );
}

export default PeliculaCard;