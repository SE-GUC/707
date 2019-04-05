const axios = require("axios");
const functions = {
  //Partners testing

  //creating partner redirecting routes

  createPartner: async (partner) => {
    const response = await axios.post(
      "http://localhost:5000/api/partners/register",partner
    );
    return response ;
  },

  //getting partner redirecting routes

  getPartner: async (id) => {
    const partner = await axios.get(
      "http://localhost:5000/api/partners/"+id
    );
    return partner;
  },
    //getting all partners redirecting routes

  getPartners: async () => {
    const partners = await axios.get(
      "http://localhost:5000/api/partners"
    );
    return partners;
  },
    //update partner redirecting routes

  updatePartner: async(id,updatedata)=>{
    const partner = await axios.put(
      "http://localhost:5000/api/partners/"+id,updatedata
    );
      return partner;
  },
    //delete partner redirecting routes

  deletePartner : async(id)=>{
    const partner = await axios.delete(
      "http://localhost:5000/api/partners/"+id
      );
      return partner;
  },


//partner posting conversation
postPartnerConversation: async(conversation,id)=> {
  const response = await axios.post(
    "http://localhost:5000/api/partners/conversation/"+id,conversation
  );
  return response;
},

//partners getting his conversation
getPartnerConversation: async(id)=>{
  const conv=await axios.get(
    "http://localhost:5000/api/partners/conversation/"+id
  );
  return conv;
},

//get conversation by stating reciever email
getPartnerConversationbyemail: async (id,email) => {
  const response = await axios.get(
    "http://localhost:5000/api/partners/conversation/"+id+"/"+email
  );
  return response ;
  },
//delete email in conversation
deletePartnerConversation: async(id,email)=> {
  const response = await axios.delete(
    "http://localhost:5000/api/partners/conversation/"+id+"/"+email
  );
  return response;
},



//create email for conversation for partner
  postPartneremailConversation: async (conversationemail,id) => {
    const response = await axios.post(
      "http://localhost:5000/api/partners/conversation/email/"+id,conversationemail
    );
    return response ;
    },

  //create project by description and consultancy requirement
  createProject: async (id,project)=> {
    const createdproject= await axios.post(
        "http://localhost:5000/api/partners/project/"+id,project
    );
    return createdproject;
    },

    //getting all my project names

  getmyProjects: async (id) => {
    var names = await axios.get(
      "http://localhost:5000/api/partners/projects/"+id
    );
    return names;
  },

  //selecting project by id
  getProjectbyId: async (id) => {
    const project = await axios.get(
      "http://localhost:5000/api/partners/project/select/"+id
    );
    return project;
  },

  //update project by id
  updateProjectbyId: async (id,body) =>{
    const project = await axios.put(
      "http://localhost:5000/api/partners/project/"+id,body
    );
    return project;
  },

  //delete project by id
  deleteProjectbyId: async (id,projectId) =>{
    const deletedproject = await axios.delete(
      "http://localhost:5000/api/partners/project/"+id+"/"+projectId
    );
    return deletedproject;
   }








};



module.exports = functions;
