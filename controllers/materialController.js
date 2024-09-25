import Material from "../models/materialModel.js";

// Obtener los materiales de una unidad especifica
export const getMaterialsByUnit = async (req, res) => {
  
  const { id_module, id_unit } = req.params;

  try {
    // Buscar materiales basados en el moduleId y el unitId
    const materials = await Material.find({ moduleNumber: parseInt(id_module), unitNumber: parseInt(id_unit) });

    if (!materials.length) {
      return res.status(404).json({ message: 'No se encontro material para la unidad seleccionada' });
    }

    return res.status(200).json(materials);

  } catch (error) {
    return res.status(500).json({ message: 'Error en servidor: ', error });
  }
};