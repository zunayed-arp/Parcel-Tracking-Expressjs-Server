import express from "express"; 
import {saveUser,getAllUsers,update,deleteById} from "../services/userService"


const router = express.Router();

const getHandler = async (req, res) => {
  const users = await getAllUsers()
  res.status(200).send(users);
};

const postHandler = async (req, res) => {
  console.log(req.body)
  const body = req.body;
  const user = await saveUser(body)
  res.status(201).send(user._id);
}; 

const putHandler = async (req,res)=>{
  const body = req.body;
  const user = await update(body);
  res.status(200).send({"user":user.username,"id":user._id})
}


const deleteHandler = async (req,res)=>{

  /**
   * if result is an error, handle the error
   * else return success message
   */
  console.log(req.params.id)
  const id = req.params.id;
  const result = await deleteById(id);
  if (result instanceof Error){
    const code = result.getCode();
    res.status(code).send(result.message)
  }
  else{
    res.status(200).send("User deleted")
  }
  
}

router.get("/", getHandler);

router.post("/", postHandler);

router.put("/",putHandler);

router.delete("/:id",deleteHandler);

const configure = (app) => {
  app.use("/users", router);
};

export default configure;
