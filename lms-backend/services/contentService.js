const Content = require('../models/Content');

exports.deleteContent = async (contentId, session) => {
    try {
        const content = await Content.findById(contentId).session(session);
        if (!content) {
            throw new Error('Content not found');
        }
        await Content.deleteOne({ _id: contentId }).session(session);
        return content;
    } catch (err) {
        console.log('Error in content service', err);
        throw new Error('Error in content service');
    }
}