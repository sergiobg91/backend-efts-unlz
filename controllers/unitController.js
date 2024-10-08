import Unit from "../models/unitModel.js";

export const getUnits = async (req, res) => {

  try {

    // const moduleNumber = parseInt(req.params.id); 
    const units = await Unit.find({ moduleNumber: parseInt(req.params.id) });

    if (!units || units.length === 0)
      return res.status(404).json({message: "Unidades no encontradas para el modulo seleccionado"})

    return res.status(200).json({
      units
    })

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


export const getUnit = async (req, res) => {

  try {

    const unit = await Unit.find({ icon: req.params.id });

    if (!unit)
      return res.status(404).json({message: "ID de unidad no encontrado para el modulo"})

    return res.status(200).json(unit)

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};