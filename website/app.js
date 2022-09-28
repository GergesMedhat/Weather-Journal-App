

/* Global Variables */
const generateBtn=document.querySelector('#generate');
const apiKey="b7607d2cdf5f024e8b4c9ddfa2477810";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

async function generate(){
    const zip= document.getElementById('zip');
    const zipCode=zip.value;
    const input= document.querySelector('.myInput');
    const feeling= input.value;
    if(zipCode.trim()===''||feeling.trim===''){
        alert('zip code and feelings are required fileds');
        return;
    }
    const fullURL=`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric`;
    const res = await fetch(fullURL);
    const weatherData= await res.json();
    const temp=weatherData.main.temp; 
    console.log(temp);
    await fetch('/saveData',{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },  
        body: JSON.stringify({  
            date: newDate,
            temp ,   
            content: feeling,
        })
    });

    const responss= await fetch('/getData') 
    const finalData=await responss.json()

    retrieveData(finalData); 
}
const retrieveData = async () =>{
    const request = await fetch('/getData');
    try{
        const allData = await request.json()
        console.log(allData);
        document.getElementById('temp').innerText= Math.round(allData.temp)+' degrees';
        document.getElementById('content').innerHTML=allData.content;
        document.getElementById('date').innerHTML=allData.data;
    } catch(error){
        console.log('error', error);
    }

}


  generateBtn.addEventListener('click', generate);