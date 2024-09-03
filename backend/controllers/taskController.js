// controllers/taskController.js
const db = require('../models');
const Tarea = db.Task;

// Crear una nueva tarea
const crearTarea = async (req, res) => {
  const { titulo, descripcion, fecha_vencimiento } = req.body;
  const usuario_id = req.user.id;

  try {
    const nuevaTarea = await Tarea.create({
      titulo,
      descripcion,
      fecha_vencimiento,
      usuario_id,
    });

    res.status(201).json(nuevaTarea);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear la tarea' });
  }
};

// Obtener todas las tareas del usuario
const obtenerTareas = async (req, res) => {
  const usuario_id = req.user.id;

  try {
    const tareas = await Tarea.findAll({ where: { usuario_id } });
    res.json(tareas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener las tareas' });
  }
};

// Actualizar una tarea
const actualizarTarea = async (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion, fecha_vencimiento, estado } = req.body;
  const usuario_id = req.user.id;

  try {
    const tarea = await Tarea.findOne({ where: { id, usuario_id } });
    if (!tarea) {
      return res.status(404).json({ mensaje: 'Tarea no encontrada' });
    }

    tarea.titulo = titulo !== undefined ? titulo : tarea.titulo;
    tarea.descripcion = descripcion !== undefined ? descripcion : tarea.descripcion;
    tarea.fecha_vencimiento = fecha_vencimiento !== undefined ? fecha_vencimiento : tarea.fecha_vencimiento;
    tarea.estado = estado !== undefined ? estado : tarea.estado;

    await tarea.save();

    res.json(tarea);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar la tarea' });
  }
};

// Eliminar una tarea
const eliminarTarea = async (req, res) => {
  const { id } = req.params;
  const usuario_id = req.user.id;

  try {
    const tarea = await Tarea.findOne({ where: { id, usuario_id } });
    if (!tarea) {
      return res.status(404).json({ mensaje: 'Tarea no encontrada' });
    }

    await tarea.destroy();

    res.json({ mensaje: 'Tarea eliminada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar la tarea' });
  }
};

module.exports = {
  crearTarea,
  obtenerTareas,
  actualizarTarea,
  eliminarTarea,
};
