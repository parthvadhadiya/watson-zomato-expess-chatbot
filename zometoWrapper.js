const rp = require("request-promise");
const userKey = "<zomato user key>";
/**
  *
  * main() will be run when you invoke this action
  *
  * @param Cloud Functions actions accept a single parameter, which must be a JSON object.
  *
  * @return The output of this action, which must be a JSON object.
  *
  */
async function main(params) {
    let mainString = '';
    let listRes = [];
    let cuisine = params.cuisine;
    // console.log(cuisine)
    if(cuisine == "dine"){
        mainString=  `here is top 5 restaurant to dine  ==>> `
        const url = 'https://developers.zomato.com/api/v2.1/search?entity_id=11&entity_type=city&count=5&category=10&sort=rating&order=asc'
          let requestObj = {
            method: "GET",
            uri: url,
            headers: {
              "user-key": userKey,
              Accept: "application/json"
            },
            json: true
          };
          let result;
          try {
            result = await rp(requestObj);
          } catch (error) {
            console.log("Error in API 2");
            console.log(error);
          }
       
          for (let data of result["restaurants"]) {
            mainString += data["restaurant"]["name"] +",  "
          }
          
    }else{
        let cuisine_id;
          try {
            // curl -X GET --header "Accept: application/json" --header "user-key: userKey" "https://developers.zomato.com/api/v2.1/cuisines?city_id=11"
        
            const url = "https://developers.zomato.com/api/v2.1/cuisines?city_id=11";
            let requestObj = {
              method: "GET",
              uri: url,
              headers: {
                "user-key": userKey,
                Accept: "application/json"
              },
              json: true
            };
            let result;
            try {
              result = await rp(requestObj);
            } catch (error) {
              console.log("Error in API 1");
              console.log(error);
            }
            result = result["cuisines"];
        
            for (let data of result) {
              if (
                data["cuisine"]["cuisine_name"].toLowerCase() == cuisine.toLowerCase()
              ) {
                cuisine_id = data["cuisine"]["cuisine_id"];
                break;
              }
            }
            // console.log(cuisine_id['restaurants'])
          } catch (e) {
            console.error(e);
          }
        
          // request for 5 to resturent
          // curl -X GET --header "Accept: application/json" --header "user-key: userKey" "https://developers.zomato.com/api/v2.1/search?entity_id=11&count=5&cuisines=25&sort=rating&order=asc"
        
          const url = `https://developers.zomato.com/api/v2.1/search?entity_id=11&count=5&cuisines=${cuisine_id}&sort=rating&order=asc`;
          let requestObj = {
            method: "GET",
            uri: url,
            headers: {
              "user-key": userKey,
              Accept: "application/json"
            },
            json: true
          };
          let result;
          try {
            result = await rp(requestObj);
          } catch (error) {
            console.log("Error in API 2");
            console.log(error);
          }
          
          
          for (let data of result["restaurants"]) {
            mainString += data["restaurant"]["name"] + ",  "
          }
        
        //   console.log(listRes);
        //   res.send({ rest: listRes });
    }
    
    
    // let finalString = " --> " + listRes + " <-- ";
	return { message: mainString };
}
