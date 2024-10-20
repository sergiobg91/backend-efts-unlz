import Unit from "../models/unitModel.js";

export const getUnits = async (req, res) => {

  try {

    const { moduleId, unitId } = req.query;
    const units = await Unit.find(unitId ? { moduleId, _id: unitId } : { moduleId });

    if (!units || units.length === 0)
      return res.status(404).json({message: "Unidades no encontradas para el modulo seleccionado"})

    return res.status(200).json({
      units
    })

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};