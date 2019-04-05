const axios = require("axios");
const functions = {
  getAdmin: async (id) => {
    const admin = await axios.get(
      "http://localhost:5000/api/admins/"+id
    );
    return admin;
  },
  getAdmins: async () => {
    const admins = await axios.get(
      "http://localhost:5000/api/admins/get/admins"
    );
    return admins;
  }
,
postAdmin: async (admin) => {
    const response = await axios.post(
      "http://localhost:5000/api/admins/register",admin
    );
    return response ;
  },
  putAdmin: async (id,admin) => {
    const response = await axios.put(
      "http://localhost:5000/api/admins/"+id,admin
    );
    return response ;
  } ,
  deleteAdmin: async (id) => {
    const response = await axios.delete(
      "http://localhost:5000/api/admins/"+id
    );
    return response ;
  } ,
  postConsultancy: async (cons) => {
    const response = await axios.post(
      "http://localhost:5000/api/consultancies/register",cons
    );
    return response ;
  },
  postConversation: async (conv,id) => {
    const response = await axios.post(
      "http://localhost:5000/api/admins/conversation/"+id,conv
    );
    return response ;
  },
  getCandidates: async () => {
    const candidates = await axios.get(
      "http://localhost:5000/api/admins/get/candidates"
    );
    return candidates;
  },
  getConsultancies: async () => {
    const consultancies = await axios.get(
      "http://localhost:5000/api/admins/get/consultancies"
    );
    return consultancies;
  },
  getConversationbyemail: async (id,email) => {
    const response = await axios.get(
      "http://localhost:5000/api/admins/conversation/"+id+"/"+email
    );
    return response ;
    },
    //admin getting all conversation
getAdminConversations: async(id)=>{
  const conv=await axios.get(
    "http://localhost:5000/api/admins/conversation/"+id
  );
  return conv;
},


//delete email in conversation
deleteAdminConversation: async(id,email)=> {
  const response = await axios.delete(
    "http://localhost:5000/api/admins/conversation/"+id+"/"+email
  );
  return response;
},
  //create candidate profile
  postCandidate: async(candidate) => {
    const response = await axios.post(
        "http://localhost:5000/api/candidates/register",candidate
    );
    return response;
},
  //creating partner redirecting routes
  createPartner: async (partner) => {
    const response = await axios.post(
      "http://localhost:5000/api/partners/register",partner
    );
    return response ;
  },
  getPartners: async () => {
    const partners = await axios.get(
      "http://localhost:5000/api/admins/get/partners"
    );
    return partners;
  },
  getCertificates: async () => {
    const certificates = await axios.get(
      "http://localhost:5000/api/admins//get/certificates"
    );
    return certificates;
  },
  getProjects: async () => {
    const projects = await axios.get(
      "http://localhost:5000/api/admins//get/projects"
    );
    return projects;
  },
  getEmails: async () => {
    const emails = await axios.get(
      "http://localhost:5000/api/admins//get/emails"
    );
    return emails;
  },
  getAdminbyname: async (name) => {
    const admin = await axios.get(
      "http://localhost:5000/api/admins/searchAdmins/" + name
    );
    return admin;
  },
  getCandidatebyname: async (name) => {
    const candidate = await axios.get(
      "http://localhost:5000/api/admins/searchCandidates/" + name
    );
    return candidate ;
  },
  getConsultanciesbyname: async (name) => {
    const consultancy = await axios.get(
      "http://localhost:5000/api/admins/searchConsultancies/" + name
    );
    return consultancy ;
  },
  getPartnersbyname: async (name) => {
    const partner = await axios.get(
      "http://localhost:5000/api/admins/searchPartners/" + name
    );
    return partner ;
  },
  postCertificate: async (certificate) => {
    const response = await axios.post(
      "http://localhost:5000/api/admins/certificate",certificate
    );
    return response ;
  },
  getCertificate:async (id) => {
    const certificate = await axios.get(
      "http://localhost:5000/api/admins/certificate/"+id
    );
    return certificate;
  },
  putCertificate: async (id,certificate) => {
    const response = await axios.put(
      "http://localhost:5000/api/admins/certificate/"+id,certificate
    );
    return response ;
  },
  deleteCertificate: async (id) => {
    const response = await axios.delete(
      "http://localhost:5000/api/admins/certificate/"+id
    );
    return response ;
  },
  getCertificatesbyname: async (name) => {
    const certificate = await axios.get(
      "http://localhost:5000/api/admins/searchCertificates/" + name
    );
    return certificate;
  },
    //create project by description and consultancy requirement
    createProject: async (id,project)=> {
      const createdproject= await axios.post(
          "http://localhost:5000/api/partners/project/"+id,project
      );
      return createdproject;
      },
      
  //selecting project by id
  getProjectbyId: async (id) => {
    const project = await axios.get(
      "http://localhost:5000/api/admins/project/"+id
    );
    return project;
  },
  getProjectsbyname:async (name) => {
    const project = await axios.get(
      "http://localhost:5000/api/admins/searchProjects/" + name
    );
    return project ;
  },
  

  postemailConversation: async (email,id) => {
    const response = await axios.post(
      "http://localhost:5000/api/admins/conversation/email/"+id,email
    );
    return response ;
    },
    getEmailsbyname:async (name) => {
      const email = await axios.get(
        "http://localhost:5000/api/admins/searchEmails/" + name
      );
      return email ;
    },
    updateProjectbyId:async (projectid,body) =>{
      const updatedProject = await axios.put(
          "http://localhost:5000/api/admins/project/"+projectid,body
      );
      return updatedProject;
  },

  removeProjectbyId: async (projectId) =>{
      const deletedproject = await axios.delete(
        "http://localhost:5000/api/admins/project/"+projectId
      );
      return deletedproject;
    },
    approveCandidate:  async (projectID,candidateID) =>{
      const foundProject = await axios.post(
        "http://localhost:5000/api/admins/project/"+ projectID+"/"+ candidateID
      );
      return foundProject;
    },
    applycert:async (id,idcert) => {
      const response = await axios.post(
        "http://localhost:5000/api/candidates/certificate/"+id+"/"+idcert
      );
      return response ;
      },
      approvecertificate:async (idcert,canid) => {
        const response = await axios.post(
          "http://localhost:5000/api/admins/certificate/"+idcert+"/"+canid
        );
        return response ;
        },
        applyproject:async (id,pid) => {
          const response = await axios.post(
            "http://localhost:5000/api/candidates/project/"+id+"/"+pid
          );
          return response ;
          },
          viewapplyingcandidates:async (pid) => {
            const applyingcandidates = await axios.get(
              "http://localhost:5000/api/admins/projects/" +pid
            );
            return applyingcandidates ;
          }
    

 };
module.exports = functions;
