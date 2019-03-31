const axios = require("axios");

const functions = { 
    login: async (user) => {
        const token = await axios.post(
          "http://localhost:5000/api/login" , user
        );
        return token;
      },

    logout: async(token)=> {
        const loggedOutUser = await axios.get( 
            "http://localhost:5000/api/logout", { headers: { Authorization: token } });
        return loggedOutUser ;
    },

      //Partners testing
    
      //creating partner redirecting routes
    
      createPartner: async (partner) => {
        const response = await axios.post(
          "http://localhost:5000/api/partners/register",partner
        );
        return response ;
      },
    
      //getting partner redirecting routes
    
      getPartner: async (token) => {
        const partner = await axios.get(
          "http://localhost:5000/api/partners/profile",{ headers: { Authorization: token } }
        );
        return partner;
      },
        //getting all partners redirecting routes
    
    //   getPartners: async () => {
    //     const partners = await axios.get(
    //       "http://localhost:5000/api/partners"
    //     );
    //     return partners;
    //   },
        //update partner redirecting routes
    
      updatePartner: async(token,updatedata)=>{
        const partner = await axios.put(
          "http://localhost:5000/api/partners/updateProfile",{ headers: { Authorization: token } },updatedata
        );
          return partner;
      },
        //delete partner redirecting routes
    
      deletePartner : async(token)=>{
        const partner = await axios.delete(
          "http://localhost:5000/api/partners/",{ headers: { Authorization: token } }
          );
          return partner;
      },
    
    
    //partner posting conversation
    postPartnerConversation: async(token,conversation)=> {
      const response = await axios.post(
        "http://localhost:5000/api/partners/conversations/start",{ headers: { Authorization: token } },conversation
      );
      return response;
    },
    
    //partners getting his conversation
    getPartnerConversation: async(token)=>{
      const conv=await axios.get(
        "http://localhost:5000/api/partners/conversations/get",{ headers: { Authorization: token } }
      );
      return conv;
    },
    
    //get conversation by stating reciever email
    getPartnerConversationbyemail: async (token,email) => {
      const response = await axios.get(
        "http://localhost:5000/api/partners/conversations/get/"+email,{ headers: { Authorization: token } }
      );
      return response ;
      },
    //delete email in conversation
    deletePartnerConversation: async(token,email)=> {
      const response = await axios.delete(
        "http://localhost:5000/api/partners/conversations/delete/"+email,{ headers: { Authorization: token } }
      );
      return response;
    },
    
    
    
    //create email for conversation for partner
      postPartneremailConversation: async (token,conversationemail) => {
        const response = await axios.post(
          "http://localhost:5000/api/partners/conversations/send",{ headers: { Authorization: token } },conversationemail
        );
        return response ;
        },
    
      //create project by description and consultancy requirement
      createProject: async (token,project)=> {
        const createdproject= await axios.post(
            "http://localhost:5000/api/partners/project",{ headers: { Authorization: token } },project
        );
        return createdproject;
        },
    
        //getting all my project names
    
      getmyProjects: async (token) => {
        var names = await axios.get(
          "http://localhost:5000/api/partners/projects/",{ headers: { Authorization: token } }
        );
        return names;
      },
    
      //selecting project by id
      getProjectbyId: async (token,id) => {
        const project = await axios.get(
          "http://localhost:5000/api/partners/project/select/"+id,{ headers: { Authorization: token } }
        );
        return project;
      },
    
      //update project by id
      updateProjectbyId: async (token,id,body) =>{
        const project = await axios.put(
          "http://localhost:5000/api/partners/project/"+id,body,{ headers: { Authorization: token } }
        );
        return project;
      },
    
      //delete project by id
      deleteProjectbyId: async (token,projectId) =>{
        const deletedproject = await axios.delete(
          "http://localhost:5000/api/partners/project/"+projectId,{ headers: { Authorization: token } }
        );
        return deletedproject;
       }
    
    
    
    
    
    

    
}


module.exports = functions;