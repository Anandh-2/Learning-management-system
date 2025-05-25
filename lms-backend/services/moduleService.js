const Module = require('../models/Module');
const { deleteContent } = require('./contentService');

exports.deleteModule = async (moduleId, session) => {
    try {
        const module = await Module.findById(moduleId).session(session);
        if (!module) {
            throw new Error('Module not found');
        }
        for (const content of module.contents) {
            await deleteContent(content._id, session);
        }
        await Module.deleteOne({ _id: moduleId }).session(session);
        return module;
    } catch (err) {
        console.log('Error in module service', err);
        throw new Error('Error in module service');
    }
}
