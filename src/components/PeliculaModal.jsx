import { useState, useEffect } from 'react';
import { crearPelicula, actualizarPelicula, calificarPelicula } from '../services/api';
import '../styles/PeliculaCard.css';

function PeliculaModal({ pelicula, onClose, onGuardar }) {
  const [formData, setFormData] = useState({
    peliculaNombre: '',
    peliculaAnio: new Date().getFullYear(),
    peliculaSinopsis: '',
    categoriaId: '1',
    calificacion: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (pelicula) {
      setFormData({
        peliculaNombre: pelicula.peliculaNombre,
        peliculaAnio: pelicula.peliculaAnio,
        peliculaSinopsis: pelicula.peliculaSinopsis,
        categoriaId: '1', 
        calificacion: '',
      });
    }
  }, [pelicula]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (pelicula) {
        await actualizarPelicula(pelicula.peliculaId, {
          peliculaNombre: formData.peliculaNombre,
          peliculaAnio: formData.peliculaAnio,
          peliculaSinopsis: formData.peliculaSinopsis,
          categoriaId: formData.categoriaId,
        });

        if (formData.calificacion) {
          await calificarPelicula(pelicula.peliculaId, formData.calificacion);
        }
        
        alert('Película actualizada exitosamente');
      } else {
        await crearPelicula(formData);
        alert('Película creada exitosamente');
      }
      onGuardar();
      onClose();
    } catch (error) {
      alert('Error: ' + (error.mensaje || 'Error desconocido'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{pelicula ? '✏️ Editar Película' : '➕ Nueva Película'}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Nombre de la Película *</label>
            <input
              type="text"
              name="peliculaNombre"
              value={formData.peliculaNombre}
              onChange={handleChange}
              required
              maxLength={200}
            />
          </div>

          <div className="form-group">
            <label>Año *</label>
            <input
              type="number"
              name="peliculaAnio"
              value={formData.peliculaAnio}
              onChange={handleChange}
              required
              min={1900}
              max={2100}
            />
          </div>

          <div className="form-group">
            <label>Categoría *</label>
            <select
              name="categoriaId"
              value={formData.categoriaId}
              onChange={handleChange}
              required
            >
              <option value="1">Ciencia Ficción</option>
              <option value="2">Comedia</option>
              <option value="3">Acción</option>
              <option value="4">Drama</option>
              <option value="5">Romance</option>
              <option value="6">Terror</option>
              <option value="7">Suspenso</option>
              <option value="8">Aventura</option>
              <option value="9">Animación</option>
              <option value="10">Documental</option>
              <option value="11">Fantasía</option>
              <option value="12">Crimen</option>
            </select>
          </div>

          <div className="form-group">
            <label>Sinopsis *</label>
            <textarea
              name="peliculaSinopsis"
              value={formData.peliculaSinopsis}
              onChange={handleChange}
              required
              maxLength={1000}
              rows={4}
            />
          </div>

          {pelicula && (
            <div className="form-group">
              <label>Calificación (1-5)</label>
              <input
                type="number"
                name="calificacion"
                value={formData.calificacion || ''}
                onChange={handleChange}
                min={1}
                max={5}
                step={1}
                placeholder="Deja tu calificación..."
              />
            </div>
          )}

          <div className="modal-actions">
            <button 
              type="button" 
              className="btn-cancelar" 
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="btn-guardar"
              disabled={loading}
            >
              {loading ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PeliculaModal;
