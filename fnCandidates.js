const axios = require("axios");

const functions = {
  
    //get candidate profile
    getCandidate: async (id) => {
      const cand = await axios.get(
        "http://localhost:5000/api/candidates/"+id
      );
      return cand;
    },
        //create candidate profile
        postCandidate: async(candidate) => {
            const response = await axios.post(
                "http://localhost:5000/api/candidates/register",candidate
            );
            return response;
        } ,

        //create conversation
        postConversation: async (conv,id) => {
            const response = await axios.post(
              "http://localhost:5000/api/candidates/conversation/"+id,conv
              
            );
            return response ;
          },

          getConversations: async ()=>{
              const conversations = await axios.get(
                  "http://localhost:5000/api/candidates/conversation/"+id
              );
          },
        //Get an existing conversation by stating receiver email
          getConversation: async(id,email) =>{
              const conversation = await axios.get(
                "http://localhost:5000/api/candidates/conversation/"+id+"/"+email
               
              );
              return conversation;
          },
        //send an email inside conversation
          postemailConversation: async (email,id) => {
            const response = await axios.post(
              "http://localhost:5000/api/candidates/conversation/email/"+id,email
            );
            return response ;
            },
         //delete candidate
          deleteCandidate: async (id) => {
          const response = await axios.delete(
            "http://localhost:5000/api/candidates/"+id
            );
        return response ;
         }  ,
            //update candidate
             putCandidate: async (id,candidate) => {
             const response = await axios.put(
               "http://localhost:5000/api/candidates/"+id,candidate
             );
              return response ;
            } ,
            //create project by description and consultancy requirement
            createProject: async (id,project)=> {
             const createdproject= await axios.post(
                "http://localhost:5000/api/partners/project/"+id , project
                );
              return createdproject;
                },
            //creating partner redirecting routes
             createPartner: async (partner) => {
                const response = await axios.post(
             "http://localhost:5000/api/partners/register",partner
            );
                return response ;
                },
  //create certificate
  postCertificate: async (certificate) => {
    const response = await axios.post(
      "http://localhost:5000/api/admins/certificate",certificate
    );
    return response ;
  },
  //search certificate by name
  getCertificatebyname: async (name) => {
    const certificate = await axios.get(
      "http://localhost:5000/api/candidates/searchCertificates/" + name
    );
    return certificate;
  },
  //get certificate by its id
 getCertificatebyId: async (id) => {
    const certificate = await axios.get(
      "http://localhost:5000/api/candidates/certificate/select/"+id
    );
    return certificate;
  },

//apply for certificate by ID
applyforCertificatebyID : async(CandidateID, certificateID)=>{
const response = await axios.post(
    "http://localhost:5000/api/candidates/certificate/"+CandidateID+"/"+certificateID
);
return response
},
//apply for project by id
applyforProjectbyID : async(id, projectID)=>{
  const response = await axios.post(
      "http://localhost:5000/api/candidates/project/"+id+"/"+projectID
  );
  return response
  },
  //Disapply for project by id
  disapplyforProjectbyID : async(id, projectID)=>{
    const response = await axios.delete(
        "http://localhost:5000/api/candidates/project/"+id+"/"+projectID
    );
    return response
    },

    //view all projects that i can apply
    getProjects: async () => {
      var projects = await axios.get(
        "http://localhost:5000/api/candidates/get/projects/"
      );
      return projects;
    },
       //getting all my project names

  getCertificates: async () => {
    var names = await axios.get(
      "http://localhost:5000/api/candidates/get/certificates"
    );
    return names;
  },
  //View all projects' names i applied for
  viewAllProjectsiAppliedFor: async(id)=>{
    var projects = await axios.get(
      "http://localhost:5000/api/candidates/appliedProjects/"+id
    );
    return projects

  },
//delete conversation
deleteConversation: async(id,email)=>{
    const response = await axios.delete(
       "http://localhost:5000/api/candidates/conversation/"+id+"/"+email
    )
    return response;
},


  };
    module.exports = functions;
