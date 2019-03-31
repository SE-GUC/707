const axios = require("axios");

const functions = { 
    login: async (user) => {
        const token = await axios.post(
          "http://localhost:5000/api/login" , user
        );
        return token;
      },
      //saad consultancy
  
    


//consultancies
postConsultancy: async (cons) => {
  const response = await axios.post(
    "http://localhost:5000/api/consultancies/register",cons 
  );
  return response ;
},

//consultancies
getConsultancy: async (token) => {
  const response = await axios.get(
    "http://localhost:5000/api/consultancies/profile", { headers: { Authorization: token }}
  );
  return response ;
  },

//consultancies
      putConsultancy: async (cons,token) => {
          const response = await axios.put(
            "http://localhost:5000/api/consultancies/updateProfile",cons, { headers: { Authorization: token }}
          );
          return response ;
        } ,
         
        //consultancies
        deleteconsultancy: async (token) => {
          const response = await axios.delete(
            "http://localhost:5000/api/consultancies/delete",{ headers: { Authorization: token }}
          );
          return response ;
        } ,


//consultancies
postConversation: async (cons,token) => {
  const response = await axios.post(
    "http://localhost:5000/api/consultancies/conversations/start",cons,{ headers: { Authorization: token }}
  );
  return response ;
},

//consultancies
getConversationbyemail: async (token,email) => {
  const response = await axios.get(
    "http://localhost:5000/api/consultancies/conversations/get/"+email, { headers: { Authorization: token }}
  );
  return response ;
  },

  //consultancies
deleteConversation: async (email,token) => {
  const response = await axios.delete(
    "http://localhost:5000/api/consultancies/conversations/delete/"+email,{ headers: { Authorization: token }}
  );
  return response ;

} ,


getAllCons: async (token) => {
  const response = await axios.get(
    "http://localhost:5000/api/consultancies/conversations/get",{ headers: { Authorization: token }}
  );
  return response;
},



 //consultancies
 postemailConversation: async (cons,token) => {
  const response = await axios.post(
    "http://localhost:5000/api/consultancies/conversations/send",cons,{ headers: { Authorization: token }}
  );
  return response ;
  },

  getAllProjects: async (token) => {
      const response = await axios.get(
        "http://localhost:5000/api/consultancies/get/projects",{ headers: { Authorization: token }}
      );
      return response;
    },

    getProjectbyid: async (projectid,token) => {
      const response = await axios.get(
        "http://localhost:5000/api/consultancies/project/select/"+projectid,{ headers: { Authorization: token }}
      );
      return response;
    },
    getAssignedProjectbyid: async (projectid,token) => {
      const response = await axios.get(
        "http://localhost:5000/api/consultancies/project/"+projectid ,{ headers: { Authorization: token }}
      );
      return response;
    },

    putProjectbyid: async (projectid,project,token) => {
      const response = await axios.put(
        "http://localhost:5000/api/consultancies/project/"+projectid,project,{ headers: { Authorization: token }}
      );
      return response;
    },
  

    getAssignedCandidtesforProject: async (projectid,token) => {
      const response = await axios.get(
        "http://localhost:5000/api/consultancies/project/"+projectid,{ headers: { Authorization: token }}
      );
      return response;
    },

    getProjectNamesIamAssignedTo: async (projectid,token) => {
      const response = await axios.get(
        "http://localhost:5000/api/consultancies/project/"+projectid, { headers: { Authorization: token }}
      );
      return response;
    },

    getprojectbyname: async (name,token) => {
      const response = await axios.get(
        "http://localhost:5000/api/consultancies/searchProjects/" + name,{ headers: { Authorization: token }}
      );
      return response;
    },













//Islam 
createPartner: async (partner) => {
  const response = await axios.post(
    "http://localhost:5000/api/partners/register",partner
  );
  return response ;
},
createProject: async (project,token)=> {
  const createdproject= await axios.post(
      "http://localhost:5000/api/partners/project/",project,{ headers: { Authorization: token }}
  );
  return createdproject;
  },














        ///////////////////////////////////////////////////////
    logout: async(token)=> {
        const loggedOutUser = await axios.get( 
            "http://localhost:5000/api/logout", { headers: { Authorization: token } });
        return loggedOutUser ;
    }
}


module.exports = functions;