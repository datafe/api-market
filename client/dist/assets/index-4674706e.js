import{r as c,j as e}from"./index-62d4577c.js";import{I as h,B as l,m as t}from"./index-ff1d2bff.js";const p=()=>{const[a,d]=c.useState(""),[n,i]=c.useState(!1),m=o=>{d(o.target.value)},r=async()=>{if(!a){t.warning("Please input username");return}i(!0);const s=await(await fetch("/user/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:a})})).json();s!=null&&s.success?(t.success("Register Success"),setTimeout(()=>{window.open("/login","_self")},2e3)):(t.error(s==null?void 0:s.data),i(!1))},g=()=>{window.open("/login","_self")};return e.jsxs("div",{className:"register-page",children:[e.jsxs("div",{className:"header",children:[e.jsx("div",{className:"logo"}),e.jsx("div",{className:"title",children:"Register"})]}),e.jsxs("div",{className:"form",children:[e.jsxs("div",{className:"kv",children:[e.jsx("div",{className:"label",children:"Username"}),e.jsx(h,{type:"text",placeholder:"Username",value:a,disabled:n,onChange:m,onPressEnter:()=>r()})]}),e.jsxs("div",{className:"operator",children:[e.jsx(l,{onClick:()=>r(),loading:n,children:"Register"}),e.jsx(l,{onClick:()=>g(),disabled:n,children:"Go to Login"})]})]})]})};export{p as default};