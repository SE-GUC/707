const axios = require("axios");
const functions = {
    //get candidate profile
    getCandidate: async(token) =>{
        const candidate = await axios.get(
            "http://localhost:5000/api/candidates/profile",{headers: {Authorization: token}}
            );
            return candidate;
        },
        //create candidate profile
        postCandidate: async(candidate) => {
            const response = await axios.post(
                "http://localhost:5000/api/candidates/register",candidate
            );
            return response;
        } ,
//         //search project
//         SearchProjectByName: async(name) =>{
//            const cand = await axios.get(
//        "http://localhost:5000/api/candidates/searchProjects/"+id
//    );
//    return cand;
//         },

        //create conversation
        postConversation: async (conv,token) => {
            const response = await axios.post(
              "http://localhost:5000/api/candidates/conversations/start",conv,{headers: {Authorization: token}}
              
            );
            return response ;
          },

          //get all candidates 
          getCandidates: async () => {
            const candidates = await axios.get(
              "http://localhost:5000/api/candidates"
            );
            return candidates;
          },
        //get all conversations
          getConversations: async (token)=>{
              const conversations = await axios.get(
                  "http://localhost:5000/api/candidates/conversation/get",{headers: {Authorization: token}}
              );
          },
        //Get an existing conversation by stating receiver email
          getConversation: async(token,email) =>{
              const conversation = await axios.get(
                "http://localhost:5000/api/candidates/conversations/get/"+email,{headers: {Authorization: token}}
              )
          },
        //send an email inside conversation
          postemailConversation: async (email,token) => {
            const response = await axios.post(
              "http://localhost:5000/api/candidates/conversations/send",email,{headers: {Authorization: token}}
            );
            return response ;
            },
         //delete candidate
          deleteCandidate: async (token) => {
          const response = await axios.delete(
            "http://localhost:5000/api/candidates/delete",{headers: {Authorization: token}}
            );
        return response ;
         }  ,
            //update candidate
             putCandidate: async (token,candidate) => {
             const response = await axios.put(
               "http://localhost:5000/api/candidates/updateProfile",candidate,{headers: {Authorization: token}}
             );
              return response ;
            } ,
            //create project by description and consultancy requirement
            createProject: async (token,project)=> {
             const createdproject= await axios.post(
                "http://localhost:5000/api/partners/project/",project,{ headers: {Authorization:token}}
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
applyforProjectbyID : async(token, projectID)=>{
  const response = await axios.post(
      "http://localhost:5000/api/candidates/project/",{ headers: {Authorization:token}},"/"+projectID
  );
  return response
  },
  //Disapply for project by id
  disapplyforProjectbyID : async(token, projectID)=>{
    const response = await axios.delete(
        "http://localhost:5000/api/candidates/project/",{ headers: {Authorization:token}},"/"+projectID
    );
    return response
    },

    //view all projects that i can apply
    getProjects: async (token) => {
      var projects = await axios.get(
        "http://localhost:5000/api/candidates/get/projects/",{ headers: {Authorization:token}}
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
  viewAllProjectsiAppliedFor: async(token)=>{
    var projects = await axios.get(
      "http://localhost:5000/api/candidates/appliedProjects/",{ headers: {Authorization:token}}
    );
    return projects

  },


  };
    module.exports = functions;