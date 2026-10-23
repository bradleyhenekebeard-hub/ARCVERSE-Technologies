/* ARCVERSE business challenge enquiry: never sends data until visitor confirms in email or WhatsApp. */
(function(){
'use strict';
const form=document.getElementById('challenge-form');
if(!form)return;
const status=document.getElementById('challenge-status');
const emailButton=document.getElementById('challenge-email');
const whatsappButton=document.getElementById('challenge-whatsapp');
if(!emailButton || !whatsappButton)return;
emailButton.disabled=false;
whatsappButton.disabled=false;
status.textContent='Review and send the prepared message in your chosen app.';
const summary=()=>{
 const f=new FormData(form);
 return ['ARCVERSE TECHNOLOGIES | Business Challenge',
  '','Name: '+(f.get('name')||''),'Company: '+(f.get('company')||''),
  'Email: '+(f.get('email')||''),'Phone: '+(f.get('phone')||'Not provided'),
  'Challenge category: '+(f.get('issue')||''),
  '','Details:',''+(f.get('challenge')||''),
  '','Please contact me to discuss a practical solution.'].join('\n');
};
form.addEventListener('submit',event=>event.preventDefault());
emailButton.addEventListener('click',()=>{
 if(!form.reportValidity())return;
 const company=(new FormData(form).get('company')||'Business').toString().slice(0,80);
 status.textContent='Your email application should open with a draft. Review and press Send; ARCVERSE has not received anything until you send it.';
 window.location.href='mailto:solutions@arcverse.digital?subject='+encodeURIComponent('Business challenge - '+company)+'&body='+encodeURIComponent(summary());
});
whatsappButton.addEventListener('click',()=>{
 if(!form.reportValidity())return;
 status.textContent='WhatsApp should open with a prepared message. Review and press Send; this website has not yet submitted it.';
 const link='https://wa.me/27764224935?text='+encodeURIComponent(summary());
 const pop=window.open(link,'_blank','noopener,noreferrer');
 if(!pop)window.location.href=link;
});
})();
