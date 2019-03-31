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
    }
}


module.exports = functions;