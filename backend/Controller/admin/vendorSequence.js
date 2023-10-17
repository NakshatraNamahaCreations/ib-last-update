const vendorSequenceModel = require("../../Model/admin/vendorSequence");

class Sequence {
  async AddSequence(req, res) {
    const { vendorSequenceNumber } = req.body;
    try {
      const existingSequence = await vendorSequenceModel.findOne();
      if (existingSequence) {
        existingSequence.vendorSequenceNumber = vendorSequenceNumber;
        await existingSequence.save();
        return res.status(200).json({ success: "Code Updated" });
      } else {
        const newSequence = new vendorSequenceModel({
          vendorSequenceNumber,
        });
        await newSequence.save();
        return res.status(200).json({ success: "Code Added" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getSequence(req, res) {
    try {
      let sequenceCode = await vendorSequenceModel.find({});
      if (sequenceCode) {
        return res.json({ Sequence: sequenceCode });
      }
    } catch (err) {
      console.log(err);
    }
  }
}

const SequenceController = new Sequence();
module.exports = SequenceController;
