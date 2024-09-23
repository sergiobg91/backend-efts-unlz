import Material from "../models/materialModel.js";

// Obtener los materiales de una unidad especifica
export const getMaterialsByUnit = async (req, res) => {
  
  const { id_module, id_unit } = req.params;
  console.log(id_module);
  console.log(id_unit);

  try {
    // Buscar materiales basados en el moduleId y el unitId
    const materials = await Material.find({ moduleId: id_module, unitId: parseInt(id_unit) });

    if (!materials.length) {
      return res.status(404).json({ message: 'No materials found for this unit' });
    }

    return res.status(200).json(materials);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};