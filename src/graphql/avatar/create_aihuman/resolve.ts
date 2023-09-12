import brainModel from "../../../models/brain"
import mongoose from "mongoose"


export default {
  Query : {
    create_aihuman : async (_, args) => {

      const session = await mongoose.startSession()
      session.startTransaction();

      try {

        // const createBrain = new brainModel({
        //   firstName: "String",
        //   lastName : "String",
        //   age: 2999
        // })
        // await createBrain.save()

        await brainModel.findOneAndUpdate(
          {"name" : "test_0004"},
          {$set: {
            "status" : 11
          }},
          { returnDocument: 'after', returnOriginal: false }
        ).session(session);
// https://mongoosejs.com/docs/tutorials/findoneandupdate.html#upsert


        await session.commitTransaction();

        session.endSession();

        return `{id:1, title:'html', body:'html is ...'}`;


      } catch (e) {
        console.log("에러 발생",e)

        await session.abortTransaction();
        session.endSession();

        return "에러 발생" + e.message
      }
    }
  }
}