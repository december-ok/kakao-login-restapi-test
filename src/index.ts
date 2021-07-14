import axios from "axios";
import express from "express";

const app = express();
const KAKAO_RESTAPI_KEY = "";

app.get("/kakao", async (req, res) => {
  console.log(req.query.code);
  const code = req?.query?.code;
  res.send(`
  <script>
  try{
    fetch('https://kauth.kakao.com/oauth/token',{
      method: 'POST',
      body:new URLSearchParams({
        grant_type:'authorization_code',
        client_id:'${KAKAO_RESTAPI_KEY}',
        redirect_uri:'http://localhost:5000/kakao',
        code:'${code}'
      })
    }).then((response)=>{
      response.json().then((result)=>{
        console.log(result);
      })
    })
  }catch(error){
    console.log(error);
  }
  </script>
  `);
});

app.get("/auth", (req, res) => {
  res.redirect(
    `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_RESTAPI_KEY}&redirect_uri=http://localhost:5000/kakao&response_type=code`
  );
});

app.get("/", (req, res) => {
  res.send("hihi");
});

app.listen(5000);
