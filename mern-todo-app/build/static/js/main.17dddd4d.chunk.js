(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{32:function(e,a,t){e.exports=t.p+"static/media/logo.6e43d8d5.png"},34:function(e,a,t){e.exports=t(68)},39:function(e,a,t){},68:function(e,a,t){"use strict";t.r(a);var n=t(0),s=t.n(n),r=t(29),l=t.n(r),o=(t(39),t(9)),c=t(10),i=t(12),m=t(11),u=t(13),h=t(7),p=t(8),d=(t(40),t(1)),b=t(16),g=t.n(b),v=function(e){function a(e){var t;return Object(o.a)(this,a),(t=Object(i.a)(this,Object(m.a)(a).call(this,e))).onChangeuserName=t.onChangeuserName.bind(Object(d.a)(Object(d.a)(t))),t.onChangeuserEmail=t.onChangeuserEmail.bind(Object(d.a)(Object(d.a)(t))),t.onChangeuserPassword=t.onChangeuserPassword.bind(Object(d.a)(Object(d.a)(t))),t.onChangeType=t.onChangeType.bind(Object(d.a)(Object(d.a)(t))),t.onSubmit=t.onSubmit.bind(Object(d.a)(Object(d.a)(t))),t.state={name:"",email:"",password:"",type:""},t}return Object(u.a)(a,e),Object(c.a)(a,[{key:"onChangeuserName",value:function(e){this.setState({name:e.target.value})}},{key:"onChangeuserEmail",value:function(e){this.setState({email:e.target.value})}},{key:"onChangeuserPassword",value:function(e){this.setState({password:e.target.value})}},{key:"onChangeType",value:function(e){this.setState({type:e.target.value})}},{key:"onSubmit",value:function(e){e.preventDefault(),console.log("Form submitted:"),console.log("Name: ".concat(this.state.name)),console.log("Email: ".concat(this.state.email)),console.log("Password: ".concat(this.state.password));var a={name:this.state.name,email:this.state.email,password:this.state.password};console.log(this.state.type),g.a.post("https://lirtenhub-707.herokuapp.com/api/"+this.state.type+"/register",a).then(function(e){return console.log(e.data)}),this.setState({name:"",email:"",password:"",type:""})}},{key:"render",value:function(){return s.a.createElement("div",{style:{marginTop:10}},s.a.createElement("h3",null,"Register New User"),s.a.createElement("form",{onSubmit:this.onSubmit},s.a.createElement("div",{className:"form-group"},s.a.createElement("label",null,"Name: "),s.a.createElement("input",{type:"text",className:"form-control",value:this.state.name,onChange:this.onChangeuserName})),s.a.createElement("div",{className:"form-group"},s.a.createElement("label",null,"Email: "),s.a.createElement("input",{type:"text",className:"form-control",value:this.state.email,onChange:this.onChangeuserEmail})),s.a.createElement("div",{className:"form-group"},s.a.createElement("label",null,"Password: "),s.a.createElement("input",{type:"password",className:"form-control",value:this.state.password,onChange:this.onChangeuserPassword})),s.a.createElement("div",{className:"form-group"},s.a.createElement("div",{className:"form-check form-check-inline"},s.a.createElement("input",{className:"form-check-input",type:"radio",name:"priorityOptions",id:"candidates",value:"candidates",checked:"candidates"===this.state.type,onChange:this.onChangeType}),s.a.createElement("label",{className:"form-check-label"},"Candidate")),s.a.createElement("div",{className:"form-check form-check-inline"},s.a.createElement("input",{className:"form-check-input",type:"radio",name:"priorityOptions",id:"partners",value:"partners",checked:"partners"===this.state.type,onChange:this.onChangeType}),s.a.createElement("label",{className:"form-check-label"},"Partner")),s.a.createElement("div",{className:"form-check form-check-inline"},s.a.createElement("input",{className:"form-check-input",type:"radio",name:"priorityOptions",id:"consultancies",value:"consultancies",checked:"consultancies"===this.state.type,onChange:this.onChangeType}),s.a.createElement("label",{className:"form-check-label"},"Consultancy"))),s.a.createElement("div",{className:"form-group"},s.a.createElement("input",{type:"submit",value:"Create Account",className:"btn btn-primary"}))))}}]),a}(n.Component),E=t(33),f=function(e){function a(e){var t;return Object(o.a)(this,a),(t=Object(i.a)(this,Object(m.a)(a).call(this,e))).renderRedirect=function(){if(t.state.redirect)return s.a.createElement(h.a,null,s.a.createElement(p.a,{to:"/createaccount"}),s.a.createElement(p.b,{exact:!0,path:"/createaccount",component:v}))},t.onChangeuserEmail=t.onChangeuserEmail.bind(Object(d.a)(Object(d.a)(t))),t.onChangeuserPassword=t.onChangeuserPassword.bind(Object(d.a)(Object(d.a)(t))),t.onSubmit=t.onSubmit.bind(Object(d.a)(Object(d.a)(t))),t.state={email:"",password:""},t}return Object(u.a)(a,e),Object(c.a)(a,[{key:"onChangeuserEmail",value:function(e){this.setState({email:e.target.value})}},{key:"onChangeuserPassword",value:function(e){this.setState({password:e.target.value})}},{key:"onSubmit",value:function(e){var a=this;e.preventDefault();var t={email:this.state.email,password:this.state.password},n=new E.a;g.a.post("https://lirtenhub-707.herokuapp.com/api/login",t).then(function(e){200==e.status&&(a.setState({redirect:!0}),n.set("token",e.data,{path:"/"}))}),this.setState({email:"",password:""})}},{key:"render",value:function(){return s.a.createElement(h.a,null,s.a.createElement("div",{style:{marginTop:10}},s.a.createElement("h3",null,"Login"),s.a.createElement("form",{onSubmit:this.onSubmit},s.a.createElement("div",{className:"form-group"},s.a.createElement("label",null,"Email: "),s.a.createElement("input",{type:"text",className:"form-control",value:this.state.email,onChange:this.onChangeuserEmail})),s.a.createElement("div",{className:"form-group"},s.a.createElement("label",null,"Password: "),s.a.createElement("input",{type:"password",className:"form-control",value:this.state.password,onChange:this.onChangeuserPassword})),s.a.createElement("div",{className:"form-group"},s.a.createElement("input",{type:"submit",value:"Login",className:"btn btn-primary",onClick:this.renderRedirect})))))}}]),a}(n.Component),y=t(32),w=t.n(y),C=function(e){function a(){return Object(o.a)(this,a),Object(i.a)(this,Object(m.a)(a).apply(this,arguments))}return Object(u.a)(a,e),Object(c.a)(a,[{key:"render",value:function(){return s.a.createElement(h.a,null,s.a.createElement("div",{className:"container"},s.a.createElement("nav",{className:"navbar navbar-expand-lg navbar-light bg-light"},s.a.createElement("a",{class:"navbar-brand",href:"http://localhost:3000/",target:"_blank"},s.a.createElement("img",{src:w.a,width:"287px",height:"100px",alt:"LirtenHub-Logo"})),s.a.createElement("div",{className:"collpase navbar-collapse"},s.a.createElement("ul",{className:"navbar-nav mr-auto"},s.a.createElement("li",{className:"navbar-item"},s.a.createElement(h.b,{to:"/",className:"nav-link"},"Home")),s.a.createElement("li",{className:"navbar-item"},s.a.createElement(h.b,{to:"/createaccount",className:"nav-link"},"Register to LirtenHub")),s.a.createElement("li",{className:"navbar-item"},s.a.createElement(h.b,{to:"/login",className:"nav-link"},"Login"))))),s.a.createElement("br",null),s.a.createElement(p.b,{path:"/createaccount",component:v}),s.a.createElement(p.b,{path:"/login",component:f})))}}]),a}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(s.a.createElement(C,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[34,1,2]]]);
//# sourceMappingURL=main.17dddd4d.chunk.js.map