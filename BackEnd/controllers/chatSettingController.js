import ChatSettingModel from "../models/ChatSettingModel.js";

const getSettings = async (req, res) => {
  try {
    const settings = await ChatSettingModel.initializeSettings();
    res.status(200).json(settings);
  } catch (error) {
    console.error("Error fetching settings:", error);
    res.status(500).json({ error: "Failed to fetch chat settings" });
  }
};

const updateSettings = async (req, res) => {
  try {
    const settings = await ChatSettingModel.initializeSettings();
    const updates = req.body;

    const deepMerge = (target, source) => {
      for (let key in source) {
        if (
          source[key] &&
          typeof source[key] === "object" &&
          !Array.isArray(source[key])
        ) {
          target[key] = deepMerge({ ...target[key] }, source[key]);
        } else {
          target[key] = source[key];
        }
      }
      return target;
    };

    const mergedSettings = deepMerge(settings.toObject(), updates);
    await ChatSettingModel.updateOne({}, mergedSettings);
    const updatedSettings = await ChatSettingModel.findOne();

    res.status(200).json(updatedSettings);
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: "Failed to update settings" });
  }
};

export { getSettings, updateSettings };
