const axios = require("axios");
const functions = {

    createProject: async (id,project)=> {
        const createdproject= await axios.post(
            "http://localhost:5000/api/partners/project/"+id,project
        );
        return createdproject;
        },


//consultancies
postConsultancy: async (cons) => {
    const response = await axios.post(
      "http://localhost:5000/api/consultancies/register",cons
    );
    return response ;
  },

//consultancies
getConsultancy: async (id) => {
    const response = await axios.get(
      "http://localhost:5000/api/consultancies/"+id
    );
    return response ;
    },

 //consultancies
        putConsultancy: async (id,cons) => {
            const response = await axios.put(
              "http://localhost:5000/api/consultancies/"+id,cons
            );
            return response ;
          } ,
           
          //consultancies
          deleteconsultancy: async (id) => {
            const response = await axios.delete(
              "http://localhost:5000/api/consultancies/"+id
            );
            return response ;
          } ,


  //consultancies
  postConversation: async (cons,id) => {
    const response = await axios.post(
      "http://localhost:5000/api/consultancies/conversation/"+id,cons
    );
    return response ;
  },

  //consultancies
  getConversationbyemail: async (id,email) => {
    const response = await axios.get(
      "http://localhost:5000/api/consultancies/conversation/"+id+"/"+email
    );
    return response ;
    },

    //consultancies
  deleteConversation: async (email,id) => {
    const response = await axios.delete(
      "http://localhost:5000/api/consultancies/conversation/"+id+"/"+email
    );
    return response ;

  } ,


  getAllCons: async (id) => {
    const response = await axios.get(
      "http://localhost:5000/api/consultancies/conversation/"+id
    );
    return response;
  },

   //consultancies
   postemailConversation: async (cons,id) => {
    const response = await axios.post(
      "http://localhost:5000/api/consultancies/conversation/email/"+id,cons
    );
    return response ;
    },

    getAllProjects: async () => {
        const response = await axios.get(
          "http://localhost:5000/api/consultancies/get/projects"
        );
        return response;
      },

      getProjectbyid: async (id) => {
        const response = await axios.get(
          "http://localhost:5000/api/consultancies/project/select/"+id
        );
        return response;
      },
      getAssignedProjectbyid: async (id,projectid) => {
        const response = await axios.get(
          "http://localhost:5000/api/consultancies/project/"+id+"/"+projectid
        );
        return response;
      },

      putProjectbyid: async (projectid,project) => {
        const response = await axios.put(
          "http://localhost:5000/api/consultancies/project/"+projectid,project
        );
        return response;
      },
    

      getAssignedCandidtesforProject: async (projectid) => {
        const response = await axios.get(
          "http://localhost:5000/api/consultancies/project/"+projectid
        );
        return response;
      },

      getProjectNamesIamAssignedTo: async (id) => {
        const response = await axios.get(
          "http://localhost:5000/api/consultancies/projects/"+id
        );
        return response;
      },

      getprojectbyname: async (name) => {
        const response = await axios.get(
          "http://localhost:5000/api/consultancies/searchProjects/" + name
        );
        return response;
      },
      Approveacandidate: async (projectid,candidateid) => {
        const response = await axios.post(
          "http://localhost:5000/api/consultancies/project/"+projectid+"/"+candidateid
        );
        return response ;
        },


      

        





        




//Islam 
createPartner: async (partner) => {
    const response = await axios.post(
      "http://localhost:5000/api/partners/register",partner
    );
    return response ;
  },
  createProject: async (id,project)=> {
    const createdproject= await axios.post(
        "http://localhost:5000/api/partners/project/"+id,project
    );
    return createdproject;
    },


    //farah 
    postCandidate: async(candidate) => {
      const response = await axios.post(
          "http://localhost:5000/api/candidates/register",candidate
      );
      return response;
  } ,

applyforProjectbyID : async(id, projectID)=>{
  const response = await axios.post(
      "http://localhost:5000/api/candidates/project/"+id+"/"+projectID
  );
  return response
  },

};



module.exports = functions;

