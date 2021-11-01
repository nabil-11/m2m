const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const CmdSchema = new mongoose.Schema(
    {
        FirstName: {
            type: String,
            required: true,
          },
          LastName: {
            type: String,
            required: true,
          }   ,
           EnterpriseId: {
            type: String,
            required: true,
        },
        UserId: {
          type: String,
          required: true,
      },
          cin: {
            type: String,
            required: true,
          },
          city: {
            type: String,
            required: true,
          },  state : {
            type: String,
            required: true,
          },   zip: {
            type: String,
            required: true,
          },
          number: {
            type: String,
            required: true,
          },
          IPC: {
            type: String,
            required: true,
          },
    pPrice: {
      type: Number,
      required: true,
    },
    pSold: {
      type: Number,
      default: 0,
    },
          etat: {
            type: String,
            required: true,
          }
        
        },

          { timestamps: true }

    );
    
const CmdModel = mongoose.model("command", CmdSchema);
module.exports = CmdModel;