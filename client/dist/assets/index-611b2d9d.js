import{r,j as e,d as a}from"./index-e054a226.js";import{I as g,B as m,m as p}from"./index-9987b3f9.js";const P=()=>{const[o,h]=r.useState(""),[i,u]=r.useState(""),[n,l]=r.useState(!1),x=t=>{h(t.target.value)},j=t=>{u(t.target.value)},v=()=>{window.open("/register","_self")},d=async()=>{var c;if(!o||!i){p.warning(a.get("pls_input_username_and_pass").d("Please input username and pass"));return}l(!0);const s=await(await fetch("/user/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:o,pass:i})})).json();s!=null&&s.success?(sessionStorage.setItem("sessionId",(c=s==null?void 0:s.data)==null?void 0:c.sessionId),window.open("/home","_self")):(p.error(s==null?void 0:s.data),l(!1))};return e.jsxs("div",{className:"login-page",children:[e.jsxs("div",{className:"header",children:[e.jsx("div",{className:"logo"}),e.jsx("div",{className:"title",children:a.get("product_name").d("API Market")})]}),e.jsxs("div",{className:"form",children:[e.jsxs("div",{className:"kv",children:[e.jsx("div",{className:"label",children:a.get("username").d("Username")}),e.jsx(g,{type:"text",placeholder:a.get("username").d("Username"),value:o,disabled:n,onChange:x,onPressEnter:()=>d()})]}),e.jsxs("div",{className:"kv",children:[e.jsx("div",{className:"label",children:a.get("pass").d("Pass")}),e.jsx(g,{type:"password",placeholder:a.get("pass").d("Pass"),value:i,disabled:n,onChange:j,onPressEnter:()=>d()})]}),e.jsxs("div",{className:"operation",children:[e.jsx(m,{onClick:()=>d(),loading:n,children:a.get("log_in").d("Log In")}),e.jsx(m,{onClick:()=>v(),disabled:n,children:a.get("go_register").d("Go Register")})]})]})]})};export{P as default};
