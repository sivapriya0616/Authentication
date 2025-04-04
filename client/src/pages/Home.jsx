import React from "react";


const HomePage = () => {
  useEffect(()=>{
    axios.get('/')
    .then(res=>{
      console.log(res.data)
    })
    .catch(err=>console.log(err))
  },[])
  return (
    <div className="homepage">
      

    </div> 
  );
};

export default HomePage;