import{_ as c,o as u,c as p,a as o,w as i,v as l}from"./index-3d2be7b2.js";const{VITE_APP_URL:m}={VITE_APP_URL:"https://vue3-course-api.hexschool.io/v2",VITE_APP_PATH:"silvia-hexschool",BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0},_={data(){return{user:{username:"",password:""}}},methods:{login(){const r=`${m}/admin/signin`;this.$http.post(r,this.user).then(s=>{const{token:n,expired:a}=s.data;document.cookie=`hexschoolToken=${n}; expires=${new Date(a)}; path=/`,this.$router.push("/admin/products")}).catch(s=>{console.log(s)})}}},h={class:"container mt-5"},f={id:"form",class:"form-signin"},w={class:"form-floating mb-3"},v=o("label",{for:"username"},"Email address",-1),x={class:"form-floating"},P=o("label",{for:"password"},"Password",-1);function g(r,s,n,a,e,d){return u(),p("div",h,[o("form",f,[o("div",w,[i(o("input",{type:"email",class:"form-control",id:"username","onUpdate:modelValue":s[0]||(s[0]=t=>e.user.username=t),placeholder:"name@example.com",required:"",autofocus:""},null,512),[[l,e.user.username]]),v]),o("div",x,[i(o("input",{type:"password",class:"form-control",id:"password","onUpdate:modelValue":s[1]||(s[1]=t=>e.user.password=t),placeholder:"Password",required:""},null,512),[[l,e.user.password]]),P]),o("button",{class:"btn btn-lg btn-primary w-100 mt-3",type:"button",onClick:s[2]||(s[2]=t=>d.login())}," 登入 ")])])}const E=c(_,[["render",g]]);export{E as default};
