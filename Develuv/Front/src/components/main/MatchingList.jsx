
// 아직 넘겨오는지는 몰라서 일단 대충 주소값 넣음
import MatchingItem from "./MatchingItem.jsx";
import {useEffect, useState} from "react";
import "./MatchingItem.css"
import axios from "axios";

let searchAdr = "dress";

const MatchingList = () => {

  const [matchType, setMatchType] = useState("");
  const [matchList, setMatchList] = useState([]);


  useEffect(() => {
    const formData = new FormData();
    formData.append("searchAdr",searchAdr);
    axios.get('http://localhost:8080/matchingList', {
      params: {
        searchAdr: searchAdr
      }
    })
      .then(response => {
        setMatchList(response.data);
        console.log(matchList);
      })
      .catch(error => {
        console.error('Error getList => ', error);
      });
  }, [matchType]);


  useEffect(() => {
    setMatchType("normal");
  }, []);

  function returnList(matchType) {
    const formData = new FormData();
    formData.append("searchAdr", searchAdr);
    // if(matchType === "normal"){
    //   axios.get("http://localhost:8080/matchingList",
    //     formData).then()
    // }
    // else if(matchType === "rematch") {
    //
    // } else if(matchType === "nbti") {
    //
    // } else if(matchType === "fame") {
    //
    // }
  }
  function testReload(){
    setMatchType("hi");
  }

  return(
    <div className={"MatchingList"}>


      {matchList.map((item) =>
        <MatchingItem key={item.user_id} user_id={item.user_id} user_name={item.user_name}
                      user_gender={item.user_gender}
                      user_adress={item.user_address} user_nbti={item.user_nbti} user_profile={item.user_profile}/>)}

      <button onClick={testReload} style={{backgroundColor: "yellow"}}>히히</button>
    </div>
  )

}

export default MatchingList