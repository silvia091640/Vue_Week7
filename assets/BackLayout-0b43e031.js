import{_ as u,R as h,r as c,o as _,c as v,a,b as s,d as l,e as k,F as b,f as i}from"./index-3d2be7b2.js";const g={components:{RouterView:h},methods:{logout(){document.cookie=`hexschoolToken=; expires=${new Date};`,this.$router.push("/")},created(){const o=document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,"$1");this.$http.defaults.headers.common.Authorization=`${o}`;const t=`${{}.VITE_API}/api/user/check`;this.$http.post(t).then(e=>{this.$httpMessageState(e,"登入"),this.status=!0}).catch(e=>{this.$router.push("/"),this.$httpMessageState(e.response,"錯誤訊息")})}}},m={class:"navbar navbar-expand-lg navbar-dark bg-dark"},f={class:"container-fluid"},$=a("a",{class:"navbar-brand",href:"#"},"綜合園",-1),x=a("button",{class:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarNavAltMarkup","aria-controls":"navbarNavAltMarkup","aria-expanded":"false","aria-label":"Toggle navigation"},[a("span",{class:"navbar-toggler-icon"})],-1),V={class:"collapse navbar-collapse",id:"navbarNavAltMarkup"},w={class:"navbar-nav"};function M(o,t,e,N,A,n){const r=c("router-link"),d=c("RouterView");return _(),v(b,null,[a("nav",m,[a("div",f,[$,x,a("div",V,[a("div",w,[s(r,{to:"/admin/products",class:"nav-link"},{default:l(()=>[i("產品")]),_:1}),s(r,{to:"/admin/orders",class:"nav-link"},{default:l(()=>[i("訂單")]),_:1}),a("a",{href:"#",onClick:t[0]||(t[0]=k((...p)=>n.logout&&n.logout(...p),["prevent"])),class:"nav-link"},"登出")])])])]),s(d)],64)}const B=u(g,[["render",M]]);export{B as default};
